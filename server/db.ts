import { and, asc, desc, eq, sql } from "drizzle-orm";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import {
  auditLogs,
  companySettings,
  contactMessages,
  type InsertCompanySettings,
  type InsertProjectRequest,
  type InsertUser,
  portfolioItems,
  projectRequests,
  siteContent,
  testimonials,
  users,
} from "../drizzle/schema";
import { ENV } from "./_core/env";
import { featuredPortfolio } from "../content/portfolio";

let _db: ReturnType<typeof drizzle> | null = null;

export async function getDb() {
  const dbUrl = process.env.DATABASE_URL || process.env.POSTGRES_URL || process.env.DATABASE_URL_UNPOOLED || process.env.POSTGRES_URL_NON_POOLING || process.env.POSTGRES_URL_NO_SSL;
  if (!_db && dbUrl) {
    try {
      _db = drizzle(neon(dbUrl));
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) throw new Error("User openId is required for upsert");
  const db = await getDb();
  if (!db) throw new Error("Database is unavailable");

  const values: InsertUser = { openId: user.openId };
  const updateSet: Record<string, unknown> = {};
  const textFields = ["name", "email", "loginMethod"] as const;
  textFields.forEach(field => {
    const value = user[field];
    if (value !== undefined) {
      values[field] = value ?? null;
      updateSet[field] = value ?? null;
    }
  });
  values.lastSignedIn = user.lastSignedIn ?? new Date();
  updateSet.lastSignedIn = values.lastSignedIn;
  values.role = user.role ?? (user.openId === ENV.ownerOpenId ? "admin" : "user");
  updateSet.role = values.role;
  await db.insert(users).values(values).onConflictDoUpdate({ target: users.openId, set: updateSet });
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return result[0];
}

function createReference() {
  return `ORA-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
}

export async function createProjectRequest(request: InsertProjectRequest) {
  const db = await getDb();
  if (!db) throw new Error("Database is unavailable");
  const result = await db.insert(projectRequests).values({ ...request, reference: request.reference ?? createReference() }).returning({ id: projectRequests.id, reference: projectRequests.reference });
  return result[0];
}

export async function listProjectRequests() {
  const db = await getDb();
  if (!db) throw new Error("Database is unavailable");
  return db.select().from(projectRequests).orderBy(desc(projectRequests.createdAt));
}

export async function updateProjectRequest(id: number, values: Partial<typeof projectRequests.$inferInsert>) {
  const db = await getDb();
  if (!db) throw new Error("Database is unavailable");
  const result = await db.update(projectRequests).set({ ...values, updatedAt: new Date() }).where(eq(projectRequests.id, id)).returning();
  return result[0];
}

export async function listSiteContent() {
  const db = await getDb();
  if (!db) throw new Error("Database is unavailable");
  return db.select().from(siteContent).orderBy(asc(siteContent.contentKey));
}

export async function saveSiteContent(contentKey: string, contentValue: string) {
  const db = await getDb();
  if (!db) throw new Error("Database is unavailable");
  await db.insert(siteContent).values({ contentKey, contentValue }).onConflictDoUpdate({ target: siteContent.contentKey, set: { contentValue, updatedAt: new Date() } });
}

export async function getCompanySettings() {
  const db = await getDb();
  if (!db) throw new Error("Database is unavailable");
  const result = await db.select().from(companySettings).where(eq(companySettings.singletonKey, "default")).limit(1);
  return result[0];
}

export async function saveCompanySettings(values: InsertCompanySettings) {
  const db = await getDb();
  if (!db) throw new Error("Database is unavailable");
  const result = await db.insert(companySettings).values({ ...values, singletonKey: "default" }).onConflictDoUpdate({ target: companySettings.singletonKey, set: { ...values, updatedAt: new Date() } }).returning();
  return result[0];
}

export async function listPublishedPortfolio() {
  const db = await getDb();
  if (!db) throw new Error("Database is unavailable");
  return db.select().from(portfolioItems).where(eq(portfolioItems.status, "published")).orderBy(asc(portfolioItems.displayOrder), desc(portfolioItems.publishedAt));
}

export async function listPortfolioItems() {
  const db = await getDb();
  if (!db) throw new Error("Database is unavailable");
  return db.select().from(portfolioItems).orderBy(asc(portfolioItems.displayOrder), desc(portfolioItems.createdAt));
}

export async function getPortfolioBySlug(slug: string) {
  const db = await getDb();
  if (!db) throw new Error("Database is unavailable");
  const result = await db.select().from(portfolioItems).where(and(eq(portfolioItems.slug, slug), eq(portfolioItems.status, "published"))).limit(1);
  return result[0];
}

export async function savePortfolioItem(values: typeof portfolioItems.$inferInsert) {
  const db = await getDb();
  if (!db) throw new Error("Database is unavailable");
  const result = await db.insert(portfolioItems).values(values).returning();
  return result[0];
}

export async function updatePortfolioItem(id: number, values: Partial<typeof portfolioItems.$inferInsert>) {
  const db = await getDb();
  if (!db) throw new Error("Database is unavailable");
  const result = await db.update(portfolioItems).set({ ...values, updatedAt: new Date() }).where(eq(portfolioItems.id, id)).returning();
  return result[0];
}

export async function listApprovedTestimonials() {
  const db = await getDb();
  if (!db) throw new Error("Database is unavailable");
  return db.select().from(testimonials).where(eq(testimonials.status, "approved")).orderBy(desc(testimonials.publishedAt), desc(testimonials.createdAt));
}

export async function listTestimonials() {
  const db = await getDb();
  if (!db) throw new Error("Database is unavailable");
  return db.select().from(testimonials).orderBy(desc(testimonials.createdAt));
}

export async function saveTestimonial(values: typeof testimonials.$inferInsert) {
  const db = await getDb();
  if (!db) throw new Error("Database is unavailable");
  const result = await db.insert(testimonials).values(values).returning();
  return result[0];
}

export async function updateTestimonial(id: number, values: Partial<typeof testimonials.$inferInsert>) {
  const db = await getDb();
  if (!db) throw new Error("Database is unavailable");
  const result = await db.update(testimonials).set({ ...values, updatedAt: new Date() }).where(eq(testimonials.id, id)).returning();
  return result[0];
}

export async function createContactMessage(values: typeof contactMessages.$inferInsert) {
  const db = await getDb();
  if (!db) throw new Error("Database is unavailable");
  const result = await db.insert(contactMessages).values(values).returning();
  return result[0];
}

export async function listContactMessages() {
  const db = await getDb();
  if (!db) throw new Error("Database is unavailable");
  return db.select().from(contactMessages).orderBy(desc(contactMessages.createdAt));
}

export async function updateContactMessage(id: number, values: Partial<typeof contactMessages.$inferInsert>) {
  const db = await getDb();
  if (!db) throw new Error("Database is unavailable");
  const result = await db.update(contactMessages).set({ ...values, updatedAt: new Date() }).where(eq(contactMessages.id, id)).returning();
  return result[0];
}

export async function writeAuditLog(values: typeof auditLogs.$inferInsert) {
  const db = await getDb();
  if (!db) throw new Error("Database is unavailable");
  await db.insert(auditLogs).values(values);
}

export async function listAuditLogs() {
  const db = await getDb();
  if (!db) throw new Error("Database is unavailable");
  return db.select().from(auditLogs).orderBy(desc(auditLogs.createdAt)).limit(100);
}

export async function getDatabaseStatus() {
  const db = await getDb();
  if (!db) return { connected: false, schemaReady: false } as const;
  try {
    await db.execute(sql`select 1`);
    await db.execute(sql`select "id", "reference", "name", "email", "company", "service", "brief", "status", "priority", "assigneeId", "followUpAt", "internalNotes", "createdAt", "updatedAt" from "project_requests" limit 1`);
    await db.execute(sql`select "id", "slug", "title", "excerpt", "body", "category", "service", "clientName", "coverImageUrl", "mediaUrls", "deliverables", "results", "techStack", "clientConsent", "featured", "displayOrder", "status", "publishedAt", "createdAt", "updatedAt" from "portfolio_items" limit 1`);
    return { connected: true, schemaReady: true } as const;
  } catch {
    return { connected: true, schemaReady: false } as const;
  }
}

export async function seedFeaturedPortfolioIfEmpty() {
  const db = await getDb();
  if (!db) throw new Error("Database is unavailable");
  const existing = await db.select({ id: portfolioItems.id }).from(portfolioItems).limit(1);
  if (existing.length > 0) return { inserted: 0, total: existing.length } as const;
  const rows = featuredPortfolio.map(item => ({
    slug: item.slug,
    title: item.title,
    excerpt: item.excerpt,
    body: item.body,
    category: item.category,
    service: item.service,
    clientName: item.clientName,
    coverImageUrl: item.coverImageUrl,
    mediaUrls: item.mediaUrls,
    deliverables: item.deliverables,
    results: item.results,
    techStack: item.techStack,
    clientConsent: 1,
    featured: item.featured ? 1 : 0,
    displayOrder: item.displayOrder,
    status: "published" as const,
    publishedAt: new Date(),
  }));
  await db.insert(portfolioItems).values(rows);
  return { inserted: rows.length, total: rows.length } as const;
}

export async function initializeDatabaseSchema() {
  const db = await getDb();
  if (!db) throw new Error("Database is unavailable");
  const migrationPath = join(process.cwd(), "drizzle", "0000_perpetual_sandman.sql");
  const migration = await readFile(migrationPath, "utf8");
  const statements = migration
    .split("--> statement-breakpoint")
    .map(statement => statement.trim())
    .filter(Boolean)
    .map(statement => statement.replaceAll("CREATE TABLE ", "CREATE TABLE IF NOT EXISTS ").replaceAll("CREATE INDEX ", "CREATE INDEX IF NOT EXISTS "));
  for (const statement of statements) await db.execute(sql.raw(statement));

  const compatibilityStatements = [
    `ALTER TABLE "project_requests" ADD COLUMN IF NOT EXISTS "reference" varchar(24)`,
    `ALTER TABLE "project_requests" ADD COLUMN IF NOT EXISTS "priority" varchar(16) DEFAULT 'normal'`,
    `ALTER TABLE "project_requests" ADD COLUMN IF NOT EXISTS "assigneeId" integer`,
    `ALTER TABLE "project_requests" ADD COLUMN IF NOT EXISTS "followUpAt" timestamp`,
    `ALTER TABLE "project_requests" ADD COLUMN IF NOT EXISTS "internalNotes" text`,
    `ALTER TABLE "portfolio_items" ADD COLUMN IF NOT EXISTS "slug" varchar(180)`,
    `ALTER TABLE "portfolio_items" ADD COLUMN IF NOT EXISTS "title" varchar(220)`,
    `ALTER TABLE "portfolio_items" ADD COLUMN IF NOT EXISTS "excerpt" varchar(500)`,
    `ALTER TABLE "portfolio_items" ADD COLUMN IF NOT EXISTS "body" text`,
    `ALTER TABLE "portfolio_items" ADD COLUMN IF NOT EXISTS "category" varchar(120)`,
    `ALTER TABLE "portfolio_items" ADD COLUMN IF NOT EXISTS "service" varchar(120)`,
    `ALTER TABLE "portfolio_items" ADD COLUMN IF NOT EXISTS "clientName" varchar(180)`,
    `ALTER TABLE "portfolio_items" ADD COLUMN IF NOT EXISTS "coverImageUrl" varchar(1000)`,
    `ALTER TABLE "portfolio_items" ADD COLUMN IF NOT EXISTS "mediaUrls" jsonb DEFAULT '[]'::jsonb`,
    `ALTER TABLE "portfolio_items" ADD COLUMN IF NOT EXISTS "deliverables" jsonb DEFAULT '[]'::jsonb`,
    `ALTER TABLE "portfolio_items" ADD COLUMN IF NOT EXISTS "results" jsonb DEFAULT '[]'::jsonb`,
    `ALTER TABLE "portfolio_items" ADD COLUMN IF NOT EXISTS "techStack" jsonb DEFAULT '[]'::jsonb`,
    `ALTER TABLE "portfolio_items" ADD COLUMN IF NOT EXISTS "clientConsent" integer DEFAULT 0`,
    `ALTER TABLE "portfolio_items" ADD COLUMN IF NOT EXISTS "featured" integer DEFAULT 0`,
    `ALTER TABLE "portfolio_items" ADD COLUMN IF NOT EXISTS "displayOrder" integer DEFAULT 0`,
    `ALTER TABLE "portfolio_items" ADD COLUMN IF NOT EXISTS "status" varchar(24) DEFAULT 'draft'`,
    `ALTER TABLE "portfolio_items" ADD COLUMN IF NOT EXISTS "publishedAt" timestamp`,
    `ALTER TABLE "portfolio_items" ADD COLUMN IF NOT EXISTS "createdAt" timestamp DEFAULT now()`,
    `ALTER TABLE "portfolio_items" ADD COLUMN IF NOT EXISTS "updatedAt" timestamp DEFAULT now()`,
  ];
  for (const statement of compatibilityStatements) await db.execute(sql.raw(statement));
  return getDatabaseStatus();
}

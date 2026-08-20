import { index, integer, jsonb, pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";

/** Core user table backing the Manus OAuth flow. */
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: varchar("role", { length: 32 }).$type<"user" | "admin">().default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export const projectRequestStatus = ["new", "reviewing", "qualified", "meeting", "closed", "archived"] as const;
export const projectRequestPriority = ["normal", "high", "urgent"] as const;

export const projectRequests = pgTable("project_requests", {
  id: serial("id").primaryKey(),
  reference: varchar("reference", { length: 24 }).unique(),
  name: varchar("name", { length: 160 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  company: varchar("company", { length: 200 }),
  service: varchar("service", { length: 64 }).notNull(),
  brief: text("brief").notNull(),
  status: varchar("status", { length: 32 }).$type<typeof projectRequestStatus[number]>().default("new").notNull(),
  priority: varchar("priority", { length: 16 }).$type<typeof projectRequestPriority[number]>().default("normal").notNull(),
  assigneeId: integer("assigneeId"),
  followUpAt: timestamp("followUpAt"),
  internalNotes: text("internalNotes"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
}, table => ({
  statusIdx: index("project_requests_status_idx").on(table.status),
  createdAtIdx: index("project_requests_created_at_idx").on(table.createdAt),
}));

export const companySettings = pgTable("company_settings", {
  id: serial("id").primaryKey(),
  singletonKey: varchar("singletonKey", { length: 32 }).default("default").notNull().unique(),
  companyName: varchar("companyName", { length: 160 }).notNull().default("ORA"),
  legalName: varchar("legalName", { length: 200 }),
  tagline: varchar("tagline", { length: 240 }),
  description: text("description"),
  contactEmail: varchar("contactEmail", { length: 320 }),
  contactPhone: varchar("contactPhone", { length: 80 }),
  location: varchar("location", { length: 160 }),
  businessHours: varchar("businessHours", { length: 160 }),
  responseTime: varchar("responseTime", { length: 160 }),
  websiteUrl: varchar("websiteUrl", { length: 500 }),
  socialLinks: jsonb("socialLinks").$type<Record<string, string>>().default({}),
  privacyPolicy: text("privacyPolicy"),
  termsOfUse: text("termsOfUse"),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export const portfolioStatus = ["draft", "published", "archived"] as const;

export const portfolioItems = pgTable("portfolio_items", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 180 }).notNull().unique(),
  title: varchar("title", { length: 220 }).notNull(),
  excerpt: varchar("excerpt", { length: 500 }).notNull(),
  body: text("body").notNull(),
  category: varchar("category", { length: 120 }),
  service: varchar("service", { length: 120 }),
  clientName: varchar("clientName", { length: 180 }),
  coverImageUrl: varchar("coverImageUrl", { length: 1000 }),
  mediaUrls: jsonb("mediaUrls").$type<string[]>().default([]),
  deliverables: jsonb("deliverables").$type<string[]>().default([]),
  results: jsonb("results").$type<Array<{ label: string; value: string }>>().default([]),
  techStack: jsonb("techStack").$type<string[]>().default([]),
  clientConsent: integer("clientConsent").default(0).notNull(),
  featured: integer("featured").default(0).notNull(),
  displayOrder: integer("displayOrder").default(0).notNull(),
  status: varchar("status", { length: 24 }).$type<typeof portfolioStatus[number]>().default("draft").notNull(),
  publishedAt: timestamp("publishedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
}, table => ({
  statusIdx: index("portfolio_items_status_idx").on(table.status),
  orderIdx: index("portfolio_items_order_idx").on(table.displayOrder),
}));

export const testimonialStatus = ["pending", "approved", "rejected", "archived"] as const;

export const testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  displayName: varchar("displayName", { length: 160 }).notNull(),
  role: varchar("role", { length: 160 }),
  company: varchar("company", { length: 180 }),
  quote: text("quote").notNull(),
  rating: integer("rating").default(5).notNull(),
  avatarUrl: varchar("avatarUrl", { length: 1000 }),
  source: varchar("source", { length: 500 }),
  consentToPublish: integer("consentToPublish").default(0).notNull(),
  internalNote: text("internalNote"),
  status: varchar("status", { length: 24 }).$type<typeof testimonialStatus[number]>().default("pending").notNull(),
  publishedAt: timestamp("publishedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
}, table => ({
  statusIdx: index("testimonials_status_idx").on(table.status),
}));

export const contactMessageStatus = ["new", "in_progress", "closed"] as const;

export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 160 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  subject: varchar("subject", { length: 220 }),
  message: text("message").notNull(),
  status: varchar("status", { length: 24 }).$type<typeof contactMessageStatus[number]>().default("new").notNull(),
  internalNotes: text("internalNotes"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
}, table => ({
  statusIdx: index("contact_messages_status_idx").on(table.status),
}));

export const auditLogs = pgTable("audit_logs", {
  id: serial("id").primaryKey(),
  actorId: integer("actorId"),
  action: varchar("action", { length: 80 }).notNull(),
  entityType: varchar("entityType", { length: 80 }).notNull(),
  entityId: varchar("entityId", { length: 80 }),
  metadata: jsonb("metadata").$type<Record<string, unknown>>().default({}),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
}, table => ({
  entityIdx: index("audit_logs_entity_idx").on(table.entityType, table.entityId),
  createdAtIdx: index("audit_logs_created_at_idx").on(table.createdAt),
}));

/** Editable public content managed by administrators. */
export const siteContent = pgTable("site_content", {
  id: serial("id").primaryKey(),
  contentKey: varchar("contentKey", { length: 80 }).notNull().unique(),
  contentValue: text("contentValue").notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
export type ProjectRequest = typeof projectRequests.$inferSelect;
export type InsertProjectRequest = typeof projectRequests.$inferInsert;
export type CompanySettings = typeof companySettings.$inferSelect;
export type InsertCompanySettings = typeof companySettings.$inferInsert;
export type PortfolioItem = typeof portfolioItems.$inferSelect;
export type InsertPortfolioItem = typeof portfolioItems.$inferInsert;
export type Testimonial = typeof testimonials.$inferSelect;
export type InsertTestimonial = typeof testimonials.$inferInsert;
export type ContactMessage = typeof contactMessages.$inferSelect;
export type InsertContactMessage = typeof contactMessages.$inferInsert;
export type SiteContent = typeof siteContent.$inferSelect;

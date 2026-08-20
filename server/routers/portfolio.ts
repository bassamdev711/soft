import { z } from "zod";
import { getPortfolioBySlug, listPortfolioItems, listPublishedPortfolio, savePortfolioItem, updatePortfolioItem, writeAuditLog } from "../db";
import { adminProcedure, publicProcedure, router } from "../_core/trpc";

const resultSchema = z.object({ label: z.string().trim().min(1).max(80), value: z.string().trim().min(1).max(120) });

const portfolioInput = z.object({
  slug: z.string().trim().min(2).max(180).regex(/^[a-z0-9-]+$/, "استخدم أحرفًا إنجليزية صغيرة وأرقامًا وشرطات فقط."),
  title: z.string().trim().min(3).max(220),
  excerpt: z.string().trim().min(20).max(500),
  body: z.string().trim().min(40).max(30000),
  category: z.string().trim().max(120).optional(),
  service: z.string().trim().max(120).optional(),
  clientName: z.string().trim().max(180).optional(),
  coverImageUrl: z.string().url().max(1000).optional(),
  mediaUrls: z.array(z.string().url().max(1000)).max(12).default([]),
  deliverables: z.array(z.string().trim().min(1).max(160)).max(12).default([]),
  results: z.array(resultSchema).max(8).default([]),
  techStack: z.array(z.string().trim().min(1).max(80)).max(12).default([]),
  clientConsent: z.boolean().default(false),
  featured: z.boolean().default(false),
  displayOrder: z.number().int().min(0).max(999).default(0),
  status: z.enum(["draft", "published", "archived"]).default("draft"),
});

export const portfolioRouter = router({
  listPublished: publicProcedure.query(() => listPublishedPortfolio()),
  bySlug: publicProcedure.input(z.object({ slug: z.string().min(2).max(180) })).query(({ input }) => getPortfolioBySlug(input.slug)),
  list: adminProcedure.query(() => listPortfolioItems()),
  create: adminProcedure.input(portfolioInput).mutation(async ({ input, ctx }) => {
    if (input.status === "published" && !input.clientConsent) {
      throw new Error("لا يمكن نشر دراسة حالة دون توثيق موافقة العميل.");
    }
    const created = await savePortfolioItem({
      ...input,
      coverImageUrl: input.coverImageUrl ?? null,
      category: input.category ?? null,
      service: input.service ?? null,
      clientName: input.clientName ?? null,
      clientConsent: input.clientConsent ? 1 : 0,
      featured: input.featured ? 1 : 0,
      publishedAt: input.status === "published" ? new Date() : null,
    });
    await writeAuditLog({ actorId: ctx.user.id, action: "portfolio.create", entityType: "portfolio", entityId: String(created?.id ?? ""), metadata: { status: input.status } });
    return created;
  }),
  update: adminProcedure.input(z.object({ id: z.number().int().positive(), values: portfolioInput.partial() })).mutation(async ({ input, ctx }) => {
    if (input.values.status === "published" && input.values.clientConsent === false) {
      throw new Error("لا يمكن نشر دراسة حالة دون توثيق موافقة العميل.");
    }
    const { clientConsent, featured, ...rest } = input.values;
    const values: Parameters<typeof updatePortfolioItem>[1] = { ...rest };
    if (clientConsent !== undefined) values.clientConsent = clientConsent ? 1 : 0;
    if (featured !== undefined) values.featured = featured ? 1 : 0;
    if (input.values.status === "published") values.publishedAt = new Date();
    const updated = await updatePortfolioItem(input.id, values);
    await writeAuditLog({ actorId: ctx.user.id, action: "portfolio.update", entityType: "portfolio", entityId: String(input.id), metadata: { status: input.values.status } });
    return updated;
  }),
});

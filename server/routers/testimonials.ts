import { z } from "zod";
import { listApprovedTestimonials, listTestimonials, saveTestimonial, updateTestimonial, writeAuditLog } from "../db";
import { adminProcedure, publicProcedure, router } from "../_core/trpc";
import { enforceRateLimit } from "../_core/security";

const testimonialInput = z.object({
  displayName: z.string().trim().min(2).max(160),
  role: z.string().trim().max(160).optional(),
  company: z.string().trim().max(180).optional(),
  quote: z.string().trim().min(20).max(1500),
  rating: z.number().int().min(1).max(5).default(5),
  avatarUrl: z.string().url().max(1000).optional(),
  source: z.string().trim().max(500).optional(),
  consentToPublish: z.boolean().default(false),
});

export const testimonialsRouter = router({
  listApproved: publicProcedure.query(() => listApprovedTestimonials()),
  submit: publicProcedure.input(testimonialInput).mutation(async ({ input, ctx }) => {
    await enforceRateLimit(ctx.req, "testimonial", { limit: 3, windowMs: 60 * 60 * 1000, identity: `name:${input.displayName.toLowerCase()}` });
    const testimonial = await saveTestimonial({
      ...input,
      role: input.role ?? null,
      company: input.company ?? null,
      avatarUrl: input.avatarUrl ?? null,
      source: input.source ?? null,
      consentToPublish: input.consentToPublish ? 1 : 0,
      status: "pending",
    });
    return { accepted: true, id: testimonial?.id } as const;
  }),
  list: adminProcedure.query(() => listTestimonials()),
  moderate: adminProcedure.input(z.object({ id: z.number().int().positive(), status: z.enum(["approved", "rejected", "archived"]), internalNote: z.string().trim().max(2000).optional() })).mutation(async ({ input, ctx }) => {
    if (input.status === "approved") {
      const current = await listTestimonials();
      const testimonial = current.find(item => item.id === input.id);
      if (!testimonial?.consentToPublish) throw new Error("لا يمكن نشر مراجعة دون موافقة واضحة على النشر.");
    }
    const updated = await updateTestimonial(input.id, {
      status: input.status,
      internalNote: input.internalNote ?? null,
      publishedAt: input.status === "approved" ? new Date() : null,
    });
    await writeAuditLog({ actorId: ctx.user.id, action: `testimonial.${input.status}`, entityType: "testimonial", entityId: String(input.id), metadata: { status: input.status } });
    return updated;
  }),
});

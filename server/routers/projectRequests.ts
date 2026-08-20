import { z } from "zod";
import { createProjectRequest, listProjectRequests, updateProjectRequest, writeAuditLog } from "../db";
import { adminProcedure, publicProcedure, router } from "../_core/trpc";

export const projectRequestInput = z.object({
  name: z.string().trim().min(2, "يرجى كتابة اسم واضح.").max(160),
  email: z.string().trim().email("يرجى إدخال بريد إلكتروني صحيح.").max(320),
  company: z.string().trim().max(200).optional(),
  service: z.enum(["discovery", "design", "web", "mobile", "operations", "ecommerce", "landing", "other"]),
  brief: z.string().trim().min(20, "أضف قليلًا من السياق، 20 حرفًا على الأقل.").max(8000),
  website: z.string().max(200).optional(),
});

export function isSpamSubmission(input: z.infer<typeof projectRequestInput>) {
  return Boolean(input.website);
}

export const projectRequestsRouter = router({
  submit: publicProcedure.input(projectRequestInput).mutation(async ({ input }) => {
    if (isSpamSubmission(input)) return { accepted: true, ignored: true, reference: null } as const;
    try {
      const created = await createProjectRequest({
        name: input.name,
        email: input.email.toLowerCase(),
        company: input.company || null,
        service: input.service,
        brief: input.brief,
      });
      return { accepted: true, ignored: false, reference: created?.reference ?? null } as const;
    } catch (error) {
      console.error("[Project requests] Failed to store submission", error);
      throw new Error("تعذر حفظ الطلب الآن. يرجى المحاولة لاحقًا.");
    }
  }),
  list: adminProcedure.query(async () => listProjectRequests()),
  update: adminProcedure.input(z.object({
    id: z.number().int().positive(),
    status: z.enum(["new", "reviewing", "qualified", "meeting", "closed", "archived"]).optional(),
    priority: z.enum(["normal", "high", "urgent"]).optional(),
    assigneeId: z.number().int().positive().nullable().optional(),
    followUpAt: z.coerce.date().nullable().optional(),
    internalNotes: z.string().trim().max(5000).nullable().optional(),
  })).mutation(async ({ input, ctx }) => {
    const { id, ...values } = input;
    const updated = await updateProjectRequest(id, values);
    await writeAuditLog({ actorId: ctx.user.id, action: "project_request.update", entityType: "project_request", entityId: String(id), metadata: { changedFields: Object.keys(values) } });
    return updated;
  }),
});

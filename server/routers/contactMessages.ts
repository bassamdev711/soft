import { z } from "zod";
import { createContactMessage, listContactMessages, updateContactMessage, writeAuditLog } from "../db";
import { adminProcedure, publicProcedure, router } from "../_core/trpc";
import { enforceRateLimit } from "../_core/security";

const messageInput = z.object({
  name: z.string().trim().min(2).max(160),
  email: z.string().trim().email().max(320),
  subject: z.string().trim().max(220).optional(),
  message: z.string().trim().min(10).max(8000),
  website: z.string().max(200).optional(),
});

export const contactMessagesRouter = router({
  submit: publicProcedure.input(messageInput).mutation(async ({ input, ctx }) => {
    await enforceRateLimit(ctx.req, "contact", { limit: 5, windowMs: 60 * 60 * 1000, identity: `email:${input.email.toLowerCase()}` });
    if (input.website) return { accepted: true, ignored: true } as const;
    await createContactMessage({
      name: input.name,
      email: input.email.toLowerCase(),
      subject: input.subject ?? null,
      message: input.message,
    });
    return { accepted: true, ignored: false } as const;
  }),
  list: adminProcedure.query(() => listContactMessages()),
  update: adminProcedure.input(z.object({ id: z.number().int().positive(), status: z.enum(["new", "in_progress", "closed"]), internalNotes: z.string().trim().max(5000).nullable().optional() })).mutation(async ({ input, ctx }) => {
    const updated = await updateContactMessage(input.id, { status: input.status, internalNotes: input.internalNotes ?? null });
    await writeAuditLog({ actorId: ctx.user.id, action: "contact_message.update", entityType: "contact_message", entityId: String(input.id), metadata: { status: input.status } });
    return updated;
  }),
});

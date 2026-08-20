import { z } from "zod";
import { getCompanySettings, saveCompanySettings, writeAuditLog } from "../db";
import { adminProcedure, publicProcedure, router } from "../_core/trpc";

const settingsInput = z.object({
  companyName: z.string().trim().min(2).max(160),
  legalName: z.string().trim().max(200).optional(),
  tagline: z.string().trim().max(240).optional(),
  description: z.string().trim().max(3000).optional(),
  contactEmail: z.string().trim().email().max(320).optional(),
  contactPhone: z.string().trim().max(80).optional(),
  location: z.string().trim().max(160).optional(),
  businessHours: z.string().trim().max(160).optional(),
  responseTime: z.string().trim().max(160).optional(),
  websiteUrl: z.string().trim().url().max(500).optional(),
  socialLinks: z.record(z.string(), z.string().trim().max(500)).default({}),
  privacyPolicy: z.string().max(30000).optional(),
  termsOfUse: z.string().max(30000).optional(),
});

export const companySettingsRouter = router({
  public: publicProcedure.query(async () => {
    const settings = await getCompanySettings();
    if (!settings) return null;
    return { ...settings, privacyPolicy: undefined, termsOfUse: undefined };
  }),
  admin: adminProcedure.query(() => getCompanySettings()),
  save: adminProcedure.input(settingsInput).mutation(async ({ input, ctx }) => {
    const saved = await saveCompanySettings({ ...input, singletonKey: "default" });
    await writeAuditLog({ actorId: ctx.user.id, action: "company_settings.update", entityType: "company_settings", entityId: "default", metadata: { fields: Object.keys(input) } });
    return saved;
  }),
});

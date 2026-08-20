import { z } from "zod";
import { listSiteContent, saveSiteContent } from "../db";
import { adminProcedure, publicProcedure, router } from "../_core/trpc";

const contentInput = z.object({
  contentKey: z.string().trim().min(2).max(80),
  contentValue: z.string().trim().min(1).max(5000),
});

export const siteContentRouter = router({
  list: publicProcedure.query(async () => listSiteContent()),
  save: adminProcedure.input(contentInput).mutation(async ({ input }) => {
    await saveSiteContent(input.contentKey, input.contentValue);
    return { success: true } as const;
  }),
});

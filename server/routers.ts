import { COOKIE_NAME } from "@shared/const";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { ENV } from "./_core/env";
import { sdk } from "./_core/sdk";
import { systemRouter } from "./_core/systemRouter";
import { adminProcedure, publicProcedure, router } from "./_core/trpc";
import * as db from "./db";
import { companySettingsRouter } from "./routers/companySettings";
import { contactMessagesRouter } from "./routers/contactMessages";
import { portfolioRouter } from "./routers/portfolio";
import { projectRequestsRouter } from "./routers/projectRequests";
import { siteContentRouter } from "./routers/siteContent";
import { testimonialsRouter } from "./routers/testimonials";
import { assertProductionSecurityConfig, enforceRateLimit } from "./_core/security";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    login: publicProcedure
      .input(z.object({ email: z.string().trim().email(), password: z.string().min(8) }))
      .mutation(async ({ input, ctx }) => {
        assertProductionSecurityConfig();
        await enforceRateLimit(ctx.req, "login", { limit: 5, windowMs: 15 * 60 * 1000 });
        if (input.email !== ENV.adminEmail || input.password !== ENV.adminPassword) {
          throw new TRPCError({ code: "UNAUTHORIZED", message: "Invalid email or password" });
        }

        await db.upsertUser({
          openId: ENV.ownerOpenId,
          name: "Admin",
          email: ENV.adminEmail,
          role: "admin",
          lastSignedIn: new Date(),
        });

        const token = await sdk.createSessionToken(ENV.ownerOpenId, { name: "Admin" });
        ctx.resHeaders.append("Set-Cookie", `${COOKIE_NAME}=${token}; Path=/; Max-Age=28800; SameSite=Lax; Secure; HttpOnly`);
        return { success: true } as const;
      }),
    me: publicProcedure.query(({ ctx }) => ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      ctx.resHeaders.append("Set-Cookie", `${COOKIE_NAME}=; Path=/; Max-Age=0; Expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax; Secure; HttpOnly`);
      return { success: true } as const;
    }),
  }),
  database: router({
    status: adminProcedure.query(() => db.getDatabaseStatus()),
    initialize: adminProcedure.mutation(() => db.initializeDatabaseSchema()),
    seedPortfolio: adminProcedure.mutation(() => db.seedFeaturedPortfolioIfEmpty()),
  }),
  projectRequests: projectRequestsRouter,
  siteContent: siteContentRouter,
  portfolio: portfolioRouter,
  testimonials: testimonialsRouter,
  contactMessages: contactMessagesRouter,
  companySettings: companySettingsRouter,
});

export type AppRouter = typeof appRouter;

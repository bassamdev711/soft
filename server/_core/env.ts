export const ENV = {
  appId: process.env.VITE_APP_ID ?? "",
  cookieSecret: process.env.JWT_SECRET ?? "fallback-secret-for-development-only-12345",
  databaseUrl: process.env.DATABASE_URL ?? "",
  adminEmail: process.env.ADMIN_EMAIL ?? "admin@example.com",
  adminPassword: process.env.ADMIN_PASSWORD ?? "admin123",
  ownerOpenId: process.env.OWNER_OPEN_ID ?? "admin",
  isProduction: process.env.NODE_ENV === "production",
  forgeApiUrl: process.env.BUILT_IN_FORGE_API_URL ?? "",
  forgeApiKey: process.env.BUILT_IN_FORGE_API_KEY ?? "",
  upstashRedisUrl: process.env.UPSTASH_REDIS_REST_URL ?? "",
  upstashRedisToken: process.env.UPSTASH_REDIS_REST_TOKEN ?? "",
  publicAppOrigin: process.env.PUBLIC_APP_ORIGIN ?? "https://orasoft.vercel.app",
  vercelOrigin: process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "",
  hasProductionAuthConfig:
    !process.env.NODE_ENV || process.env.NODE_ENV !== "production"
      ? true
      : Boolean(
          process.env.JWT_SECRET &&
          process.env.JWT_SECRET.length >= 32 &&
          process.env.ADMIN_EMAIL &&
          process.env.ADMIN_PASSWORD &&
          process.env.ADMIN_PASSWORD.length >= 12 &&
          process.env.OWNER_OPEN_ID,
        ),
  hasProductionSecurityConfig:
    !process.env.NODE_ENV || process.env.NODE_ENV !== "production"
      ? true
      : Boolean(
          process.env.JWT_SECRET &&
          process.env.JWT_SECRET.length >= 32 &&
          process.env.ADMIN_EMAIL &&
          process.env.ADMIN_PASSWORD &&
          process.env.ADMIN_PASSWORD.length >= 12 &&
          process.env.OWNER_OPEN_ID &&
          process.env.UPSTASH_REDIS_REST_URL &&
          process.env.UPSTASH_REDIS_REST_TOKEN,
        ),
};

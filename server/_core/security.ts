import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { TRPCError } from "@trpc/server";
import { ENV } from "./env";

const MAX_REQUEST_BYTES = 128 * 1024;

const trustedOrigins = new Set([
  ENV.publicAppOrigin,
  ENV.vercelOrigin,
  "https://www.orasoft.vercel.app",
  "http://localhost:3000",
  "http://localhost:3001",
  "http://localhost:3002",
  "http://localhost:3003",
].filter(Boolean));

const redis = ENV.upstashRedisUrl && ENV.upstashRedisToken
  ? new Redis({ url: ENV.upstashRedisUrl, token: ENV.upstashRedisToken })
  : null;

const distributedLimiters = redis
  ? {
      login: new Ratelimit({ redis, limiter: Ratelimit.slidingWindow(5, "15 m"), prefix: "soft:security:login" }),
      projectRequest: new Ratelimit({ redis, limiter: Ratelimit.slidingWindow(5, "1 h"), prefix: "soft:security:project-request" }),
      contact: new Ratelimit({ redis, limiter: Ratelimit.slidingWindow(5, "1 h"), prefix: "soft:security:contact" }),
      testimonial: new Ratelimit({ redis, limiter: Ratelimit.slidingWindow(3, "1 h"), prefix: "soft:security:testimonial" }),
    }
  : null;

type LimiterName = keyof NonNullable<typeof distributedLimiters>;
type MemoryEntry = { count: number; resetAt: number };
const memoryLimits = new Map<string, MemoryEntry>();

function getClientIdentity(req: Request) {
  const realIp = req.headers.get("x-real-ip")?.trim();
  const forwarded = req.headers.get("x-forwarded-for")?.split(",").map(value => value.trim()).filter(Boolean).at(-1);
  return realIp || forwarded || "unknown-client";
}

function enforceMemoryLimit(key: string, limit: number, windowMs: number) {
  const now = Date.now();
  const current = memoryLimits.get(key);
  const entry = !current || current.resetAt <= now
    ? { count: 0, resetAt: now + windowMs }
    : current;
  entry.count += 1;
  memoryLimits.set(key, entry);
  return { success: entry.count <= limit, reset: entry.resetAt };
}

export async function enforceRateLimit(
  req: Request,
  name: LimiterName,
  options: { limit: number; windowMs: number; identity?: string },
) {
  if (ENV.isProduction && !distributedLimiters) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Rate limiting is not configured.",
    });
  }

  const identities = [getClientIdentity(req), options.identity].filter((value): value is string => Boolean(value));
  for (const identity of identities) {
    const key = `${name}:${identity}`;
    const result = distributedLimiters
      ? await distributedLimiters[name].limit(identity)
      : enforceMemoryLimit(key, options.limit, options.windowMs);

    if (!result.success) {
      const retryAfter = Math.max(1, Math.ceil((result.reset - Date.now()) / 1000));
      throw new TRPCError({
        code: "TOO_MANY_REQUESTS",
        message: `Too many requests. Try again in ${retryAfter} seconds.`,
        cause: { retryAfter },
      });
    }
  }
}

export function assertTrustedMutationRequest(req: Request) {
  if (req.method === "GET" || req.method === "HEAD" || req.method === "OPTIONS") return;

  const origin = req.headers.get("origin");
  if (origin && !trustedOrigins.has(origin)) {
    throw new Response("Forbidden origin", { status: 403 });
  }

  if (req.headers.get("sec-fetch-site") === "cross-site") {
    throw new Response("Cross-site state change blocked", { status: 403 });
  }
}

export function assertRequestSize(req: Request) {
  const contentLength = Number(req.headers.get("content-length") ?? 0);
  if (Number.isFinite(contentLength) && contentLength > MAX_REQUEST_BYTES) {
    throw new Response("Request body too large", {
      status: 413,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }
}

export function assertProductionSecurityConfig() {
  if (ENV.isProduction && !ENV.hasProductionSecurityConfig) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Authentication is temporarily unavailable.",
    });
  }
}

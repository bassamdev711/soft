import { describe, expect, it } from "vitest";
import { assertRequestSize, assertTrustedMutationRequest, enforceRateLimit } from "./_core/security";

function request(headers: Record<string, string> = {}) {
  return new Request("https://orasoft.vercel.app/api/trpc", {
    method: "POST",
    headers,
  });
}

describe("security controls", () => {
  it("allows trusted mutations and blocks cross-site mutations", () => {
    expect(() => assertTrustedMutationRequest(request({ origin: "https://orasoft.vercel.app" }))).not.toThrow();
    expect(() => assertTrustedMutationRequest(request({ origin: "https://attacker.example" }))).toThrow();
    expect(() => assertTrustedMutationRequest(request({ "sec-fetch-site": "cross-site" }))).toThrow();
  });

  it("rejects oversized requests before parsing the body", () => {
    expect(() => assertRequestSize(request({ "content-length": String(128 * 1024 + 1) }))).toThrow();
    expect(() => assertRequestSize(request({ "content-length": String(128 * 1024) }))).not.toThrow();
  });

  it("returns a rate-limit error after the configured threshold", async () => {
    const identity = `unit-test-${Date.now()}-${Math.random()}`;
    const req = request({ "x-forwarded-for": identity });
    for (let index = 0; index < 5; index += 1) {
      await expect(enforceRateLimit(req, "login", { limit: 5, windowMs: 60_000 })).resolves.toBeUndefined();
    }
    await expect(enforceRateLimit(req, "login", { limit: 5, windowMs: 60_000 })).rejects.toMatchObject({ code: "TOO_MANY_REQUESTS" });
  });
});

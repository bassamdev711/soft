import { describe, expect, it } from "vitest";
import { isSpamSubmission, projectRequestInput } from "./routers/projectRequests";

const validRequest = {
  name: "فريق ORA",
  email: "hello@example.com",
  service: "web" as const,
  brief: "نحتاج إلى منصة داخلية تساعد الفريق على متابعة العمليات اليومية بوضوح.",
};

describe("project request validation", () => {
  it("accepts a valid request", () => {
    expect(projectRequestInput.parse(validRequest)).toMatchObject(validRequest);
  });

  it("rejects a short brief", () => {
    expect(() => projectRequestInput.parse({ ...validRequest, brief: "قصير" })).toThrow();
  });

  it("flags honeypot submissions", () => {
    expect(isSpamSubmission({ ...validRequest, website: "https://spam.example" })).toBe(true);
    expect(isSpamSubmission(validRequest)).toBe(false);
  });
});

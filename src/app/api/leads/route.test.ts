import { beforeEach, describe, it, expect, vi } from "vitest";
import { defaultEvent } from "@/lib/validation/event";
const mocks = vi.hoisted(() => ({
  insert: vi.fn(),
  setting: vi.fn(),
  existing: vi.fn(),
  configured: vi.fn(),
}));
vi.mock("@/lib/supabase/server", () => ({
  configured: mocks.configured,
  supabaseService: () => ({
    from: (table: string) => {
      if (table === "app_settings")
        return { select: () => ({ eq: () => ({ single: mocks.setting }) }) };
      return {
        insert: mocks.insert,
        select: () => ({ eq: () => ({ single: mocks.existing }) }),
      };
    },
  }),
}));
vi.mock("@/config/brand", () => ({ brand: { whatsapp: "5511999991234" } }));
import { POST } from "./route";
const event = {
  ...defaultEvent,
  date: "2099-12-20",
  city: "São Paulo",
  district: "Centro",
  venue: "Salão",
  food: ["basicos"],
  name: "Teste",
  whatsapp: "11999991234",
  consent: true,
};
const request = (value: unknown) =>
  new Request("http://localhost/api/leads", {
    method: "POST",
    body: JSON.stringify(value),
  });
const payload = { event, requestId: "12345678-1234-4234-8234-123456789012" };
beforeEach(() => {
  vi.clearAllMocks();
  vi.stubEnv("SUPABASE_SERVICE_ROLE_KEY", "test-only-placeholder");
  mocks.configured.mockReturnValue(true);
  mocks.setting.mockResolvedValue({ data: { value: true }, error: null });
  mocks.insert.mockResolvedValue({ error: null });
});
describe("lead submission", () => {
  it("recalculates price, saves consent and then returns WhatsApp", async () => {
    const response = await POST(
      request({ ...payload, event: { ...event, estimated_total: 1 } }),
    );
    expect(response.status).toBe(201);
    expect(mocks.insert).toHaveBeenCalledWith(
      expect.objectContaining({
        estimated_total: 1800,
        consent_version: "2026-10-01",
        name: "Teste",
      }),
    );
    expect((await response.json()).whatsappUrl).toContain(
      "https://wa.me/5511999991234?text=",
    );
  });
  it("never returns WhatsApp if persistence fails", async () => {
    mocks.insert.mockResolvedValue({ error: { code: "08006" } });
    const response = await POST(request(payload));
    expect(response.status).toBe(500);
    expect(await response.json()).not.toHaveProperty("whatsappUrl");
  });
  it("rejects invalid input before database insert", async () => {
    const response = await POST(
      request({ ...payload, event: { ...event, guests: 350 } }),
    );
    expect(response.status).toBe(400);
    expect(mocks.insert).not.toHaveBeenCalled();
  });
  it("rejects malformed JSON", async () => {
    expect(
      (
        await POST(
          new Request("http://localhost/api/leads", {
            method: "POST",
            body: "{",
          }),
        )
      ).status,
    ).toBe(400);
  });
  it("rejects oversized forms", async () =>
    expect((await POST(request({ text: "x".repeat(17000) }))).status).toBe(
      413,
    ));
  it("handles database configuration absence", async () => {
    mocks.configured.mockReturnValue(false);
    expect((await POST(request(payload))).status).toBe(503);
    expect(mocks.insert).not.toHaveBeenCalled();
  });
  it("honors persisted operational setting", async () => {
    mocks.setting.mockResolvedValue({ data: { value: false }, error: null });
    expect((await POST(request(payload))).status).toBe(503);
    expect(mocks.insert).not.toHaveBeenCalled();
  });
  it("allows a retry of the same saved request", async () => {
    await POST(request(payload));
    const saved = mocks.insert.mock.calls[0][0];
    mocks.insert.mockResolvedValue({ error: { code: "23505" } });
    mocks.existing.mockResolvedValue({
      data: { request_hash: saved.request_hash },
    });
    expect((await POST(request(payload))).status).toBe(201);
  });
  it("rejects request identifier reused with different data", async () => {
    mocks.insert.mockResolvedValue({ error: { code: "23505" } });
    mocks.existing.mockResolvedValue({ data: { request_hash: "different" } });
    expect((await POST(request(payload))).status).toBe(409);
  });
});

import { it, expect } from "vitest";
import { eventMessage, whatsappUrl } from ".";
import { defaultEvent } from "@/lib/validation/event";
it("encodes a complete Portuguese message", () => {
  const message = eventMessage(
    {
      ...defaultEvent,
      name: "João & Ana",
      date: "2099-12-20",
      food: ["basicos"],
      venue: "Salão",
    },
    1800,
  );
  const url = new URL(whatsappUrl("5511999991234", message));
  expect(url.hostname).toBe("wa.me");
  expect(url.searchParams.get("text")).toBe(message);
  expect(message).toContain("20/12/2099");
  expect(message).toContain("Petiscos básicos");
  expect(message).toContain("João & Ana");
});
it("rejects missing destination", () =>
  expect(() => whatsappUrl("", "Hi")).toThrow());

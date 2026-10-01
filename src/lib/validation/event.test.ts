import { describe, it, expect } from "vitest";
import { defaultEvent, eventSchema, today } from "./event";
const valid = {
  ...defaultEvent,
  date: "2099-12-20",
  city: "São Paulo",
  district: "Centro",
  venue: "Salão",
  food: ["basicos"],
  name: "João",
  whatsapp: "(11) 99999-1234",
  consent: true,
};
describe("event validation", () => {
  it("accepts and normalizes valid lead", () =>
    expect(eventSchema.parse(valid).whatsapp).toBe("11999991234"));
  it.each([5, 350, 10.5])("rejects %i guests", (guests) =>
    expect(eventSchema.safeParse({ ...valid, guests }).success).toBe(false),
  );
  it.each([10, 300])("accepts %i guests", (guests) =>
    expect(eventSchema.safeParse({ ...valid, guests }).success).toBe(true),
  );
  it.each([
    { date: "2020-01-01" },
    { date: today() },
    { date: "2099-02-30" },
    { duration: 0 },
    { name: "" },
    { whatsapp: "123" },
    { consent: false },
    { email: "no" },
    { food: ["unknown"] },
    { food: ["basicos", "basicos"] },
    { drinks: ["classicos"], bar: false },
    { restrictions: ["Nenhuma", "Vegano"] },
    { staff: { chef: -1 } },
    { food: [] },
  ])("rejects invalid data %o", (patch) =>
    expect(eventSchema.safeParse({ ...valid, ...patch }).success).toBe(false),
  );
});

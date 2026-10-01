import { describe, it, expect } from "vitest";
import { defaultEvent } from "@/lib/validation/event";
import { calculateEventEstimate, calculateExtrasPrice, suggestStaff } from ".";
describe("pricing", () => {
  it("food only", () =>
    expect(
      calculateEventEstimate({ ...defaultEvent, guests: 20, food: ["basicos"] })
        .total,
    ).toBe(900));
  it("food and bar", () =>
    expect(
      calculateEventEstimate({
        ...defaultEvent,
        food: ["premium"],
        bar: true,
        drinks: ["classicos"],
      }).total,
    ).toBe(4200));
  it("team", () =>
    expect(
      calculateEventEstimate({
        ...defaultEvent,
        staff: { bartender: 1, garcom: 2 },
      }).total,
    ).toBe(850));
  it("full event", () =>
    expect(
      calculateEventEstimate({
        ...defaultEvent,
        food: ["premium"],
        bar: true,
        drinks: ["classicos"],
        staff: { bartender: 1, garcom: 2 },
        extras: ["tacas", "bar"],
      }),
    ).toEqual({
      food: 2800,
      drinks: 1400,
      staff: 850,
      extras: 770,
      total: 5820,
    }));
  it.each([
    [10, 450],
    [300, 13500],
  ])("%i guests", (guests, total) =>
    expect(
      calculateEventEstimate({ ...defaultEvent, guests, food: ["basicos"] })
        .total,
    ).toBe(total),
  );
  it("extras per person and fixed", () =>
    expect(
      calculateExtrasPrice({
        ...defaultEvent,
        guests: 10,
        extras: [
          "loucas",
          "tacas",
          "talheres",
          "decoracao",
          "bar",
          "montagem",
          "desmontagem",
        ],
      }),
    ).toBe(1550));
  it("additional staff hours", () =>
    expect(
      calculateEventEstimate({
        ...defaultEvent,
        duration: 6,
        staff: { chef: 1 },
      }).staff,
    ).toBe(750));
  it("drink quantity", () =>
    expect(
      calculateEventEstimate({
        ...defaultEvent,
        guests: 10,
        bar: true,
        drinks: ["classicos", "sem-alcool"],
        drinksPerPerson: "livre",
      }).drinks,
    ).toBe(880));
  it("does not charge disabled alcoholic bar", () =>
    expect(
      calculateEventEstimate({ ...defaultEvent, drinks: ["classicos"] }).drinks,
    ).toBe(0));
  it("suggests rounded staffing", () =>
    expect(suggestStaff(41, true)).toEqual({
      chef: 0,
      auxiliar: 1,
      bartender: 2,
      garcom: 3,
      recepcionista: 0,
    }));
});

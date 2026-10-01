import {
  food,
  drinks,
  staff,
  extras,
  rules,
  type Item,
} from "@/config/pricing";
import type { EventInput } from "@/lib/validation/event";
const round = (v: number) => Math.round((v + Number.EPSILON) * 100) / 100;
const sum = (items: Item[], ids: string[], guests: number) =>
  items
    .filter((i) => ids.includes(i.id))
    .reduce((n, i) => n + i.price * (i.unit === "person" ? guests : 1), 0);
export const calculateFoodPrice = (e: EventInput) =>
  round(sum(food, e.food, e.guests));
export const calculateDrinksPrice = (e: EventInput) =>
  round(
    drinks
      .filter(
        (i) =>
          e.drinks.includes(i.id) &&
          (e.bar || ["sem-alcool", "mocktails"].includes(i.id)),
      )
      .reduce(
        (n, i) =>
          n +
          i.price *
            e.guests *
            (["sem-alcool", "cerveja", "vinho", "espumante"].includes(i.id)
              ? 1
              : rules.drinkFactors[e.drinksPerPerson]),
        0,
      ),
  );
export const calculateStaffPrice = (e: EventInput) =>
  round(
    staff.reduce((n, i) => n + i.price * (e.staff[i.id] ?? 0), 0) *
      (1 + Math.max(0, e.duration - rules.includedHours) * rules.extraHourRate),
  );
export const calculateExtrasPrice = (e: EventInput) =>
  round(sum(extras, e.extras, e.guests));
export function calculateEventEstimate(e: EventInput) {
  const parts = {
    food: calculateFoodPrice(e),
    drinks: calculateDrinksPrice(e),
    staff: calculateStaffPrice(e),
    extras: calculateExtrasPrice(e),
  };
  return {
    ...parts,
    total: round(Object.values(parts).reduce((a, b) => a + b, 0)),
  };
}
export function suggestStaff(guests: number, bar: boolean) {
  return {
    chef: 0,
    auxiliar: Math.ceil(guests / rules.guestsPerAssistant),
    bartender: bar ? Math.ceil(guests / rules.guestsPerBartender) : 0,
    garcom: Math.ceil(guests / rules.guestsPerWaiter),
    recepcionista: 0,
  };
}

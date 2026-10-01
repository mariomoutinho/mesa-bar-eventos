import { food, drinks, staff, extras, money } from "@/config/pricing";
import type { EventInput } from "@/lib/validation/event";
export function whatsappUrl(number: string, message: string) {
  const digits = number.replace(/\D/g, "");
  if (!/^\d{10,15}$/.test(digits)) throw new Error("WhatsApp não configurado");
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}
export function eventMessage(e: EventInput, total: number) {
  const list = (items: { id: string; label: string }[], ids: string[]) =>
    items
      .filter((i) => ids.includes(i.id))
      .map((i) => `- ${i.label}`)
      .join("\n") || "Não selecionado";
  return `Olá! Montei um evento pelo site e gostaria de confirmar disponibilidade e orçamento.\n\nEvento: ${e.type}\nData: ${e.date.split("-").reverse().join("/")} às ${e.time}\nConvidados: ${e.guests}\nDuração: ${e.duration} horas\nLocal: ${e.venue}, ${e.district}, ${e.city}\n\nGastronomia:\n${list(food, e.food)}\n\nBebidas:\n${list(drinks, e.drinks)}\nDrinks por pessoa: ${e.drinksPerPerson}\n\nEquipe:\n${
    staff
      .filter((i) => e.staff[i.id] > 0)
      .map((i) => `- ${e.staff[i.id]} ${i.label}`)
      .join("\n") || "Não selecionada"
  }\n\nAdicionais:\n${list(extras, e.extras)}\nRestrições: ${e.restrictions.join(", ")}\nObservações: ${e.notes || "Nenhuma"}\n\nEstimativa inicial apresentada no site: ${money(total)}\n\nMeu nome é ${e.name}.\nWhatsApp: ${e.whatsapp}\nE-mail: ${e.email || "Não informado"}`;
}

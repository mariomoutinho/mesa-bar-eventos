import { today } from "@/lib/validation/event";
export const dateLabel = (date: string) =>
  date.slice(0, 10).split("-").reverse().join("/");
export function daysUntil(date: string) {
  return Math.round((Date.parse(date) - Date.parse(today())) / 86400000);
}
export function eventAlert(date: string) {
  const d = daysUntil(date);
  return d === 0
    ? "Hoje"
    : d === 1
      ? "Amanhã"
      : d <= 7 && d > 1
        ? "Próximos 7 dias"
        : "Agendado";
}
export function reminders(date: string) {
  return [
    [7, "Confirmar cardápio"],
    [5, "Confirmar equipe"],
    [3, "Comprar ingredientes"],
    [2, "Confirmar cliente"],
    [1, "Separar utensílios"],
    [0, "Evento"],
  ].map(([days, label]) => ({
    label: String(label),
    offset: Number(days),
    date: new Date(Date.parse(date) - Number(days) * 86400000)
      .toISOString()
      .slice(0, 10),
  }));
}

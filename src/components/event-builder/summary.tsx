import { calculateEventEstimate } from "@/lib/pricing";
import {
  food,
  drinks,
  staff,
  extras,
  money,
  estimateNotice,
} from "@/config/pricing";
import type { EventInput } from "@/lib/validation/event";
export function PriceSummary({ event }: { event: EventInput }) {
  const price = calculateEventEstimate(event);
  return (
    <aside className="panel summary" aria-label="Estimativa do evento">
      <p className="eyebrow">DO SEU JEITO</p>
      <h3>Sua experiência</h3>
      <p>
        {event.guests || 0} convidados · {event.duration || 0} horas
      </p>
      {[
        ["Gastronomia", price.food],
        ["Bar e bebidas", price.drinks],
        ["Equipe", price.staff],
        ["Adicionais", price.extras],
      ].map(([label, value]) => (
        <div className="summary-row" key={label}>
          <span>{label}</span>
          <span>{money(Number(value))}</span>
        </div>
      ))}
      <div className="total">
        <span>Total estimado</span>
        <br />
        <strong aria-live="polite">{money(price.total)}</strong>
      </div>
      <p className="notice">{estimateNotice}</p>
    </aside>
  );
}
export function EventSummary({ event: e }: { event: EventInput }) {
  return (
    <dl className="result-list">
      {[
        ["Evento", e.type],
        [
          "Data e horário",
          `${e.date.split("-").reverse().join("/")} às ${e.time}`,
        ],
        ["Convidados / duração", `${e.guests} pessoas / ${e.duration} horas`],
        ["Local", `${e.venue}, ${e.district}, ${e.city}`],
        [
          "Gastronomia",
          food
            .filter((i) => e.food.includes(i.id))
            .map((i) => i.label)
            .join(", "),
        ],
        [
          "Bebidas",
          drinks
            .filter((i) => e.drinks.includes(i.id))
            .map((i) => i.label)
            .join(", "),
        ],
        ["Drinks por pessoa", e.drinksPerPerson],
        [
          "Equipe",
          staff
            .filter((i) => e.staff[i.id] > 0)
            .map((i) => `${e.staff[i.id]} ${i.label}`)
            .join(", "),
        ],
        [
          "Adicionais",
          extras
            .filter((i) => e.extras.includes(i.id))
            .map((i) => i.label)
            .join(", "),
        ],
        ["Restrições", e.restrictions.join(", ")],
        ["Observações", e.notes],
        [
          "Contato",
          `${e.name} · ${e.whatsapp}${e.email ? ` · ${e.email}` : ""}`,
        ],
      ].map(([label, value]) => (
        <div key={label}>
          <dt>{label}</dt>
          <dd>{value || "Não selecionado"}</dd>
        </div>
      ))}
    </dl>
  );
}

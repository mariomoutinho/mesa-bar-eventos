import type { EventData, statuses } from "@/lib/validation/event";
import type { calculateEventEstimate } from "@/lib/pricing";
export type Status = (typeof statuses)[number];
export type Lead = {
  id: string;
  name: string;
  email: string | null;
  whatsapp: string;
  event_type: EventData["type"];
  event_date: string;
  event_time: string;
  duration: number;
  guests: number;
  city: string;
  district: string;
  venue: string;
  food: string[];
  drinks: string[];
  staff: Record<string, number>;
  extras: string[];
  restrictions: EventData["restrictions"];
  notes: string;
  bar: boolean;
  drinks_per_person: EventData["drinksPerPerson"];
  estimate: ReturnType<typeof calculateEventEstimate>;
  estimated_total: number;
  status: Status;
  created_at: string;
  updated_at: string;
  consent_at: string;
  consent_version: string;
};
export function leadEvent(l: Lead): EventData {
  return {
    type: l.event_type,
    date: l.event_date,
    time: l.event_time.slice(0, 5),
    duration: l.duration,
    guests: l.guests,
    city: l.city,
    district: l.district,
    venue: l.venue,
    food: l.food,
    drinks: l.drinks,
    staff: l.staff,
    extras: l.extras,
    restrictions: l.restrictions,
    notes: l.notes,
    bar: l.bar,
    drinksPerPerson: l.drinks_per_person,
    name: l.name,
    whatsapp: l.whatsapp,
    email: l.email ?? "",
    consent: true,
  };
}
export const statusLabels: Record<Status, string> = {
  novo: "Novo",
  contatado: "Contatado",
  orcamento_enviado: "Orçamento enviado",
  negociacao: "Negociação",
  fechado: "Fechado",
  perdido: "Perdido",
  evento_realizado: "Evento realizado",
};

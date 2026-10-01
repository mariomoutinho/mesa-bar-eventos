import { z } from "zod";
import { food, drinks, extras, staff } from "@/config/pricing";
export const eventTypes = [
  "Aniversário",
  "Evento corporativo",
  "Confraternização",
  "Happy hour",
  "Casamento pequeno",
  "Recepção",
  "Jantar privado",
  "Evento em condomínio",
  "Rooftop",
  "Outro",
] as const;
export const restrictions = [
  "Nenhuma",
  "Vegetariano",
  "Vegano",
  "Sem lactose",
  "Sem glúten",
  "Outro",
] as const;
export const statuses = [
  "novo",
  "contatado",
  "orcamento_enviado",
  "negociacao",
  "fechado",
  "perdido",
  "evento_realizado",
] as const;
export function today() {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Sao_Paulo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}
const selection = (items: { id: string }[]) =>
  z
    .array(
      z
        .string()
        .refine((id) => items.some((i) => i.id === id), "Seleção inválida"),
    )
    .max(items.length)
    .refine((v) => new Set(v).size === v.length, "Seleção duplicada");
export const eventSchema = z
  .object({
    type: z.enum(eventTypes),
    date: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, "Informe uma data válida")
      .refine(
        (v) =>
          !Number.isNaN(Date.parse(v)) &&
          new Date(v).toISOString().slice(0, 10) === v &&
          v > today(),
        "Escolha uma data futura",
      ),
    time: z
      .string()
      .regex(/^([01]\d|2[0-3]):[0-5]\d$/, "Informe um horário válido"),
    duration: z.number().min(1, "Informe ao menos 1 hora").max(24),
    guests: z
      .number()
      .int()
      .min(10, "O mínimo é 10 convidados")
      .max(
        300,
        "Para eventos acima de 300 pessoas, entre em contato diretamente com nossa equipe.",
      ),
    city: z.string().trim().min(2, "Informe a cidade").max(100),
    district: z.string().trim().min(2, "Informe o bairro").max(100),
    venue: z.string().trim().min(2, "Informe o local do evento").max(250),
    food: selection(food),
    restrictions: z
      .array(z.enum(restrictions))
      .min(1)
      .max(6)
      .refine(
        (v) => !v.includes("Nenhuma") || v.length === 1,
        "Selecione Nenhuma ou as restrições aplicáveis",
      ),
    notes: z.string().trim().max(2000),
    bar: z.boolean(),
    drinks: selection(drinks),
    drinksPerPerson: z.enum(["2", "3", "4", "5", "livre"]),
    staff: z.object(
      Object.fromEntries(
        staff.map((s) => [s.id, z.number().int().min(0).max(30)]),
      ) as Record<string, z.ZodNumber>,
    ),
    extras: selection(extras),
    name: z.string().trim().min(2, "Informe seu nome").max(120),
    whatsapp: z
      .string()
      .transform((v) => v.replace(/\D/g, ""))
      .refine(
        (v) => /^(?:55)?[1-9]{2}9?\d{8}$/.test(v),
        "Informe DDD e telefone válidos",
      ),
    email: z.union([z.literal(""), z.email("Informe um e-mail válido")]),
    consent: z
      .boolean()
      .refine((v) => v, "É necessário concordar para solicitar contato"),
  })
  .refine(
    (v) =>
      v.bar || v.drinks.every((id) => ["sem-alcool", "mocktails"].includes(id)),
    {
      message: "Ative o serviço de bar para selecionar bebidas alcoólicas",
      path: ["drinks"],
    },
  )
  .refine(
    (v) =>
      v.food.length +
        v.drinks.length +
        v.extras.length +
        Object.values(v.staff).reduce((a, b) => a + b, 0) >
      0,
    {
      message: "Escolha ao menos um item ou serviço nas etapas anteriores",
      path: ["consent"],
    },
  );
export type EventInput = z.input<typeof eventSchema>;
export type EventData = z.output<typeof eventSchema>;
export const defaultEvent: EventInput = {
  type: "Aniversário",
  date: "",
  time: "19:00",
  duration: 4,
  guests: 40,
  city: "",
  district: "",
  venue: "",
  food: [],
  restrictions: ["Nenhuma"],
  notes: "",
  bar: false,
  drinks: [],
  drinksPerPerson: "3",
  staff: { chef: 0, auxiliar: 0, bartender: 0, garcom: 0, recepcionista: 0 },
  extras: [],
  name: "",
  whatsapp: "",
  email: "",
  consent: false,
};

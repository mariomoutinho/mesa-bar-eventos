"use client";
import { useRef, useState } from "react";
import { useForm, useWatch, type FieldPath } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { ArrowRight, Check, MessageCircle } from "lucide-react";
import { staff, packages } from "@/config/pricing";
import {
  eventSchema,
  defaultEvent,
  type EventInput,
  type EventData,
} from "@/lib/validation/event";
import { suggestStaff } from "@/lib/pricing";
import { PriceSummary, EventSummary } from "./summary";
import { BuilderSteps } from "./steps";
const steps = [
  "Evento",
  "Gastronomia",
  "Bebidas",
  "Equipe",
  "Dados",
  "Estimativa",
];
const fields: FieldPath<EventInput>[][] = [
  ["type", "date", "time", "duration", "guests", "city", "district", "venue"],
  ["food", "restrictions", "notes"],
  ["bar", "drinks", "drinksPerPerson"],
  ["staff", "extras"],
  ["name", "whatsapp", "email", "consent"],
];
function initial(packageId?: string): EventInput {
  const p = packages.find((p) => p.id === packageId);
  if (!p) return structuredClone(defaultEvent);
  const suggested = suggestStaff(
    40,
    p.drinks.some((id) => id !== "sem-alcool"),
  );
  return {
    ...structuredClone(defaultEvent),
    food: p.food,
    drinks: p.drinks,
    extras: p.extras,
    bar: p.drinks.some((id) => id !== "sem-alcool"),
    staff: Object.fromEntries(
      staff.map((s) => [
        s.id,
        p.staff.includes(s.id)
          ? suggested[s.id as keyof typeof suggested] || 1
          : 0,
      ]),
    ),
  };
}
export function Builder({ packageId }: { packageId?: string }) {
  const [step, setStep] = useState(0),
    [busy, setBusy] = useState(false),
    [error, setError] = useState(""),
    [savedUrl, setSavedUrl] = useState("");
  const requestId = useRef<string | null>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const form = useForm<EventInput, unknown, EventData>({
    resolver: zodResolver(eventSchema),
    defaultValues: initial(packageId),
  });
  const { trigger, handleSubmit } = form;
  const event = useWatch({
    control: form.control,
    compute: (values: EventInput) => values,
  });
  function go(n: number) {
    setStep(n);
    setError("");
    setSavedUrl("");
    requestId.current = null;
    setTimeout(() => heading.current?.focus(), 0);
  }
  async function next() {
    if (await trigger(fields[step], { shouldFocus: true })) go(step + 1);
  }
  async function save(data: EventData) {
    if (step !== 5 || busy || savedUrl) return;
    setBusy(true);
    setError("");
    try {
      requestId.current ??= crypto.randomUUID();
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ event: data, requestId: requestId.current }),
      });
      const body = await response.json();
      if (!response.ok) {
        setError(
          typeof body.error === "string"
            ? body.error
            : "Não foi possível salvar seu orçamento. Tente novamente.",
        );
        return;
      }
      setSavedUrl(body.whatsappUrl);
      window.location.assign(body.whatsappUrl);
    } catch {
      setError(
        "Não foi possível salvar seu orçamento. Verifique sua conexão e tente novamente.",
      );
    } finally {
      setBusy(false);
    }
  }
  return (
    <>
      <ol className="progress" aria-label="Etapas do evento">
        {steps.map((s, i) => (
          <li
            className={i <= step ? "active" : ""}
            aria-current={i === step ? "step" : undefined}
            key={s}
          >
            {i + 1}. {s}
          </li>
        ))}
      </ol>
      <div className="builder">
        <form
          className="panel"
          onSubmit={(event) => {
            void handleSubmit(save, () => {
              setError(
                "Revise os campos nas etapas anteriores antes de solicitar o orçamento.",
              );
            })(event);
          }}
        >
          <p className="eyebrow">PASSO {step + 1} DE 6</p>
          <h2 ref={heading} tabIndex={-1} style={{ fontSize: "2rem" }}>
            {
              [
                "Conte sobre seu evento",
                "Sabores para compartilhar",
                "Um brinde ao seu encontro",
                "Cuidado em cada detalhe",
                "Vamos nos conhecer?",
                "Seu evento está quase pronto!",
              ][step]
            }
          </h2>
          <fieldset disabled={!form.formState.isReady || busy}>
            <BuilderSteps step={step} event={event} form={form} />
          </fieldset>
          {step === 5 && (
            <>
              <p>
                Confira os detalhes. Ao solicitar contato, salvaremos seu evento
                e abriremos a mensagem pronta no WhatsApp.
              </p>
              <EventSummary event={event} />
              {savedUrl && (
                <div className="alert success">
                  <Check size={18} /> Orçamento salvo.{" "}
                  <a className="text-link" href={savedUrl}>
                    Continuar para o WhatsApp
                  </a>
                </div>
              )}
            </>
          )}
          {error && (
            <div className="alert error" role="alert">
              {error}
            </div>
          )}
          <div className="form-actions">
            {step > 0 ? (
              <button
                disabled={busy}
                type="button"
                className="button secondary"
                onClick={() => go(step - 1)}
              >
                Voltar
              </button>
            ) : (
              <Link href="/" className="text-link">
                Página inicial
              </Link>
            )}
            {step < 5 ? (
              <button
                type="button"
                className="button"
                onClick={(e) => {
                  e.preventDefault();
                  void next();
                }}
              >
                Continuar <ArrowRight size={16} />
              </button>
            ) : (
              <button
                className="button"
                type="submit"
                disabled={busy || Boolean(savedUrl)}
              >
                <MessageCircle size={18} />
                {busy ? "Salvando…" : "Solicitar orçamento pelo WhatsApp"}
              </button>
            )}
          </div>
        </form>
        <PriceSummary event={event} />
      </div>
    </>
  );
}

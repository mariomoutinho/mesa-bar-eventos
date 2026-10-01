"use client";
import Link from "next/link";
import type { FieldPath, UseFormReturn } from "react-hook-form";
import {
  food,
  drinks,
  staff,
  extras,
  money,
  type Item,
} from "@/config/pricing";
import {
  eventTypes,
  restrictions,
  type EventInput,
  type EventData,
} from "@/lib/validation/event";
import { suggestStaff } from "@/lib/pricing";
export function BuilderSteps({
  step,
  event,
  form,
}: {
  step: number;
  event: EventInput;
  form: UseFormReturn<EventInput, unknown, EventData>;
}) {
  const {
    register,
    setValue,
    formState: { errors },
  } = form;
  const msg = (name: keyof EventInput) =>
    errors[name]?.message ? (
      <span className="error" role="alert">
        {String(errors[name]?.message)}
      </span>
    ) : null;
  const input = (name: FieldPath<EventInput>, label: string, type = "text") => (
    <label className="field" key={name}>
      {label}
      <input
        {...register(name, { valueAsNumber: type === "number" })}
        type={type}
        step={name === "duration" ? "0.5" : undefined}
        aria-invalid={Boolean(errors[name as keyof EventInput])}
        autoComplete={
          name === "name"
            ? "name"
            : name === "email"
              ? "email"
              : name === "whatsapp"
                ? "tel"
                : undefined
        }
      />
      {msg(name as keyof EventInput)}
    </label>
  );
  const choices = (name: "food" | "drinks" | "extras", items: Item[]) => (
    <div className="choices">
      {items.map((i) => (
        <label className="choice" key={i.id}>
          <input type="checkbox" value={i.id} {...register(name)} />
          <span>
            {i.label}
            <small>
              {money(i.price)} {i.unit === "person" ? "/ pessoa" : "/ evento"}
            </small>
          </span>
        </label>
      ))}
    </div>
  );
  return (
    <>
      {step === 0 && (
        <>
          <p>Comece pelas pessoas, pelo lugar e pela ocasião.</p>
          <div className="form-grid">
            <label className="field">
              Tipo do evento
              <select {...register("type")}>
                {eventTypes.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
              {msg("type")}
            </label>
            {input("date", "Data", "date")}
            {input("time", "Horário inicial", "time")}
            {input("duration", "Duração (horas)", "number")}
            {input("guests", "Quantidade de convidados", "number")}
            {input("city", "Cidade")}
            {input("district", "Bairro")}
            {input("venue", "Local do evento")}
          </div>
          <p className="notice">
            Atendemos de 10 a 300 convidados. Para eventos maiores, procure
            nossa equipe.
          </p>
        </>
      )}
      {step === 1 && (
        <>
          <p>
            Selecione as opções que combinam com seu encontro. Os valores dos
            itens são somados.
          </p>
          {choices("food", food)}
          {msg("food")}
          <fieldset>
            <legend>Restrições alimentares</legend>
            <div className="choices">
              {restrictions.map((r) => (
                <label className="choice" key={r}>
                  <input
                    type="checkbox"
                    checked={event.restrictions.includes(r)}
                    onChange={(e) =>
                      setValue(
                        "restrictions",
                        r === "Nenhuma"
                          ? ["Nenhuma"]
                          : e.target.checked
                            ? [
                                ...event.restrictions.filter(
                                  (v) => v !== "Nenhuma",
                                ),
                                r,
                              ]
                            : event.restrictions.filter((v) => v !== r),
                        { shouldValidate: true },
                      )
                    }
                  />
                  {r}
                </label>
              ))}
            </div>
            {msg("restrictions")}
          </fieldset>
          <label className="field">
            Observações sobre alimentação
            <textarea {...register("notes")} />
            {msg("notes")}
          </label>
        </>
      )}
      {step === 2 && (
        <>
          <fieldset>
            <legend>Deseja serviço de bar?</legend>
            <div className="choices">
              {[false, true].map((value) => (
                <label className="choice" key={String(value)}>
                  <input
                    type="radio"
                    name="bar"
                    checked={event.bar === value}
                    onChange={() => {
                      setValue("bar", value);
                      if (!value)
                        setValue(
                          "drinks",
                          event.drinks.filter((id) =>
                            ["sem-alcool", "mocktails"].includes(id),
                          ),
                        );
                    }}
                  />
                  {value ? "Sim" : "Não"}
                </label>
              ))}
            </div>
          </fieldset>
          {choices(
            "drinks",
            drinks.filter(
              (i) => event.bar || ["sem-alcool", "mocktails"].includes(i.id),
            ),
          )}
          {msg("drinks")}
          <label className="field">
            Quantidade estimada de drinks por pessoa
            <select {...register("drinksPerPerson")}>
              {["2", "3", "4", "5", "livre"].map((v) => (
                <option value={v} key={v}>
                  {v === "livre" ? "Livre" : v}
                </option>
              ))}
            </select>
          </label>
          <p className="notice">
            Preços de drinks e mocktails consideram 3 por pessoa. A quantidade
            ajusta esses valores; Livre equivale ao dobro da base. As demais
            bebidas têm valor fixo por pessoa.
          </p>
        </>
      )}
      {step === 3 && (
        <>
          <p>
            Ajuste as quantidades ou use nossa sugestão como ponto de partida.
          </p>
          <button
            type="button"
            className="button secondary"
            onClick={() =>
              setValue("staff", suggestStaff(event.guests, event.bar))
            }
          >
            Aplicar sugestão de equipe
          </button>
          {staff.map((s) => (
            <div className="staff-row" key={s.id}>
              <span>
                {s.label}
                <small className="muted" style={{ display: "block" }}>
                  {money(s.price)} / profissional
                </small>
              </span>
              <label className="field">
                <span className="muted">
                  Quantidade de {s.label.toLowerCase()}
                </span>
                <input
                  type="number"
                  min="0"
                  max="30"
                  {...register(`staff.${s.id}`, { valueAsNumber: true })}
                />
                {errors.staff?.[s.id]?.message && (
                  <span role="alert" className="error">
                    Informe de 0 a 30 profissionais.
                  </span>
                )}
              </label>
            </div>
          ))}
          <p className="notice">
            Equipe: valores para até 4 horas. Cada hora adicional acrescenta
            25%. Sugestão: 1 bartender / 40 pessoas, 1 garçom / 20 e 1 auxiliar
            / 50.
          </p>
          <fieldset>
            <legend>Serviços adicionais</legend>
            {choices("extras", extras)}
          </fieldset>
        </>
      )}
      {step === 4 && (
        <>
          <p>Usaremos seus dados para conversar sobre este orçamento.</p>
          <div className="form-grid">
            {input("name", "Nome")}
            {input("whatsapp", "WhatsApp com DDD", "tel")}
            {input("email", "E-mail (opcional)", "email")}
          </div>
          <label className="consent">
            <input type="checkbox" {...register("consent")} />
            <span>
              Concordo em fornecer estes dados para receber contato sobre meu
              orçamento.{" "}
              <Link href="/politica-de-privacidade" target="_blank">
                Política de Privacidade
              </Link>
            </span>
          </label>
          {msg("consent")}
        </>
      )}
    </>
  );
}

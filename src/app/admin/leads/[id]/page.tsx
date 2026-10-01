import { notFound } from "next/navigation";
import { z } from "zod";
import { requireAdmin } from "@/lib/supabase/admin";
import { AdminNav } from "@/components/admin/nav";
import { StatusForm } from "@/components/admin/status-form";
import { EventSummary } from "@/components/event-builder/summary";
import { leadEvent, type Lead } from "@/types/lead";
import { money, estimateNotice } from "@/config/pricing";
import { whatsappUrl } from "@/lib/whatsapp";
import { dateLabel, reminders } from "@/lib/admin";
export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const db = await requireAdmin();
  const { id } = await params;
  if (!z.uuid().safeParse(id).success) notFound();
  const { data, error } = await db
    .from("leads")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error) throw new Error("Lead unavailable");
  if (!data) notFound();
  const lead = data as Lead;
  const phone =
    lead.whatsapp.startsWith("55") && lead.whatsapp.length >= 12
      ? lead.whatsapp
      : `55${lead.whatsapp}`;
  return (
    <div className="container">
      <AdminNav />
      <p className="eyebrow">
        {lead.status === "fechado"
          ? "CLIENTE · EVENTO FECHADO"
          : "DETALHES DO ORÇAMENTO"}
      </p>
      <h1 className="page-title">{lead.name}</h1>
      <div className="builder">
        <section className="panel">
          <EventSummary event={leadEvent(lead)} />
          <h3>Estimativa registrada</h3>
          {[
            ["Gastronomia", lead.estimate.food],
            ["Bar", lead.estimate.drinks],
            ["Equipe", lead.estimate.staff],
            ["Adicionais", lead.estimate.extras],
            ["Total", lead.estimated_total],
          ].map(([k, v]) => (
            <div className="summary-row" key={k}>
              <span>{k}</span>
              <strong>{money(Number(v))}</strong>
            </div>
          ))}
          <p className="notice">{estimateNotice}</p>
          <p className="muted">
            Recebido em {dateLabel(lead.created_at)} · Atualizado em{" "}
            {dateLabel(lead.updated_at)}
            <br />
            Consentimento registrado em {dateLabel(lead.consent_at)} · Política{" "}
            {lead.consent_version}
          </p>
          <a
            className="button"
            target="_blank"
            rel="noopener noreferrer"
            href={whatsappUrl(
              phone,
              `Olá, ${lead.name}! Vamos conversar sobre seu evento de ${dateLabel(lead.event_date)}?`,
            )}
          >
            Falar pelo WhatsApp
          </a>
        </section>
        <aside className="panel">
          <StatusForm id={id} status={lead.status} />
          {lead.status === "fechado" && (
            <>
              <h3 style={{ marginTop: 30 }}>Lembretes</h3>
              <ul className="reminders">
                {reminders(lead.event_date).map((r) => (
                  <li key={r.offset}>
                    <span className="badge">
                      D{r.offset ? `−${r.offset}` : "0"}
                    </span>{" "}
                    {r.label}
                    <small style={{ display: "block" }}>
                      {dateLabel(r.date)}
                    </small>
                  </li>
                ))}
              </ul>
              <p className="notice">
                Lembretes de planejamento. A execução é acompanhada manualmente.
              </p>
            </>
          )}
        </aside>
      </div>
    </div>
  );
}

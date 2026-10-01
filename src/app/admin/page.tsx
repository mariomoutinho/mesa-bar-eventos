import Link from "next/link";
import { requireAdmin } from "@/lib/supabase/admin";
import { AdminNav } from "@/components/admin/nav";
import { LeadTable } from "@/components/admin/lead-table";
import { money } from "@/config/pricing";
import { today } from "@/lib/validation/event";
import { dateLabel, eventAlert } from "@/lib/admin";
import type { Lead } from "@/types/lead";
export default async function Page() {
  const db = await requireAdmin();
  const { data: metrics, error: mError } = await db.rpc("dashboard_metrics");
  const { data: recent, error: rError } = await db
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(8);
  const { data: upcoming, error: uError } = await db
    .from("leads")
    .select("*")
    .eq("status", "fechado")
    .gte("event_date", today())
    .order("event_date")
    .limit(20);
  if (mError || rError || uError) throw new Error("Dashboard unavailable");
  const m = metrics as {
    new_leads: number;
    quotes: number;
    closed: number;
    upcoming: number;
    potential: number;
  };
  return (
    <div className="container">
      <AdminNav />
      <p className="eyebrow">CUIDAR DOS ENCONTROS</p>
      <h1 className="page-title">Visão geral</h1>
      <div className="metrics">
        {[
          ["Novos leads", m.new_leads],
          ["Orçamentos enviados", m.quotes],
          ["Eventos fechados", m.closed],
          ["Eventos próximos", m.upcoming],
          ["Receita potencial", money(m.potential)],
        ].map(([label, value]) => (
          <div className="metric" key={label}>
            <span>{label}</span>
            <strong>{value}</strong>
          </div>
        ))}
      </div>
      <p className="notice">
        Receita potencial: estimativas de leads novos, contatados, com orçamento
        enviado ou em negociação. Não representa receita realizada.
      </p>
      <section className="panel">
        <h2 style={{ fontSize: "2rem" }}>Próximos eventos</h2>
        {!upcoming?.length && <p>Nenhum evento fechado agendado.</p>}
        {(upcoming as Lead[]).map((l) => (
          <div className="staff-row" key={l.id}>
            <div>
              <Link className="text-link" href={`/admin/leads/${l.id}`}>
                {l.name} · {l.event_type}
              </Link>
              <p>
                {dateLabel(l.event_date)} · {l.guests} convidados · {l.city}
              </p>
            </div>
            <span className="badge">{eventAlert(l.event_date)}</span>
          </div>
        ))}
      </section>
      <h2 style={{ fontSize: "2rem", marginTop: 35 }}>Últimos orçamentos</h2>
      <LeadTable leads={recent as Lead[]} />
    </div>
  );
}

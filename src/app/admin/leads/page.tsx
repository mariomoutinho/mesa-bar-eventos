import Link from "next/link";
import { requireAdmin } from "@/lib/supabase/admin";
import { AdminNav } from "@/components/admin/nav";
import { LeadTable } from "@/components/admin/lead-table";
import { statuses } from "@/lib/validation/event";
import { statusLabels, type Lead, type Status } from "@/types/lead";
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const db = await requireAdmin();
  const p = await searchParams;
  const page = Math.max(1, Math.min(100000, Number(p.page) || 1));
  let query = db.from("leads").select("*", { count: "exact" });
  if (p.q)
    query = query.ilike(
      "name",
      `%${p.q.replace(/[%_\\]/g, "").slice(0, 100)}%`,
    );
  if (statuses.includes(p.status as Status))
    query = query.eq("status", p.status);
  if (p.from && /^\d{4}-\d{2}-\d{2}$/.test(p.from))
    query = query.gte("event_date", p.from);
  if (p.to && /^\d{4}-\d{2}-\d{2}$/.test(p.to))
    query = query.lte("event_date", p.to);
  const { data, error, count } = await query
    .order("event_date", { ascending: p.order !== "desc" })
    .order("id")
    .range((page - 1) * 25, page * 25 - 1);
  if (error) throw new Error("Leads unavailable");
  const url = (n: number) => {
    const params = new URLSearchParams(
      Object.entries(p).filter(
        (e): e is [string, string] => e[1] !== undefined,
      ),
    );
    params.set("page", String(n));
    return `/admin/leads?${params}`;
  };
  return (
    <div className="container">
      <AdminNav />
      <h1 className="page-title">Orçamentos & encontros</h1>
      <form className="filter">
        <label>
          Buscar cliente
          <input name="q" defaultValue={p.q} placeholder="Nome do cliente" />
        </label>
        <label>
          Status
          <select name="status" defaultValue={p.status || ""}>
            <option value="">Todos</option>
            {statuses.map((s) => (
              <option value={s} key={s}>
                {statusLabels[s]}
              </option>
            ))}
          </select>
        </label>
        <label>
          Evento a partir de
          <input type="date" name="from" defaultValue={p.from} />
        </label>
        <label>
          Evento até
          <input type="date" name="to" defaultValue={p.to} />
        </label>
        <label>
          Ordenar data
          <select name="order" defaultValue={p.order || "asc"}>
            <option value="asc">Mais próximos primeiro</option>
            <option value="desc">Mais distantes primeiro</option>
          </select>
        </label>
        <button className="button">Filtrar</button>
      </form>
      <LeadTable leads={data as Lead[]} />
      <div className="form-actions">
        {page > 1 && (
          <Link className="button secondary" href={url(page - 1)}>
            Anterior
          </Link>
        )}
        <span>
          Página {page} · {count} leads
        </span>
        {page * 25 < (count ?? 0) && (
          <Link className="button secondary" href={url(page + 1)}>
            Próxima
          </Link>
        )}
      </div>
    </div>
  );
}

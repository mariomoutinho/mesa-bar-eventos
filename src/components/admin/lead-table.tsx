import Link from "next/link";
import { money } from "@/config/pricing";
import { dateLabel } from "@/lib/admin";
import { statusLabels, type Lead } from "@/types/lead";
export function LeadTable({ leads }: { leads: Lead[] }) {
  if (!leads.length)
    return (
      <div className="panel">
        <h3>Nenhum lead encontrado.</h3>
        <p>Quando alguém solicitar um orçamento, ele aparecerá aqui.</p>
      </div>
    );
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            {[
              "Cliente",
              "Evento",
              "Data",
              "Convidados",
              "Estimativa",
              "Status",
              "WhatsApp",
              "Criado em",
            ].map((h) => (
              <th key={h} scope="col">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {leads.map((l) => (
            <tr key={l.id}>
              <td>
                <Link href={`/admin/leads/${l.id}`}>{l.name}</Link>
              </td>
              <td>{l.event_type}</td>
              <td>{dateLabel(l.event_date)}</td>
              <td>{l.guests}</td>
              <td>{money(l.estimated_total)}</td>
              <td>
                <span className="badge">{statusLabels[l.status]}</span>
              </td>
              <td>{l.whatsapp}</td>
              <td>{dateLabel(l.created_at)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

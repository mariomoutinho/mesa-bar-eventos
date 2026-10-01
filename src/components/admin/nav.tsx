import Link from "next/link";
import { logout } from "@/app/admin/actions";
export function AdminNav() {
  return (
    <nav className="admin-nav" aria-label="Administração">
      <Link href="/admin">Visão geral</Link>
      <Link href="/admin/leads">Todos os leads</Link>
      <form action={logout}>
        <button className="button secondary small">Sair</button>
      </form>
    </nav>
  );
}

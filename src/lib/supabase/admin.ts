import "server-only";
import { redirect } from "next/navigation";
import { configured, supabaseServer } from "./server";
export async function requireAdmin() {
  if (!configured()) redirect("/admin/login");
  const db = await supabaseServer();
  const {
    data: { user },
    error,
  } = await db.auth.getUser();
  if (error || !user) redirect("/admin/login");
  const { data: admin } = await db
    .from("admin_users")
    .select("user_id")
    .eq("user_id", user.id)
    .maybeSingle();
  if (!admin) redirect("/admin/login?erro=acesso");
  return db;
}

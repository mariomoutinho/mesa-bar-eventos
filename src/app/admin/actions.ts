"use server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { configured, supabaseServer } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/supabase/admin";
import { statuses } from "@/lib/validation/event";
export async function login(_: string, form: FormData) {
  const parsed = z
    .object({ email: z.email(), password: z.string().min(1).max(256) })
    .safeParse(Object.fromEntries(form));
  if (!parsed.success) return "Informe seu e-mail e senha.";
  if (!configured())
    return "Configure o Supabase para acessar a área administrativa.";
  const db = await supabaseServer();
  const { data, error } = await db.auth.signInWithPassword(parsed.data);
  if (error || !data.user)
    return "Não foi possível entrar. Verifique seu e-mail e senha.";
  const { data: admin } = await db
    .from("admin_users")
    .select("user_id")
    .eq("user_id", data.user.id)
    .maybeSingle();
  if (!admin) {
    await db.auth.signOut();
    return "Esta conta não possui acesso administrativo.";
  }
  redirect("/admin");
}
export async function logout() {
  const db = await supabaseServer();
  await db.auth.signOut();
  redirect("/admin/login");
}
export async function updateStatus(_: string, form: FormData) {
  const db = await requireAdmin();
  const parsed = z
    .object({ id: z.uuid(), status: z.enum(statuses) })
    .safeParse(Object.fromEntries(form));
  if (!parsed.success) return "Status inválido.";
  const { data, error } = await db
    .from("leads")
    .update({ status: parsed.data.status })
    .eq("id", parsed.data.id)
    .select("id")
    .maybeSingle();
  if (error || !data)
    return "Não foi possível alterar o status. Tente novamente.";
  revalidatePath("/admin");
  revalidatePath("/admin/leads");
  revalidatePath(`/admin/leads/${parsed.data.id}`);
  return "Status atualizado.";
}

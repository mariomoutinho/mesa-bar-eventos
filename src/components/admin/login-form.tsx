"use client";
import { useActionState } from "react";
import { login } from "@/app/admin/actions";
export function LoginForm() {
  const [message, action, pending] = useActionState(login, "");
  return (
    <form action={action} className="panel">
      <div className="form-grid">
        <label className="field span-full">
          E-mail
          <input type="email" name="email" autoComplete="username" required />
        </label>
        <label className="field span-full">
          Senha
          <input
            type="password"
            name="password"
            autoComplete="current-password"
            required
          />
        </label>
      </div>
      {message && (
        <p className="alert" role="alert">
          {message}
        </p>
      )}
      <button className="button" style={{ marginTop: 24 }} disabled={pending}>
        {pending ? "Entrando…" : "Entrar no painel"}
      </button>
    </form>
  );
}

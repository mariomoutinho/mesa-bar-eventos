"use client";
import { useActionState } from "react";
import { updateStatus } from "@/app/admin/actions";
import { statuses } from "@/lib/validation/event";
import { statusLabels, type Status } from "@/types/lead";
export function StatusForm({ id, status }: { id: string; status: Status }) {
  const [message, action, pending] = useActionState(updateStatus, "");
  return (
    <form action={action}>
      <input type="hidden" name="id" value={id} />
      <label className="field">
        Status comercial
        <select name="status" defaultValue={status}>
          {statuses.map((s) => (
            <option key={s} value={s}>
              {statusLabels[s]}
            </option>
          ))}
        </select>
      </label>
      <button className="button" style={{ marginTop: 16 }} disabled={pending}>
        {pending ? "Salvando…" : "Atualizar status"}
      </button>
      {message && (
        <p role="status" className="alert">
          {message}
        </p>
      )}
    </form>
  );
}

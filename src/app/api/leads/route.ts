import { createHash } from "node:crypto";
import { NextResponse } from "next/server";
import { z } from "zod";
import { eventSchema } from "@/lib/validation/event";
import { calculateEventEstimate } from "@/lib/pricing";
import { eventMessage, whatsappUrl } from "@/lib/whatsapp";
import { configured, supabaseService } from "@/lib/supabase/server";
import { brand } from "@/config/brand";
export async function POST(request: Request) {
  if (
    !configured() ||
    !process.env.SUPABASE_SERVICE_ROLE_KEY ||
    !brand.whatsapp
  )
    return NextResponse.json(
      {
        error:
          "O atendimento online ainda está sendo configurado. Tente novamente mais tarde.",
      },
      { status: 503 },
    );
  try {
    const text = await request.text();
    if (text.length > 16000)
      return NextResponse.json(
        { error: "O formulário excede o tamanho permitido." },
        { status: 413 },
      );
    let raw: unknown;
    try {
      raw = JSON.parse(text);
    } catch {
      return NextResponse.json(
        { error: "Formulário inválido." },
        { status: 400 },
      );
    }
    const parsed = z
      .object({ event: eventSchema, requestId: z.uuid() })
      .safeParse(raw);
    if (!parsed.success)
      return NextResponse.json(
        { error: "Revise os dados do evento e tente novamente." },
        { status: 400 },
      );
    const { event, requestId } = parsed.data;
    const estimate = calculateEventEstimate(event);
    const url = whatsappUrl(
      brand.whatsapp,
      eventMessage(event, estimate.total),
    );
    const db = supabaseService();
    const { data: setting, error: settingsError } = await db
      .from("app_settings")
      .select("value")
      .eq("key", "accepting_quotes")
      .single();
    if (settingsError || setting?.value !== true)
      return NextResponse.json(
        {
          error:
            "Não estamos recebendo novos orçamentos neste momento. Tente novamente mais tarde.",
        },
        { status: 503 },
      );
    const hash = createHash("sha256")
      .update(JSON.stringify(event))
      .digest("hex");
    const { error } = await db
      .from("leads")
      .insert({
        id: requestId,
        request_hash: hash,
        name: event.name,
        email: event.email || null,
        whatsapp: event.whatsapp,
        event_type: event.type,
        event_date: event.date,
        event_time: event.time,
        duration: event.duration,
        guests: event.guests,
        city: event.city,
        district: event.district,
        venue: event.venue,
        food: event.food,
        drinks: event.drinks,
        staff: event.staff,
        extras: event.extras,
        restrictions: event.restrictions,
        notes: event.notes,
        bar: event.bar,
        drinks_per_person: event.drinksPerPerson,
        estimate,
        estimated_total: estimate.total,
        consent_at: new Date().toISOString(),
        consent_version: "2026-10-01",
      });
    if (error && error.code !== "23505") {
      console.error("lead_insert_failed", { code: error.code });
      return NextResponse.json(
        { error: "Não foi possível salvar seu orçamento. Tente novamente." },
        { status: 500 },
      );
    }
    if (error?.code === "23505") {
      const { data: existing } = await db
        .from("leads")
        .select("request_hash")
        .eq("id", requestId)
        .single();
      if (existing?.request_hash !== hash)
        return NextResponse.json(
          {
            error:
              "Os dados foram alterados. Volte uma etapa e tente novamente.",
          },
          { status: 409 },
        );
    }
    return NextResponse.json({ whatsappUrl: url }, { status: 201 });
  } catch {
    console.error("lead_request_failed");
    return NextResponse.json(
      { error: "Não foi possível salvar seu orçamento. Tente novamente." },
      { status: 500 },
    );
  }
}

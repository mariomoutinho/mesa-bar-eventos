begin;
create table public.admin_users (user_id uuid primary key references auth.users(id) on delete cascade, created_at timestamptz not null default now());
alter table public.admin_users enable row level security;
revoke all on public.admin_users from anon,authenticated;
grant select on public.admin_users to authenticated;
grant all on public.admin_users to service_role;
create policy "Read own membership" on public.admin_users for select to authenticated using (user_id = (select auth.uid()));
create function public.is_admin() returns boolean language sql stable security definer set search_path = '' as $$ select exists(select 1 from public.admin_users where user_id = (select auth.uid())); $$;
revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to authenticated;
create table public.leads (
 id uuid primary key default gen_random_uuid(), request_hash text not null, name text not null check(length(name) between 2 and 120), email text, whatsapp text not null,
 event_type text not null,event_date date not null,event_time time not null,duration numeric not null check(duration between 1 and 24),guests integer not null check(guests between 10 and 300),
 city text not null,district text not null,venue text not null,food jsonb not null default '[]',drinks jsonb not null default '[]',staff jsonb not null default '{}',extras jsonb not null default '[]',restrictions jsonb not null default '[]',notes text not null default '',bar boolean not null default false,drinks_per_person text not null check(drinks_per_person in ('2','3','4','5','livre')),
 estimate jsonb not null,estimated_total numeric(12,2) not null check(estimated_total >= 0),status text not null default 'novo' check(status in ('novo','contatado','orcamento_enviado','negociacao','fechado','perdido','evento_realizado')),
 consent_at timestamptz not null,consent_version text not null,created_at timestamptz not null default now(),updated_at timestamptz not null default now()
);
alter table public.leads enable row level security;
revoke all on public.leads from anon,authenticated;
grant select on public.leads to authenticated;
grant update(status) on public.leads to authenticated;
grant all on public.leads to service_role;
create policy "Admins read leads" on public.leads for select to authenticated using ((select public.is_admin()));
create policy "Admins update leads" on public.leads for update to authenticated using ((select public.is_admin())) with check ((select public.is_admin()));
create function public.touch_updated_at() returns trigger language plpgsql set search_path = '' as $$ begin new.updated_at = now(); return new; end; $$;
create trigger leads_updated before update on public.leads for each row execute function public.touch_updated_at();
create index leads_status_date on public.leads(status,event_date);
create index leads_created on public.leads(created_at desc);
create function public.dashboard_metrics() returns jsonb language sql stable security invoker set search_path = '' as $$
 select jsonb_build_object('new_leads', count(*) filter(where status='novo'),'quotes', count(*) filter(where status='orcamento_enviado'),'closed',count(*) filter(where status='fechado'),'upcoming',count(*) filter(where status='fechado' and event_date >= (now() at time zone 'America/Sao_Paulo')::date),'potential',coalesce(sum(estimated_total) filter(where status in ('novo','contatado','orcamento_enviado','negociacao')),0)) from public.leads;
$$;
revoke all on function public.dashboard_metrics() from public;
grant execute on function public.dashboard_metrics() to authenticated;
create table public.app_settings (key text primary key, value jsonb not null);
alter table public.app_settings enable row level security;
revoke all on public.app_settings from anon,authenticated;
grant select on public.app_settings to authenticated;
grant all on public.app_settings to service_role;
create policy "Admins read settings" on public.app_settings for select to authenticated using ((select public.is_admin()));
insert into public.app_settings(key,value) values ('accepting_quotes','true');
-- Brand and pricing are versioned in src/config in this MVP; event snapshots preserve historical estimates.
commit;

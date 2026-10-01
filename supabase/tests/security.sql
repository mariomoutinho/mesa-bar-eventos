-- Run only against an isolated test database with the migration already applied.
\set ON_ERROR_STOP on
insert into auth.users(id) values ('00000000-0000-0000-0000-000000000001'),('00000000-0000-0000-0000-000000000002');
insert into public.admin_users(user_id) values ('00000000-0000-0000-0000-000000000001');
insert into public.leads(id,request_hash,name,whatsapp,event_type,event_date,event_time,duration,guests,city,district,venue,drinks_per_person,estimate,estimated_total,consent_at,consent_version) values ('00000000-0000-0000-0000-000000000003','test-hash','Test Lead','11999991234','Aniversário','2099-12-20','19:00',4,40,'Test','Test','Test','3','{"total":1800}',1800,now(),'test');
set role authenticated;
select set_config('request.jwt.claim.sub','00000000-0000-0000-0000-000000000002',false);
do $$ begin if exists(select 1 from public.leads) then raise exception 'non-admin can read leads'; end if; if public.is_admin() then raise exception 'non-admin authorized'; end if; end $$;
select set_config('request.jwt.claim.sub','00000000-0000-0000-0000-000000000001',false);
do $$ begin if (select count(*) from public.leads) <> 1 then raise exception 'admin cannot read'; end if; if (public.dashboard_metrics()->>'potential')::numeric <> 1800 then raise exception 'metrics incorrect'; end if; end $$;
update public.leads set status='fechado' where id='00000000-0000-0000-0000-000000000003';
do $$ begin if (select status from public.leads limit 1) <> 'fechado' then raise exception 'admin cannot update'; end if; if has_column_privilege('authenticated','public.leads','estimated_total','UPDATE') then raise exception 'admin can change estimate'; end if; if has_table_privilege('anon','public.leads','SELECT') then raise exception 'anonymous read granted'; end if; if has_table_privilege('authenticated','public.leads','INSERT') then raise exception 'authenticated insert granted'; end if; end $$;
reset role;
select 'Migration, RLS, status update and dashboard verified' as result;

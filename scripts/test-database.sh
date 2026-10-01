#!/usr/bin/env bash
set -euo pipefail
repo_dir="$(cd "$(dirname "$0")/.." && pwd)"
pg_bin="${PG_BIN:-/usr/lib/postgresql/16/bin}"
test_dir="$(mktemp -d /tmp/mesa-bar-db-test.XXXXXX)"
cleanup() { "$pg_bin/pg_ctl" -D "$test_dir/data" stop -m fast >/dev/null 2>&1 || true; rm -rf -- "$test_dir"; }
trap cleanup EXIT
"$pg_bin/initdb" -D "$test_dir/data" -A trust --no-locale -E UTF8 >/dev/null
"$pg_bin/pg_ctl" -D "$test_dir/data" -l "$test_dir/server.log" -o "-h '' -k $test_dir" start >/dev/null
psql_args=(-h "$test_dir" -d postgres -v ON_ERROR_STOP=1)
psql "${psql_args[@]}" <<'SQL'
create role anon nologin;
create role authenticated nologin;
create role service_role nologin bypassrls;
create schema auth;
create table auth.users(id uuid primary key);
create function auth.uid() returns uuid language sql stable as $$ select nullif(current_setting('request.jwt.claim.sub',true),'')::uuid $$;
grant usage on schema public,auth to anon,authenticated,service_role;
SQL
psql "${psql_args[@]}" -f "$repo_dir/supabase/migrations/202610010001_initial.sql"
psql "${psql_args[@]}" -f "$repo_dir/supabase/tests/security.sql"

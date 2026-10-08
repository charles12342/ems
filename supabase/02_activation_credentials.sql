-- =====================================================================
-- PATCH 02 — send username + temporary password on activation
-- Paste into Supabase SQL Editor > Run. Safe to re-run.
-- =====================================================================

create extension if not exists pgcrypto with schema extensions;

alter table public.employees add column if not exists password_hash text;
alter table public.employees add column if not exists must_change_password boolean not null default true;

-- verify now also returns the username (for the email)
create or replace function public.verify_employee_for_activation(p_employee_id text, p_email text)
returns jsonb
language sql
stable
security definer
set search_path = ''
as $$
  select coalesce(
    (select jsonb_build_object(
              'status', case when e.is_activated then 'already_activated' else 'ok' end,
              'first_name', e.first_name,
              'username', e.username)
       from public.employees e
      where e.employee_id = trim(p_employee_id)
        and lower(e.email) = lower(trim(p_email))),
    jsonb_build_object('status', 'not_found')
  );
$$;

-- activates the account and stores the bcrypt hash of the temporary password
create or replace function public.activate_employee(p_employee_id text, p_email text, p_temp_password text)
returns boolean
language plpgsql
security definer
set search_path = ''
as $$
begin
  if length(coalesce(p_temp_password, '')) < 8 then
    raise exception 'Temporary password too short';
  end if;

  update public.employees
     set is_activated = true,
         activated_at = now(),
         password_hash = extensions.crypt(p_temp_password, extensions.gen_salt('bf')),
         must_change_password = true
   where employee_id = trim(p_employee_id)
     and lower(email) = lower(trim(p_email))
     and not is_activated;

  return found;
end;
$$;

revoke all on function public.activate_employee(text, text, text) from public;
grant execute on function public.activate_employee(text, text, text) to anon, authenticated;

-- old function no longer used
drop function if exists public.mark_employee_activated(text, text);

-- Your account -> Department Manager
update public.employees
   set role = 'DEPARTMENT_MANAGER',
       position = 'Software Engineering Manager',
       employment_type = 'Permanent / Department Head',
       work_location = 'Main Office (Executive Wing)',
       reports_to = 'VP of Engineering'
 where employee_id = '26-0001-001';

-- Reset your test account anytime with:
-- update public.employees set is_activated = false, activated_at = null, password_hash = null where employee_id = '26-0001-001';

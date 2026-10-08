-- =====================================================================
-- JobQuest EMS — schema + seed data
-- Paste this whole file into Supabase Dashboard > SQL Editor > Run.
-- Safe to re-run (uses IF NOT EXISTS / ON CONFLICT DO NOTHING).
-- =====================================================================

-- ---------- EMPLOYEES ----------
create table if not exists public.employees (
  employee_id      text primary key,
  username         text not null unique,
  email            text not null unique,
  role             text not null check (role in ('EMPLOYEE','DEPARTMENT_MANAGER')),
  department       text not null,
  position         text not null,
  is_activated     boolean not null default false,
  activated_at     timestamptz,
  avatar_url       text not null default '/avatar.jpg',
  first_name       text not null,
  last_name        text not null,
  alternate_email  text,
  contact_number   text,
  address          text,
  birth_date       date,
  gender           text,
  civil_status     text,
  date_hired       date,
  employment_type  text,
  work_location    text,
  reports_to       text,
  created_at       timestamptz not null default now()
);
create unique index if not exists employees_email_lower_idx on public.employees (lower(email));

-- ---------- DTR ----------
create table if not exists public.dtr_records (
  id           text primary key,
  employee_id  text not null references public.employees(employee_id) on delete cascade,
  date         date not null,
  day_of_week  text not null,
  time_in      time,
  time_out     time,
  total_hours  numeric(4,1) not null default 0,
  status       text not null check (status in ('PRESENT','LATE','ABSENT','ON_LEAVE','NOT_CLOCKED_IN')),
  remarks      text,
  unique (employee_id, date)
);

-- ---------- TASKS ----------
create table if not exists public.tasks (
  id               text primary key,
  title            text not null,
  category         text not null,
  description      text not null,
  priority         text not null check (priority in ('LOW','MEDIUM','HIGH')),
  status           text not null check (status in ('TODO','IN_PROGRESS','COMPLETED','OVERDUE')),
  start_date       date not null,
  due_date         date not null,
  assigned_by      text not null,
  department       text not null,
  remarks          text,
  attachment_name  text,
  created_at       timestamptz not null default now()
);

create table if not exists public.task_assignees (
  task_id      text not null references public.tasks(id) on delete cascade,
  employee_id  text not null references public.employees(employee_id) on delete cascade,
  primary key (task_id, employee_id)
);
create index if not exists task_assignees_employee_idx on public.task_assignees (employee_id);

-- ---------- ANNOUNCEMENTS ----------
create table if not exists public.announcements (
  id               text primary key,
  title            text not null,
  category         text not null check (category in ('COMPANY_UPDATE','POLICY','EVENTS','OTHERS')),
  message          text not null,
  author_name      text not null,
  department       text not null,
  date_posted      date not null default current_date,
  status           text not null check (status in ('PUBLISHED','DRAFT','ARCHIVED')),
  attachment_name  text
);

-- ---------- LEAVE ----------
create table if not exists public.leave_requests (
  id                text primary key,
  employee_id       text not null references public.employees(employee_id) on delete cascade,
  employee_name     text not null,
  department        text not null,
  leave_type        text not null check (leave_type in ('VACATION','SICK','SPECIAL','MATERNITY')),
  start_date        date not null,
  end_date          date not null,
  total_days        integer not null,
  reason            text not null,
  reason_details    text,
  contact_number    text not null,
  attachment_name   text,
  status            text not null default 'PENDING' check (status in ('PENDING','APPROVED','REJECTED')),
  date_filed        date not null default current_date,
  manager_remarks   text,
  rejection_reason  text
);
create index if not exists leave_requests_employee_idx on public.leave_requests (employee_id);

create table if not exists public.leave_request_history (
  id                bigint generated always as identity primary key,
  leave_request_id  text not null references public.leave_requests(id) on delete cascade,
  occurred_at       timestamptz not null,
  action            text not null,
  actor             text not null
);
create index if not exists leave_history_request_idx on public.leave_request_history (leave_request_id);

create table if not exists public.leave_balances (
  employee_id          text primary key references public.employees(employee_id) on delete cascade,
  vacation_available   integer not null default 15,
  vacation_total       integer not null default 15,
  sick_available       integer not null default 10,
  sick_total           integer not null default 10,
  special_available    integer not null default 3,
  special_total        integer not null default 3,
  maternity_available  integer not null default 0,
  maternity_total      integer not null default 0
);

-- ---------- RLS: ON for every table, no public policies yet ----------
-- (Data stays private until Supabase Auth login is wired up.)
alter table public.employees              enable row level security;
alter table public.dtr_records            enable row level security;
alter table public.tasks                  enable row level security;
alter table public.task_assignees         enable row level security;
alter table public.announcements          enable row level security;
alter table public.leave_requests         enable row level security;
alter table public.leave_request_history  enable row level security;
alter table public.leave_balances         enable row level security;

-- =====================================================================
-- SEED DATA
-- =====================================================================
insert into public.employees (employee_id, username, email, role, department, position, is_activated, first_name, last_name, alternate_email, contact_number, address, birth_date, gender, civil_status, date_hired, employment_type, work_location, reports_to) values
  -- YOUR ACCOUNT (not yet activated -> use this to test activation)
  ('26-0001-001','@charlesjoshua','charlesjoshualisingwup@gmail.com','DEPARTMENT_MANAGER','Software Engineering','Software Engineering Manager',false,'Charles Joshua','Lising','charlesjoshualisingwup@gmail.com','+63 912 345 6789','Manila, Philippines','2003-05-06','Male','Single','2026-10-08','Permanent / Department Head','Main Office (Executive Wing)','VP of Engineering'),
  ('24-2545-483','@charles_employee','lisingcharles@gmail.com','EMPLOYEE','Software Engineering','Frontend Software Engineer',true,'Charles','Lising','lisingcharles@gmail.com','+63 912 345 6789','Manila, Philippines','2003-05-06','Male','Single','2024-01-15','Regular / Full-time','Main Office (Building 2)','Charles Joshua Lising (Department Manager)'),
  ('21-1022-101','@charles_manager','charleslising0506@gmail.com','DEPARTMENT_MANAGER','Software Engineering','Software Engineering Manager',true,'Charles Joshua','Lising','charleslising0506@gmail.com','+63 917 888 1234','Quezon City, Philippines','1998-05-06','Male','Single','2021-03-01','Permanent / Department Head','Main Office (Executive Wing)','VP of Engineering'),
  ('24-3011-204','@gabriel_enrile','gabriel.enrile@quicktouch.com','EMPLOYEE','Software Engineering','UI/UX Product Designer',true,'Gabriel','Enrile','gabriel@enrile.design','+63 918 901 2345','Makati City, Philippines','2002-09-14','Male','Single','2024-03-01','Regular / Full-time','Main Office (Building 2)','Maria Santos (Engineering Manager)'),
  ('24-4102-330','@shayne_villaroman','shayne.villaroman@quicktouch.com','EMPLOYEE','Software Engineering','QA & Automation Specialist',true,'Shayne','Villaroman','shayne@villaroman.net','+63 920 445 6789','Taguig City, Philippines','2003-02-18','Female','Single','2024-04-10','Probationary / Full-time','Main Office (Building 2)','Maria Santos (Engineering Manager)'),
  ('24-5501-772','@reyn_database','reyn.database@quicktouch.com','EMPLOYEE','Software Engineering','Database Architect',true,'Reyn','Del Rosario','reyn@delrosario.dev','+63 919 777 3456','Pasig City, Philippines','2001-08-12','Male','Single','2024-02-15','Regular / Full-time','Main Office (Building 2)','Maria Santos (Engineering Manager)')
on conflict (employee_id) do nothing;

update public.employees set activated_at = now() where is_activated and activated_at is null;

insert into public.dtr_records (id, employee_id, date, day_of_week, time_in, time_out, total_hours, status, remarks) values
  ('dtr-1','24-2545-483','2026-10-01','Thursday','07:55','17:05',9.1,'PRESENT','On time'),
  ('dtr-2','24-2545-483','2026-10-02','Friday','08:14','17:10',8.9,'LATE','14 mins late'),
  ('dtr-3','24-2545-483','2026-10-05','Monday','07:50','17:00',9.0,'PRESENT','Early arrival'),
  ('dtr-4','24-2545-483','2026-10-06','Tuesday','08:00','17:00',9.0,'PRESENT','Regular shift'),
  ('dtr-5','24-2545-483','2026-10-07','Wednesday','07:58','17:02',9.0,'PRESENT','Regular shift'),
  ('dtr-6','24-2545-483','2026-10-08','Thursday','08:02',null,0,'PRESENT','Clocked in today'),
  ('dtr-10','24-3011-204','2026-10-08','Thursday','08:32',null,0,'LATE','Late 32m'),
  ('dtr-11','24-4102-330','2026-10-08','Thursday','07:50',null,0,'PRESENT','On time'),
  ('dtr-12','24-5501-772','2026-10-08','Thursday',null,null,0,'ON_LEAVE','Approved Vacation Leave')
on conflict (id) do nothing;

insert into public.tasks (id, title, category, description, priority, status, start_date, due_date, assigned_by, department, remarks) values
  ('tsk-1','Implement Responsive Desktop Layout for EMS','Development','Build clean, persistent sidebar shell adhering to Quicktouch velvet burgundy guidelines and desktop ergonomic rules.','HIGH','IN_PROGRESS','2026-10-06','2026-10-10','Maria Santos','Software Engineering','Progressing smoothly on React 19 App router.'),
  ('tsk-2','Audit Daily Time Record (DTR) Calculation Logic','Quality Assurance','Verify that work duration correctly deducts 1 hour lunch break and handles grace period for morning clock-ins.','MEDIUM','TODO','2026-10-08','2026-10-14','Maria Santos','Software Engineering',null),
  ('tsk-3','Produce High-Fidelity Figma Component Library','Design System','Export all color tokens, status chips, and split-pane view specifications into shared design tokens.','LOW','COMPLETED','2026-09-28','2026-10-05','Maria Santos','Software Engineering','Delivered on Figma and approved by Gabriel Enrile.'),
  ('tsk-4','Optimize PostgreSQL Schema for Leave Records','Database','Ensure index coverage for employee ID and date range queries in the upcoming release.','HIGH','TODO','2026-10-07','2026-10-12','Maria Santos','Software Engineering',null)
on conflict (id) do nothing;

insert into public.task_assignees (task_id, employee_id) values
  ('tsk-1','24-2545-483'),
  ('tsk-2','24-2545-483'),
  ('tsk-2','24-4102-330'),
  ('tsk-3','24-3011-204'),
  ('tsk-4','24-5501-772')
on conflict do nothing;

insert into public.announcements (id, title, category, message, author_name, department, date_posted, status, attachment_name) values
  ('ann-1','Mid-October All-Hands & Technical Showcase','EVENTS','Join us this Friday at 3:00 PM in Conference Hall A for our monthly department all-hands. We will demo the new Quicktouch EMS platform alongside live feedback sessions.','Maria Santos (Engineering Manager)','Software Engineering','2026-10-07','PUBLISHED','Q4_Townhall_Agenda.pdf'),
  ('ann-2','Updated Leave Filing Policy and Cutoff Guidelines','POLICY','Employees are reminded that all planned vacation leaves exceeding 3 days must be submitted at least one week in advance. Emergency and medical leaves must attach valid certificates.','Maria Santos (Engineering Manager)','Software Engineering','2026-10-04','PUBLISHED',null),
  ('ann-3','Cloud Infrastructure Scheduled Maintenance','COMPANY_UPDATE','The development sandbox servers will undergo routine kernel security updates this Saturday between 1:00 AM and 5:00 AM. Please ensure active branches are committed.','IT Operations Lead','Software Engineering','2026-10-02','PUBLISHED','Maintenance_Notice_v2.pdf')
on conflict (id) do nothing;

insert into public.leave_requests (id, employee_id, employee_name, department, leave_type, start_date, end_date, total_days, reason, reason_details, contact_number, status, date_filed, manager_remarks) values
  ('LR-2026-081','24-2545-483','Charles Joshua Lising','Software Engineering','VACATION','2026-10-19','2026-10-21',3,'Personal rest and family gathering','Annual leave taken during midterm break. Will be reachable by emergency phone.','+63 912 345 6789','PENDING','2026-10-06',null),
  ('LR-2026-079','24-5501-772','Reyn Del Rosario','Software Engineering','VACATION','2026-10-08','2026-10-09',2,'Out of town family travel',null,'+63 919 777 3456','APPROVED','2026-10-01','Approved. Handed off DB maintenance to Charles.')
on conflict (id) do nothing;

insert into public.leave_request_history (leave_request_id, occurred_at, action, actor)
select * from (values
  ('LR-2026-081','2026-10-06 09:30+08'::timestamptz,'Request submitted by employee','Charles Joshua Lising'),
  ('LR-2026-081','2026-10-06 10:00+08'::timestamptz,'Queued for Department Manager review','System'),
  ('LR-2026-079','2026-10-01 11:20+08'::timestamptz,'Request submitted by employee','Reyn Del Rosario'),
  ('LR-2026-079','2026-10-02 14:15+08'::timestamptz,'Approved with remarks','Maria Santos')
) v(leave_request_id, occurred_at, action, actor)
where not exists (select 1 from public.leave_request_history);

-- Default balances for everyone, then the specific mock balance for 24-2545-483
insert into public.leave_balances (employee_id)
select employee_id from public.employees
on conflict (employee_id) do nothing;

update public.leave_balances
set vacation_available = 12, sick_available = 9
where employee_id = '24-2545-483';

-- =====================================================================
-- ACTIVATION RPCs (callable from the browser with the publishable key)
-- They only reveal whether an ID+email pair matches — never other data.
-- =====================================================================
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
              'first_name', e.first_name)
       from public.employees e
      where e.employee_id = trim(p_employee_id)
        and lower(e.email) = lower(trim(p_email))),
    jsonb_build_object('status', 'not_found')
  );
$$;

create or replace function public.mark_employee_activated(p_employee_id text, p_email text)
returns boolean
language sql
security definer
set search_path = ''
as $$
  with updated as (
    update public.employees
       set is_activated = true, activated_at = now()
     where employee_id = trim(p_employee_id)
       and lower(email) = lower(trim(p_email))
       and not is_activated
    returning 1
  )
  select exists (select 1 from updated);
$$;

revoke all on function public.verify_employee_for_activation(text, text) from public;
revoke all on function public.mark_employee_activated(text, text) from public;
grant execute on function public.verify_employee_for_activation(text, text) to anon, authenticated;
grant execute on function public.mark_employee_activated(text, text) to anon, authenticated;

-- Reset your test account anytime with:
-- update public.employees set is_activated = false, activated_at = null where employee_id = '26-0001-001';

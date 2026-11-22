-- Run once in Supabase > SQL Editor
create table if not exists admins (user_id uuid primary key references auth.users(id) on delete cascade);
create or replace function is_admin() returns boolean language sql security definer stable as
$$ select exists (select 1 from admins where user_id = auth.uid()) $$;

create table if not exists items (
  id uuid primary key default gen_random_uuid(),
  section text not null,            -- profile, projects, skills, certificates, education, experience, achievements, interests, extras
  data jsonb not null default '{}', -- draft content (what you edit)
  live jsonb,                       -- published content (what visitors see)
  deleted boolean not null default false,
  sort int not null default 0,
  created_at timestamptz default now()
);
create table if not exists messages (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 1 and 120),
  email text not null check (char_length(email) between 3 and 200),
  message text not null check (char_length(message) between 1 and 3000),
  created_at timestamptz default now()
);
alter table items enable row level security;
alter table messages enable row level security;
alter table admins enable row level security;

create policy "public reads published" on items for select using (live is not null and not deleted);
create policy "admin all items" on items for all using (is_admin()) with check (is_admin());
create policy "anyone sends message" on messages for insert with check (true);
create policy "admin reads messages" on messages for select using (is_admin());
create policy "admin deletes messages" on messages for delete using (is_admin());
create policy "admin reads admins" on admins for select using (user_id = auth.uid());

create or replace function publish_all() returns void language plpgsql security definer as $$
begin
  if not is_admin() then raise exception 'not allowed'; end if;
  delete from items where deleted;
  update items set live = data where true;
end $$;

-- Storage: public bucket for photo, resume, project images, certificates
insert into storage.buckets (id, name, public) values ('media','media', true) on conflict do nothing;
create policy "public reads media" on storage.objects for select using (bucket_id = 'media');
create policy "admin writes media" on storage.objects for insert with check (bucket_id='media' and is_admin());
create policy "admin updates media" on storage.objects for update using (bucket_id='media' and is_admin());
create policy "admin deletes media" on storage.objects for delete using (bucket_id='media' and is_admin());

-- AFTER creating your user in Authentication > Users, run (use your email):
-- insert into admins select id from auth.users where email = 'YOUR_EMAIL';

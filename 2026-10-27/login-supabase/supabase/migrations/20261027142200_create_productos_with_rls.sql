create table public.productos (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade default auth.uid(),
  nombre text not null check (char_length(trim(nombre)) > 0),
  descripcion text,
  precio numeric(12, 2) not null default 0 check (precio >= 0),
  created_at timestamptz not null default now()
);

create index productos_user_id_created_at_idx
  on public.productos (user_id, created_at desc);

alter table public.productos enable row level security;

create policy "Los usuarios pueden ver sus propios productos"
  on public.productos for select
  to authenticated
  using (auth.uid() = user_id);

create policy "Los usuarios pueden crear sus propios productos"
  on public.productos for insert
  to authenticated
  with check (auth.uid() = user_id);

create policy "Los usuarios pueden editar sus propios productos"
  on public.productos for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Los usuarios pueden eliminar sus propios productos"
  on public.productos for delete
  to authenticated
  using (auth.uid() = user_id);

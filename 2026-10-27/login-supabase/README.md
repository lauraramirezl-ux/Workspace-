# Login y CRUD de productos con Supabase — React + Vite

Aplicación del ejercicio del 27 de octubre de 2026. Incluye autenticación con email/contraseña y un CRUD de productos disponible solo para usuarios autenticados. Cada usuario solo puede consultar, crear, editar y eliminar sus propios productos mediante Row Level Security (RLS).

## Requisitos

- Node.js 20.19+ (o 22.12+).
- Proyecto Supabase con el proveedor **Email** habilitado.
- Migración `create_productos_with_rls` aplicada en Supabase.

## Ejecutar en local

```bash
npm install
cp .env.example .env.local
```

Completa `.env.local` con la URL del proyecto y la clave pública (publishable o anon) de **Project Settings → API**:

```env
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu-clave-publica
```

Luego inicia Vite:

```bash
npm run dev -- --host
```

Abre `http://localhost:5173`. El archivo `.env.local` está excluido por Git; nunca pongas la clave `service_role` en el navegador ni la subas al repositorio.

## Configuración de Supabase Auth

1. En **Authentication → Sign In / Providers**, confirma que el proveedor **Email** esté habilitado.
2. En **Authentication → URL Configuration**, define **Site URL** con la URL pública donde se ejecuta la app.
3. Añade esa URL a **Redirect URLs** y agrega `http://localhost:5173` para pruebas locales.
4. Si **Confirm email** está activado, confirma el correo antes de iniciar sesión. Para una práctica, se puede desactivar temporalmente desde el panel.

## Tabla y seguridad

La migración crea `public.productos` con:

- `id`: UUID, clave primaria y `gen_random_uuid()`.
- `user_id`: UUID relacionado con `auth.users`, con `auth.uid()` como valor predeterminado.
- `nombre`: texto obligatorio.
- `descripcion`: texto opcional.
- `precio`: numérico no negativo, predeterminado `0`.
- `created_at`: fecha/hora con `now()`.

También activa RLS y crea políticas separadas para `select`, `insert`, `update` y `delete`. Todas comprueban que `auth.uid() = user_id`; la aplicación además envía explícitamente el usuario autenticado al crear y filtra por su ID al editar o eliminar.

## Prueba del CRUD

1. Regístrate o inicia sesión con un usuario confirmado.
2. Crea un producto con nombre, descripción opcional y precio.
3. Comprueba que aparece en **Tu catálogo**.
4. Usa **Editar** para actualizarlo y **Eliminar** para borrarlo.
5. Repite con un segundo usuario: debe ver un catálogo independiente y no debe poder leer ni modificar productos del primer usuario.
6. En Supabase, revisa **Table Editor → productos** y confirma que cada fila tiene el `user_id` correcto.

El login básico y el CRUD no necesitan una tabla adicional de perfiles.

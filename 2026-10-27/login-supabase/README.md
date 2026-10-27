# Login con Supabase — React + Vite

Aplicación independiente del ejercicio del 27 de octubre de 2026. Incluye inicio de sesión con email/contraseña, registro, estado de sesión persistente y cierre de sesión mediante Supabase Auth.

## Requisitos

- Node.js 20.19+ (o 22.12+).
- Un proyecto Supabase con el proveedor **Email** habilitado.

## Ejecutar en local

```bash
npm install
cp .env.example .env.local
```

Completa `.env.local` con la URL del proyecto y la clave pública (anon) de **Project Settings → API**:

```env
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu-clave-anon-publica
```

Luego inicia Vite:

```bash
npm run dev -- --host
```

Abre `http://localhost:5173`. El archivo `.env.local` está excluido por Git; nunca pongas la clave `service_role` en el navegador ni la subas al repositorio.

## Configuración de Supabase Auth

1. En **Authentication → Sign In / Providers**, confirma que el proveedor **Email** esté habilitado.
2. En **Authentication → URL Configuration**, define **Site URL** con la URL pública donde se ejecuta la app. En Codespaces, copia la URL del puerto `5173` desde **Ports**.
3. Añade esa URL a **Redirect URLs** y agrega `http://localhost:5173` para pruebas locales. Si Codespaces genera una URL nueva, actualiza la configuración.
4. Si **Confirm email** está activado, cada persona debe confirmar el correo antes de iniciar sesión. Para una práctica, se puede desactivar temporalmente desde el panel.
5. Regístrate en la app con un correo propio y una contraseña de al menos 6 caracteres, confirma el mensaje si aplica y prueba entrar y cerrar sesión.

## Datos y base de datos

El login básico usa Supabase Auth y no necesita una tabla propia, política RLS ni migración SQL. Los usuarios se administran en **Authentication → Users**. La tabla opcional `profiles` de la guía no se crea porque el alcance de este ejercicio no guarda datos de perfil.

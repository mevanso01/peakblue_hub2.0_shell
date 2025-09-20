# Dealr Demo App

Next.js App Router demo with:
- Login against CoreAPI (`/login/hub`) → choose location → set location (`/update-location`) → store JWT in HttpOnly cookie
- Protected routes under `/app/**` via `middleware.ts`
- Desking page that calls `/l/otp/get` and embeds `https://devhub.gma.to/desking-embed?otp=...` in an iframe
- Tailwind-based minimal UI approximating shadcn blocks

## Quick start

```bash
pnpm i   # or npm i / yarn
pnpm dev # http://localhost:3000
```

Create `.env.local` or let `postinstall` create one:

```
COREAPI_BASE=https://devhubapi.gma.to/api
DESKING_EMBED_BASE=https://devhub.gma.to/desking-embed
```

## Security & Flow

- CoreAPI calls happen server-side only (Next.js API routes). The CoreAPI JWT is stored in an **HttpOnly, Secure, SameSite=Lax** cookie.
- Middleware guards `/app/**` and redirects to `/login` if missing JWT.
- Navigating to **Desking** auto-requests a fresh OTP; use **Refresh OTP** to generate a new iframe URL anytime.

## API endpoints used

- Login: `POST {COREAPI_BASE}/login/hub` (form-urlencoded)
- Set Location: `POST {COREAPI_BASE}/update-location` (Bearer token; body `lid` & `require_voice_token=true` form-urlencoded)
- Desking OTP: `POST {COREAPI_BASE}/l/otp/get` (Bearer JWT)


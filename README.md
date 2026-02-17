# Authentication with Better Auth

A [Next.js](https://nextjs.org) app with authentication powered by [Better Auth](https://www.better-auth.com/). Sign in with Google, session handling, and sign out are implemented using the App Router and server actions.

## Tech Stack

- **Next.js 16** (App Router)
- **Better Auth** – auth library with Google OAuth and PostgreSQL
- **PostgreSQL** – session and user storage via `pg`
- **Tailwind CSS 4** – styling
- **TypeScript**

## Project Structure

- `lib/auth.ts` – Better Auth server config (Google provider, DB, Next.js cookies)
- `lib/auth-client.ts` – Better Auth client for the browser
- `app/api/auth/[...auth]/route.ts` – Auth API route (handles OAuth callbacks, sign out, etc.)
- `app/actions/auth.ts` – Server actions: `signIn` (redirect to Google), `signOut`
- `app/components/button.tsx` – Sign In / Sign Out button (client component)
- `app/page.tsx` – Home page; shows session and auth buttons

## Getting Started

### 1. Install dependencies

This project uses **pnpm**:

```bash
pnpm install
```

### 2. Environment variables

Create a `.env` file in the project root with:

```env
DATABASE_URL=postgresql://user:password@host:port/database
BETTER_AUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

- **DATABASE_URL** – PostgreSQL connection string (Better Auth stores users and sessions here).
- **BETTER_AUTH_URL** – Base URL of your app (e.g. `http://localhost:3000` in development).
- **GOOGLE_CLIENT_ID** / **GOOGLE_CLIENT_SECRET** – From [Google Cloud Console](https://console.cloud.google.com/) (APIs & Services → Credentials → OAuth 2.0 Client ID). Set the redirect URI to `http://localhost:3000/api/auth/callback/google` for local dev.

### 3. Database

Ensure your PostgreSQL database is running and Better Auth can create its tables (e.g. run migrations if you use the Better Auth CLI, or rely on Better Auth’s default setup).

### 4. Run the dev server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000). You can sign in with Google and sign out from the home page.

## Scripts

| Command     | Description              |
| ----------- | ------------------------ |
| `pnpm dev`  | Start development server |
| `pnpm build`| Build for production     |
| `pnpm start`| Start production server  |
| `pnpm lint` | Run ESLint               |

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Better Auth Documentation](https://www.better-auth.com/docs)

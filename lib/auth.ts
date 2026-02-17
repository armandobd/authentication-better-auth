import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { Pool } from "pg";

export const auth = betterAuth({
    baseURL: process.env.BETTER_AUTH_URL,
    database: new Pool({
        connectionString: process.env.DATABASE_URL,
    }),
    socialProviders: {
        google: {
            prompt: "select_account",
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        },
    },
    plugins: [nextCookies()],
});

export type Session = typeof auth.$Infer.Session;
export type SessionResult = Awaited<ReturnType<typeof auth.api.getSession>>;
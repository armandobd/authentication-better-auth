import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { signOut } from "./actions/auth";
import AuthButton from "./components/button";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between px-16 py-32 bg-white dark:bg-black sm:items-start">
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            Welcome to the Authentication with Better Auth
          </h1>
          {session ? (
            <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
              {session.user.id}
            </p>
          ) : (
            <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
              Sign in with Google or sign up with email.
            </p>
          )}
        </div>
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
          <AuthButton session={session} signOut={signOut} />
        </div>
      </main>
    </div>
  );
}

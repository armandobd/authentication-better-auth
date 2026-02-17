import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";
import { signOut } from "../actions/auth";
import AuthButton from "../components/button";

export default async function UserPage() {
    const session = await auth.api.getSession({
      headers: await headers(),
  });

    if (!session) {
        return (
            <div className="flex min-h-screen flex-col items-center justify-center gap-8 bg-zinc-50 px-6 font-sans dark:bg-black">
                <main className="flex max-w-md flex-col items-center gap-6 text-center">
                    <h1 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50">
                        Sign in required
                    </h1>
                    <p className="text-zinc-600 dark:text-zinc-400">
                        You need to be signed in to view this page.
                    </p>
                    <Link
                        href="/"
                        className="flex h-12 w-full max-w-[200px] items-center justify-center rounded-full border border-black/[.08] bg-black text-white transition-colors hover:bg-zinc-800 dark:border-white/[.145] dark:bg-white dark:text-black dark:hover:bg-zinc-200"
                    >
                        Go to sign in
                    </Link>
                </main>
            </div>
        );
    }

    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 font-sans dark:bg-black">
          <main className="flex w-full max-w-3xl flex-col items-center gap-8 px-6 py-16">
              <div className="flex flex-col items-center gap-4 text-center sm:items-start sm:text-left">
                  <h1 className="text-3xl font-semibold tracking-tight text-black dark:text-zinc-50">
                      Welcome, {session.user.name ?? "there"}
                  </h1>
                  {session.user.email && (
                      <p className="text-zinc-600 dark:text-zinc-400">
                          {session.user.email}
                      </p>
                  )}
              </div>
              <div className="flex flex-col gap-4 sm:flex-row">
                  <Link
                      href="/"
                      className="flex h-12 items-center justify-center rounded-full border border-black/[.08] px-6 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a]"
                  >
                      Back to home
                  </Link>
                  <AuthButton session={session} signOut={signOut} />
              </div>
          </main>
      </div>
  );
}
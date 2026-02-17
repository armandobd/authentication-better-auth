"use client";

import { authClient } from "@/lib/auth-client";
import type { SessionResult } from "@/lib/auth";

type AuthButtonProps = {
  session: SessionResult;
  signOut: () => Promise<void>;
};

export default function AuthButton({ session, signOut }: AuthButtonProps) {
  const hasSession = !!session;

  async function handleSignIn() {
    // Must run in the browser so the state cookie is set in the user's browser.
    // If this ran in a server action, the cookie would never reach the browser → state_mismatch.
    const { data } = await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });
    if (data?.url) {
      window.location.href = data.url;
    }
  }

  async function handleSignOut() {
    await signOut();
  }

  const baseClass =
    "flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]";

  return hasSession ? (
    <button type="button" onClick={handleSignOut} className={baseClass}>
      Sign Out
    </button>
  ) : (
    <button type="button" onClick={handleSignIn} className={baseClass}>
      Sign In
    </button>
  );
}
"use server";

import { auth } from "@/lib/auth";
import { authClient } from "@/lib/auth-client";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function signIn() {
  const { data } = await authClient.signIn.social({
    provider: "google",
    callbackURL: "/",
  });
  const url = data?.url;
  if (!url) {
    redirect("/?error=auth_failed");
  }
  redirect(url);
}

export async function signOut() {
  await auth.api.signOut({
    headers: await headers(),
  });
  redirect("/");
}
"use server";

import { signIn, signOut } from "@/auth";

export async function doSocialLogin(formData) {
  const action = formData.get("action");
  await signIn(action, { redirectTo: "/home" });
}

export async function doCredentialLogin(formData) {
  try {
    const res = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });
    return res;
  } catch (error) {
    throw error;
  }
}

export async function doLogout() {
  await signOut({ redirectTo: "/" });
}

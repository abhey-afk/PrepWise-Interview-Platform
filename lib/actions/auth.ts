"use server";

import { signOut as nextAuthSignOut } from "next-auth/react";

export async function signOut() {
  try {
    await nextAuthSignOut({ 
      redirect: true,
      callbackUrl: "/" 
    });
    return { success: true, message: "Signed out successfully" };
  } catch (error) {
    console.error("❌ Sign out error:", error);
    return { success: false, message: "Failed to sign out" };
  }
}

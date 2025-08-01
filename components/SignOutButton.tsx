"use client";

import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { Button } from "./ui/button";
import { toast } from "sonner";

export default function SignOutButton() {
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut({ 
        redirect: false,
        callbackUrl: "/auth/signin"
      });
      
      toast.success("You have been successfully signed out.");
      
      // Small delay to show the toast before redirecting
      setTimeout(() => {
        router.push("/auth/signin");
        router.refresh();
      }, 1000);
      
    } catch (error) {
      console.error("Error signing out:", error);
      toast.error("Failed to sign out. Please try again.");
    }
  };

  return (
    <Button 
      variant="outline"
      onClick={handleSignOut}
      className="cursor-pointer hover:bg-destructive/10 hover:text-destructive"
    >
      Sign Out
    </Button>
  );
}

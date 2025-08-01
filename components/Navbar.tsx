"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import SignOutButton from "./SignOutButton";

const Navbar = () => {
  const pathname = usePathname();
  const isAuthPage = pathname.startsWith("/auth");

  if (isAuthPage) return null;

  return (
    <nav className="fixed top-0 left-0 right-0 bg-background/80 backdrop-blur-sm border-b z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold">
          PrepWise
        </Link>
        <div className="flex items-center gap-4">
          <Link 
            href="/" 
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              pathname === "/" ? "text-primary" : "text-muted-foreground"
            )}
          >
            Home
          </Link>
          <Link
            href="/interview"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              pathname === "/interview" ? "text-primary" : "text-muted-foreground"
            )}
          >
            Interview
          </Link>
          <SignOutButton />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

"use client";

import { useTeam } from "@/contexts/team-context";
import Link from "next/link";
import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function MainNav({ className, ...props }: HTMLAttributes<HTMLElement>) {
  const { selectedTeam } = useTeam();

  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)} {...props}>
      <Link href={`/dashboard/${selectedTeam?.value}`} className="hover:text-primary text-sm font-medium transition-colors">
        Dashboard
      </Link>
      <Link href={`/dashboard/${selectedTeam?.value}/admin`} className="hover:text-primary text-sm font-medium transition-colors">
        Administration
      </Link>
    </nav>
  );
}

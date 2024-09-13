"use client";

import { useTeam } from "@/contexts/team-context";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function MainNav({ className, ...props }: HTMLAttributes<HTMLElement>) {
  const { selectedTeam } = useTeam();
  const { data } = useSession();
  if (!selectedTeam) {
    return null;
  }

  const isAdmin = data?.user?.id === selectedTeam.creatorId;

  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)} {...props}>
      <Link href={`/dashboard/${selectedTeam.id}`} className="hover:text-primary text-sm font-medium transition-colors">
        Dashboard
      </Link>
      {isAdmin && (
        <Link href={`/dashboard/${selectedTeam.id}/admin`} className="hover:text-primary text-sm font-medium transition-colors">
          Administration
        </Link>
      )}
    </nav>
  );
}

"use client";

import { useTeam } from "@/contexts/team-context";
import { Team } from "@prisma/client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { HTMLAttributes, useMemo } from "react";
import { cn } from "@/lib/utils";

interface MainNavProps extends HTMLAttributes<HTMLElement> {
  teams: Team[];
}

export function MainNav({ className, teams, ...props }: MainNavProps) {
  const { selectedTeamId } = useTeam();
  const { data: session } = useSession();

  const selectedTeam = useMemo(() => teams.find((team) => team.id === selectedTeamId), [teams, selectedTeamId]);

  if (!selectedTeamId || !selectedTeam) {
    return null;
  }

  const isAdmin = session?.user?.id === selectedTeam.creatorId;

  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)} {...props}>
      <Link href={`/dashboard/${selectedTeamId}`} className="hover:text-primary text-sm font-medium transition-colors">
        {`Dashboard`}
      </Link>
      {isAdmin && (
        <Link href={`/dashboard/${selectedTeamId}/admin`} className="hover:text-primary text-sm font-medium transition-colors">
          {`Administration`}
        </Link>
      )}
    </nav>
  );
}

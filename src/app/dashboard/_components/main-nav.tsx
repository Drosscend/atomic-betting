"use client";

import { useTeam } from "@/contexts/team-context";
import { MembershipRole, MembershipStatus } from "@prisma/client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { HTMLAttributes, useMemo } from "react";
import type { TeamWithMemberships } from "@/lib/database/team";
import { cn } from "@/lib/utils";

interface MainNavProps extends HTMLAttributes<HTMLElement> {
  teams: TeamWithMemberships[];
}

export function MainNav({ className, teams, ...props }: MainNavProps) {
  const { selectedTeamId } = useTeam();
  const { data: session } = useSession();

  const selectedTeam = useMemo(() => teams.find((team) => team.id === selectedTeamId), [teams, selectedTeamId]);

  if (!selectedTeamId || !selectedTeam) {
    return null;
  }

  const isAdminOrManager = selectedTeam.memberships.some(
    (membership) =>
      (membership.userId === session?.user?.id && membership.role === MembershipRole.ADMIN) || membership.role === MembershipRole.MANAGER
  );

  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)} {...props}>
      <Link href={`/dashboard/${selectedTeamId}`} className="hover:text-primary text-sm font-medium transition-colors">
        {`Dashboard`}
      </Link>
      {isAdminOrManager && (
        <Link href={`/dashboard/${selectedTeamId}/admin`} className="hover:text-primary text-sm font-medium transition-colors">
          {`Administration`}
        </Link>
      )}
    </nav>
  );
}

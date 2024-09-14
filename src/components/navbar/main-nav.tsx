"use client";

import { useTeam } from "@/contexts/team-context";
import { MembershipRole } from "@prisma/client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { HTMLAttributes, useMemo } from "react";
import { cn } from "@/lib/utils";

interface MainNavProps extends HTMLAttributes<HTMLElement> {}

export function MainNav({ className, ...props }: MainNavProps) {
  const { selectedTeamId } = useTeam();
  const { data: session } = useSession();

  const userTeam = useMemo(() => session?.user?.teams.find((team) => team.teamId === selectedTeamId), [session?.user?.teams, selectedTeamId]);

  const isAdminOrManager = useMemo(() => userTeam?.role === MembershipRole.ADMIN || userTeam?.role === MembershipRole.MANAGER, [userTeam?.role]);

  if (!selectedTeamId || !userTeam) {
    return null;
  }

  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)} {...props}>
      <NavLink href={`/team/${selectedTeamId}`}>Dashboard</NavLink>
      {isAdminOrManager && <NavLink href={`/team/${selectedTeamId}/admin`}>Administration</NavLink>}
    </nav>
  );
}

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Link href={href} className="hover:text-primary text-sm font-medium transition-colors">
    {children}
  </Link>
);

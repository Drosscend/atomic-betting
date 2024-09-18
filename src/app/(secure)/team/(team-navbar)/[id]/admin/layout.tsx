import { SideNav } from "@/app/(secure)/team/(team-navbar)/[id]/admin/side-nav";
import type { ReactNode } from "react";

interface AdminLayoutProps {
  children: ReactNode;
  params: { id: string };
}

const getNavItems = (teamId: string) => [
  { href: `/team/${teamId}/admin`, label: "Paramètres globaux" },
  { href: `/team/${teamId}/admin/users`, label: "Utilisateurs" },
  { href: `/team/${teamId}/admin/bets`, label: "Paris" },
];

export default function AdminLayout({ children, params }: AdminLayoutProps) {
  const teamId = params.id;
  const navItems = getNavItems(teamId);

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col lg:flex-row">
      <SideNav navItems={navItems} />
      <main className="flex-1 p-4 lg:p-8">{children}</main>
    </div>
  );
}

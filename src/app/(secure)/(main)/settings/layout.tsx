import type { ReactNode } from "react";
import { SideNav } from "@/components/side-nav";

interface UserSettingsLayoutProps {
  children: ReactNode;
}

const getNavItems = () => [
  { href: `/settings`, label: "Compte" },
  { href: `/settings/teams`, label: "Équipes" },
];

export default function UserSettingsLayout({ children }: UserSettingsLayoutProps) {
  const navItems = getNavItems();

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col lg:flex-row">
      <SideNav navItems={navItems} />
      <main className="flex-1 p-4 lg:p-8">{children}</main>
    </div>
  );
}

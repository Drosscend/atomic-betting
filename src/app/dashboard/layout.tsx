import { MainNav } from "@/app/dashboard/_components/main-nav";
import { TeamSwitcher } from "@/app/dashboard/_components/team-switcher";
import { UserNav } from "@/app/dashboard/_components/user-nav";
import { Team, TeamProvider } from "@/contexts/team-context";
import type { ReactNode } from "react";

const defaultTeam: Team = { label: "M1 ICE", value: "e920f20c-2dfc-4239-9cb2-5db42682e143" };

export default function Layout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <TeamProvider initialTeam={defaultTeam}>
      <div className="flex flex-col">
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <TeamSwitcher />
            <MainNav className="mx-6" />
            <div className="ml-auto flex items-center space-x-4">
              <UserNav />
            </div>
          </div>
        </div>
        <main>{children}</main>
      </div>
    </TeamProvider>
  );
}

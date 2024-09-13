import { MainNav } from "@/app/dashboard/_components/main-nav";
import { TeamSwitcher } from "@/app/dashboard/_components/team-switcher";
import { UserNav } from "@/app/dashboard/_components/user-nav";
import { TeamProvider } from "@/contexts/team-context";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import { auth } from "@/lib/auth";
import { getTeamsWithMemberships } from "@/lib/database/team";

export default async function Layout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const session = await auth();
  if (!session) redirect("/sign-in");

  const teams = await getTeamsWithMemberships();

  return (
    <TeamProvider initialTeamId={teams[0] ? teams[0].id : null}>
      <div className="flex flex-col">
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <TeamSwitcher />
            <MainNav className="mx-6" teams={teams} />
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

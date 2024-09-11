import { MainNav } from "@/app/dashboard/_components/main-nav";
import { TeamSwitcher } from "@/app/dashboard/_components/team-switcher";
import { UserNav } from "@/app/dashboard/_components/user-nav";
import type { ReactNode } from "react";

export default function Layout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
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
  );
}

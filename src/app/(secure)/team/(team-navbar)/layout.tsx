import { AtomIcon } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { MainNav } from "@/components/navbar/main-nav";
import { TeamSwitcher } from "@/components/navbar/team-switcher";
import { UserNav } from "@/components/navbar/user-nav";

export default async function Layout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <div className="flex flex-col">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <Link className="flex items-center justify-center" href="/">
            <AtomIcon className="mr-2 size-6" />
          </Link>
          <TeamSwitcher />
          <MainNav className="mx-6" />
          <div className="ml-auto flex items-center space-x-4">
            <UserNav />
          </div>
        </div>
      </div>
      <div>{children}</div>
    </div>
  );
}

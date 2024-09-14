import { AtomIcon } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
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
          <nav className={"flex items-center space-x-4 lg:space-x-6"}>
            <Link href={"/"} className="hover:text-primary flex items-center space-x-2 text-sm font-medium transition-colors">
              <AtomIcon className="mr-2 size-6" />
              <span className="font-bold">Atomic Betting</span>
            </Link>
            <Link href={"/dashboard"} className="hover:text-primary text-sm font-medium transition-colors">
              Tableau de bord
            </Link>
          </nav>
          <div className="ml-auto flex items-center space-x-4">
            <UserNav />
          </div>
        </div>
      </div>
      <main>{children}</main>
    </div>
  );
}

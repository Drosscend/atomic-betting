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
        <div className="flex h-16 items-center justify-end px-4">
          <UserNav />
        </div>
      </div>
      <main>{children}</main>
    </div>
  );
}

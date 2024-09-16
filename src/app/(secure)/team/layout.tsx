import { TeamProvider } from "@/contexts/team-context";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import { auth } from "@/lib/auth";

export default async function Layout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const session = await auth();

  if (!session) redirect("/sign-in");

  return (
    <TeamProvider>
      <div>{children}</div>
    </TeamProvider>
  );
}

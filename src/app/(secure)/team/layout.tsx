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
      <div>{children}</div>
    </TeamProvider>
  );
}

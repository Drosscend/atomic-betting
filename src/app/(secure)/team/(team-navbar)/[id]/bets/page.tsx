import { CurrentBets } from "@/app/(secure)/team/(team-navbar)/[id]/_components/current-bets";
import { LastTransaction } from "@/app/(secure)/team/(team-navbar)/[id]/_components/last-transaction";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { auth } from "@/lib/auth";
import { getActiveTeamBets, getUserBetsForTeam } from "@/lib/database/bet";
import { getTeamById } from "@/lib/database/team";

export const metadata: Metadata = {
  title: "Paris de l'équipe",
  description: "Page des paris de l'équipe",
};

export default async function TeamBetsPage({ params }: { params: { id: string } }) {
  const team = await getTeamById(params.id);
  const session = await auth();
  const user = session?.user;
  if (!user) redirect(`/sign-in?callbackUrl=/team/${params.id}/bets`);

  const activeBets = await getActiveTeamBets(team.id);
  const userBets = await getUserBetsForTeam(user.id, team.id);

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <Tabs defaultValue="active" className="space-y-4">
        <TabsList>
          <TabsTrigger value="active">{`Paris en cours`}</TabsTrigger>
          <TabsTrigger value="last-transactions">{`Derniers transactions`}</TabsTrigger>
        </TabsList>
        <TabsContent value="active" className="space-y-4">
          <CurrentBets activeBets={activeBets} userId={user.id} />
        </TabsContent>
        <TabsContent value="last-transactions" className="space-y-4">
          <LastTransaction recentTransactions={userBets} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

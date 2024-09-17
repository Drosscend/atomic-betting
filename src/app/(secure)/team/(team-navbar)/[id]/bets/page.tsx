import { CurrentBets } from "@/app/(secure)/team/(team-navbar)/[id]/_components/current-bets";
import { RecentBet } from "@/app/(secure)/team/(team-navbar)/[id]/_components/recent-bet";
import { format } from "date-fns/format";
import { fr } from "date-fns/locale";
import { CoinsIcon } from "lucide-react";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

  const userMembership = team.memberships.find((m) => m.userId === user.id);
  const userCoins = userMembership?.coins ?? 0;

  const activeBets = await getActiveTeamBets(team.id);
  const userBets = await getUserBetsForTeam(user.id, team.id);

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{`Vos Atomic Coins`}</CardTitle>
          <CoinsIcon className="text-muted-foreground size-4" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{userCoins}</div>
          <p className="text-muted-foreground text-xs">{`Solde au ${format(new Date(), "dd MMMM yyyy", { locale: fr })}`}</p>
        </CardContent>
      </Card>

      <Tabs defaultValue="active" className="space-y-4">
        <TabsList>
          <TabsTrigger value="active">{`Paris en cours`}</TabsTrigger>
          <TabsTrigger value="user">{`Mes paris joués`}</TabsTrigger>
        </TabsList>
        <TabsContent value="active" className="space-y-4">
          <CurrentBets activeBets={activeBets} userId={user.id} />
        </TabsContent>
        <TabsContent value="user" className="space-y-4">
          <RecentBet recentBets={userBets} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

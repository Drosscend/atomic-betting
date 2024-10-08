import { CurrentBets } from "@/app/(secure)/team/(team-navbar)/[id]/_components/current-bets";
import { DailyRewardClaimCard } from "@/app/(secure)/team/(team-navbar)/[id]/_components/daily-reward-claim-card";
import { LastTransaction } from "@/app/(secure)/team/(team-navbar)/[id]/_components/last-transaction";
import { format } from "date-fns/format";
import { fr } from "date-fns/locale";
import { CoinsIcon, LandmarkIcon, LayersIcon, UsersIcon } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { IncrementNumber } from "@/components/increment-number";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { auth } from "@/lib/auth";
import { getActiveTeamBets, getUserBetsForTeam } from "@/lib/database/bet";
import { getTeamById } from "@/lib/database/team";

export const metadata: Metadata = { title: "Dashboard", description: "Dashboard page" };

export default async function Page({ params }: { params: { id: string } }) {
  const team = await getTeamById(params.id);
  const session = await auth();
  const user = session?.user;
  if (!user) redirect("/sign-in");

  const userMembership = team.memberships.find((m) => m.userId === user.id);
  const userCoins = userMembership?.coins ?? 0;
  const totalCoins = team.memberships.reduce((acc, m) => acc + m.coins, 0);
  const totalUsers = team.memberships.length;

  const userBets = await getUserBetsForTeam(user.id, team.id);
  const winningBets = userBets.filter((bet) => bet.coinsAmount > 0).length;
  const totalBets = userBets.length;

  const activeBets = await getActiveTeamBets(team.id);

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between">
        <h2 className="text-3xl font-bold tracking-tight">{`Tableau de bord de l'équipe ${team.name}`}</h2>
      </div>
      <Tabs defaultValue="global" className="space-y-4">
        <TabsList>
          <TabsTrigger value="global">{`Global`}</TabsTrigger>
          <TabsTrigger value="analytics" disabled>
            {`Analyse`}
          </TabsTrigger>
        </TabsList>
        <TabsContent value="global" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{`Vos Atomic Coins`}</CardTitle>
                <CoinsIcon className="text-muted-foreground size-4" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  <IncrementNumber end={userCoins} />
                </div>
                <p className="text-muted-foreground text-xs">{`Solde au ${format(new Date(), "dd MMMM yyyy", { locale: fr })}`}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{`Nombre total de coins`}</CardTitle>
                <LandmarkIcon className="text-muted-foreground size-4" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  <IncrementNumber end={totalCoins} />
                </div>
                <p className="text-muted-foreground text-xs">{`Total des coins en circulation`}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{`Nombre de paris gagnés`}</CardTitle>
                <LayersIcon className="text-muted-foreground size-4" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  <IncrementNumber end={winningBets} duration={1000} />
                </div>
                <p className="text-muted-foreground text-xs">
                  {`${winningBets} paris gagnés sur ${totalBets} joués, ${totalBets > 0 ? ((winningBets / totalBets) * 100).toFixed(2) : 0}% de victoire`}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{`Nombre d'utilisateurs`}</CardTitle>
                <UsersIcon className="text-muted-foreground size-4" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  <IncrementNumber end={totalUsers} duration={1000} />
                </div>
                <p className="text-muted-foreground text-xs">{`Nombre total d'utilisateurs dans l'équipe`}</p>
              </CardContent>
            </Card>
            <DailyRewardClaimCard teamId={team.id} membership={userMembership!} />
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-1 w-full md:col-span-2 lg:col-span-5">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{`Paris en cours`}</CardTitle>
                  <Link href={`/team/${params.id}/bets`} passHref>
                    <Button variant="outline">{`Voir tous les paris en cours`}</Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <CurrentBets activeBets={activeBets} userId={user.id} />
              </CardContent>
            </Card>
            <Card className="col-span-1 md:col-span-2 lg:col-span-2">
              <CardHeader>
                <CardTitle>{`Vos dernières transactions`}</CardTitle>
                <CardDescription>{`Les 5 dernières transactions de votre compte`}</CardDescription>
              </CardHeader>
              <CardContent>
                <LastTransaction recentTransactions={userBets.slice(0, 5)} />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

import { format } from "date-fns/format";
import { fr } from "date-fns/locale";
import { CoinsIcon, LandmarkIcon, LayersIcon, UsersIcon } from "lucide-react";
import type { Metadata } from "next";
import { CurrentBet } from "@/components/dashboard/current-bet";
import { MainNav } from "@/components/dashboard/main-nav";
import { RecentBet } from "@/components/dashboard/recent-bet";
import { Search } from "@/components/dashboard/search";
import TeamSwitcher from "@/components/dashboard/team-switcher";
import { UserNav } from "@/components/dashboard/user-nav";
import { IncrementNumber } from "@/components/increment-number";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const metadata: Metadata = { title: "Dashboard", description: "Dashboard page" };

const ATOMIC_COINS = 50300;
const TOTAL_COINS = 1356680;
const WINNING_BETS = 13;
const TOTAL_BETS = 22;
const TOTAL_USERS = 22;

export default function DashboardPage() {
  return (
    <div className="flex flex-col">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <TeamSwitcher />
          <MainNav className="mx-6" />
          <div className="ml-auto flex items-center space-x-4">
            <Search />
            <UserNav />
          </div>
        </div>
      </div>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        </div>
        <Tabs defaultValue="global" className="space-y-4">
          <TabsList>
            <TabsTrigger value="global">Global</TabsTrigger>
            <TabsTrigger value="analytics" disabled>
              Analyse
            </TabsTrigger>
          </TabsList>
          <TabsContent value="global" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{"Vos Atomic Coins"}</CardTitle>
                  <CoinsIcon className="text-muted-foreground size-4" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    <IncrementNumber end={ATOMIC_COINS} />
                  </div>
                  <p className="text-muted-foreground text-xs">{`Gagné depuis le ${format(new Date(), "dd/MM/yyyy", { locale: fr })}`}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{"Nombre total de coins"}</CardTitle>
                  <LandmarkIcon className="text-muted-foreground size-4" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    <IncrementNumber end={TOTAL_COINS} />
                  </div>
                  <p className="text-muted-foreground text-xs">{"Total des coins en circulation"}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{"Nombre de paris gagnés"}</CardTitle>
                  <LayersIcon className="text-muted-foreground size-4" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    <IncrementNumber end={WINNING_BETS} duration={1000} />
                  </div>
                  <p className="text-muted-foreground text-xs">{`${WINNING_BETS} paris gagnés sur ${TOTAL_BETS} joués`}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{"Nombre d'utilisateurs"}</CardTitle>
                  <UsersIcon className="text-muted-foreground size-4" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    <IncrementNumber end={TOTAL_USERS} duration={1000} />
                  </div>
                  <p className="text-muted-foreground text-xs">{"Nombre total d'utilisateurs dans l'équipe"}</p>
                </CardContent>
              </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>{"Paris en cours"}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CurrentBet />
                </CardContent>
              </Card>
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>{"Derniers paris joués"}</CardTitle>
                  <CardDescription>{"Vos derniers paris joués"}</CardDescription>
                </CardHeader>
                <CardContent>
                  <RecentBet />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

"use client";

import { differenceInSeconds, format } from "date-fns";
import { fr } from "date-fns/locale";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { BetWithTransactions } from "@/lib/database/bet";

interface BetsListProps {
  bets: BetWithTransactions[];
  teamId: string;
}

export function BetsList({ bets, teamId }: BetsListProps) {
  const now = new Date();

  const activeBets = bets.filter((bet) => bet.startDateTime <= now && bet.endDateTime > now);
  const pendingBets = bets.filter((bet) => bet.startDateTime > now);
  const completedBets = bets.filter((bet) => bet.endDateTime <= now);

  const renderBetCard = (bet: BetWithTransactions, isActive: boolean = false) => {
    const totalDuration = differenceInSeconds(bet.endDateTime, bet.startDateTime);
    const elapsed = differenceInSeconds(now, bet.startDateTime);
    const progress = Math.min(100, (elapsed / totalDuration) * 100);

    return (
      <Card key={bet.id} className="mb-4">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>{bet.questionBet?.question || bet.description}</span>
            {isActive && !bet.questionBet?.correctOptionId && <Badge variant="destructive">Aucune réponse</Badge>}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>{`Début: ${format(bet.startDateTime, "dd MMMM yyyy à HH:mm", { locale: fr })}`}</p>
          <p>{`Fin: ${format(bet.endDateTime, "dd MMMM yyyy à HH:mm", { locale: fr })}`}</p>
          {isActive && (
            <div className="mt-2">
              <Progress value={progress} className="w-full" />
            </div>
          )}
        </CardContent>
        <CardFooter>
          {bet.startDateTime > now && (
            <Link href={`/team/${teamId}/admin/bets/${bet.id}/edit`} passHref>
              <Button variant="outline">Modifier</Button>
            </Link>
          )}
        </CardFooter>
      </Card>
    );
  };

  return (
    <Tabs defaultValue="active" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="active">En cours</TabsTrigger>
        <TabsTrigger value="pending">En attente</TabsTrigger>
        <TabsTrigger value="completed">Terminés</TabsTrigger>
      </TabsList>
      <TabsContent value="active">{activeBets.map((bet) => renderBetCard(bet, true))}</TabsContent>
      <TabsContent value="pending">{pendingBets.map((bet) => renderBetCard(bet))}</TabsContent>
      <TabsContent value="completed">{completedBets.map((bet) => renderBetCard(bet))}</TabsContent>
    </Tabs>
  );
}

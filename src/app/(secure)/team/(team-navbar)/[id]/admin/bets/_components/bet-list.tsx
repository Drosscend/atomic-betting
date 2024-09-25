"use client";

import { differenceInSeconds, format, isAfter, isBefore, isEqual } from "date-fns";
import { fr } from "date-fns/locale";
import { CheckCircleIcon } from "lucide-react";
import Link from "next/link";
import { IncrementNumber } from "@/components/increment-number";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { BetWithTransactions } from "@/lib/database/bet";
import { formatTimeLeft } from "@/lib/utils.date";

interface BetsListProps {
  bets: BetWithTransactions[];
  teamId: string;
}

export function BetsList({ bets, teamId }: BetsListProps) {
  const now = new Date();

  const activeBets = bets.filter((bet) => isEqual(bet.startDateTime, now) || (isBefore(bet.startDateTime, now) && isAfter(bet.endDateTime, now)));
  const pendingBets = bets.filter((bet) => isAfter(bet.startDateTime, now) || isEqual(bet.startDateTime, now));
  const completedBets = bets.filter((bet) => isBefore(bet.endDateTime, now) && !isEqual(bet.endDateTime, now));

  const renderBetCard = (bet: BetWithTransactions, isActive: boolean = false) => {
    const totalBetAmount = Math.abs(bet.transactions.reduce((sum, t) => sum + t.coinsAmount, 0));

    const now = new Date();
    const totalDuration = differenceInSeconds(bet.endDateTime, bet.startDateTime);
    const elapsed = differenceInSeconds(now, bet.startDateTime);
    const progress = Math.min(100, (elapsed / totalDuration) * 100);
    const correctOption = bet.questionBet?.options.find((option) => option.id === bet.questionBet?.correctOptionId);

    return (
      <Card key={bet.id} className="mb-4">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>{bet.questionBet?.question || bet.description}</span>
            {isActive && bet.type === "QUESTION" && !bet.questionBet?.correctOptionId && <Badge variant="destructive">{`Aucune réponse`}</Badge>}
            {bet.type === "QUESTION" && bet.questionBet?.correctOptionId && (
              <Badge variant="default" className="flex items-center">
                <CheckCircleIcon className="mr-1 size-4" />
                {`Réponse sélectionnée`}
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium">{`Date de début`}</p>
              <p className="text-muted-foreground text-sm">{format(bet.startDateTime, "dd MMMM yyyy à H:mm", { locale: fr })}</p>
            </div>
            <div>
              <p className="text-sm font-medium">{`Date de fin`}</p>
              <p className="text-muted-foreground text-sm">{format(bet.endDateTime, "dd MMMM yyyy à H:mm", { locale: fr })}</p>
            </div>
            <div>
              <p className="text-sm font-medium">{`Temps restant`}</p>
              <p className="text-muted-foreground text-sm">{formatTimeLeft(bet.endDateTime)}</p>
            </div>
            <div>
              <p className="text-sm font-medium">{`Montant total des paris`}</p>
              <p className="text-muted-foreground text-sm">
                {`Montant: `}
                <IncrementNumber end={totalBetAmount} duration={1000} />
                {` A.c.`}
              </p>
            </div>
          </div>
          {isActive && (
            <div className="mt-2">
              <Progress value={progress} className="w-full" />
            </div>
          )}
          {bet.type === "QUESTION" && bet.questionBet?.correctOptionId && (
            <p className="mt-2 font-semibold text-green-600">{`Réponse correcte : ${correctOption?.content}`}</p>
          )}
        </CardContent>
        <CardFooter>
          {bet.startDateTime > now && (
            <Link href={`/team/${teamId}/admin/bets/${bet.id}/edit`} passHref>
              <Button variant="outline">{`Modifier`}</Button>
            </Link>
          )}
          {isActive && bet.type === "QUESTION" && !bet.questionBet?.correctOptionId && (
            <Link href={`/team/${teamId}/admin/bets/${bet.id}/select-answer`} passHref>
              <Button variant="outline" className="ml-2">
                {`Sélectionner la réponse`}
              </Button>
            </Link>
          )}
        </CardFooter>
      </Card>
    );
  };

  return (
    <Tabs defaultValue="active" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="active">{`En cours`}</TabsTrigger>
        <TabsTrigger value="pending">{`En attente`}</TabsTrigger>
        <TabsTrigger value="completed">{`Terminés`}</TabsTrigger>
      </TabsList>
      <TabsContent value="active">{activeBets.map((bet) => renderBetCard(bet))}</TabsContent>
      <TabsContent value="pending">{pendingBets.map((bet) => renderBetCard(bet))}</TabsContent>
      <TabsContent value="completed">{completedBets.map((bet) => renderBetCard(bet, true))}</TabsContent>
    </Tabs>
  );
}

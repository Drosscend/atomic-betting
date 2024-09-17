import { differenceInSeconds, format } from "date-fns";
import { fr } from "date-fns/locale";
import Link from "next/link";
import { IncrementNumber } from "@/components/increment-number";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { BetWithTransactions } from "@/lib/database/bet";
import { formatTimeLeft } from "@/lib/utils.date";

interface CurrentBetProps {
  activeBets: BetWithTransactions[];
  userId: string;
}

export function CurrentBets({ activeBets, userId }: CurrentBetProps) {
  const now = new Date();

  if (activeBets && activeBets.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-muted-foreground text-center">{`Aucun pari actif pour le moment.`}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {activeBets.map((bet) => {
        const userTransactions = bet.transactions.filter((t) => t.teamMembership.userId === userId);
        const totalBetAmount = bet.transactions.reduce((sum, t) => sum + t.coinsAmount, 0);
        const userTotalBetAmount = userTransactions.reduce((sum, t) => sum + t.coinsAmount, 0);

        const totalDuration = differenceInSeconds(bet.endDateTime, bet.startDateTime);
        const elapsed = differenceInSeconds(now, bet.startDateTime);
        const progress = Math.min(100, (elapsed / totalDuration) * 100);

        return (
          <Card key={bet.id}>
            <CardHeader>
              <CardTitle>{bet.questionBet?.question || bet.description}</CardTitle>
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
              <div className="mt-2">
                <Progress value={progress} className="w-full" />
              </div>
              {userTransactions.length > 0 ? (
                <div className="mt-4">
                  <Badge variant="secondary" className="mb-2">
                    {`Votre pari`}
                  </Badge>
                  <p className="text-sm">
                    {`Montant total parié: `}
                    <IncrementNumber end={userTotalBetAmount} duration={1000} />
                    {` A.c.`}
                  </p>
                  <p className="text-sm">
                    {`Votre réponse: `}
                    {bet.questionBet?.options.find((o) => o.id === userTransactions[0].betOptionId)?.content || "N/A"}
                  </p>
                </div>
              ) : (
                <div className="mt-4">
                  <Badge variant="outline" className="mb-2">
                    {`Pas encore parié`}
                  </Badge>
                  <p className="text-muted-foreground text-sm">{`Vous n'avez pas encore parié sur cet événement.`}</p>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Link href={`/team/${bet.teamId}/bets/${bet.id}`} passHref className="w-full">
                <Button className="w-full">{userTransactions.length > 0 ? "Voir les détails du pari" : "Placer un pari"}</Button>
              </Link>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}

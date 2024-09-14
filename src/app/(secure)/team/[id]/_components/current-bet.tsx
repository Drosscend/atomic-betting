"use client";

import { useTeam } from "@/contexts/team-context";
import { format, formatDistance } from "date-fns";
import { fr } from "date-fns/locale";
import Link from "next/link";
import { IncrementNumber } from "@/components/increment-number";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

// Types
type Bet = {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  userBetAmount: number | null;
  totalBetAmount: number;
  userAnswer: string | null;
};

// Test data
const bets: Bet[] = [
  {
    id: "1",
    title: "Qui va gagner la Coupe du Monde 2026?",
    startDate: "2026-06-01T00:00:00Z",
    endDate: "2026-07-15T00:00:00Z",
    userBetAmount: 100,
    totalBetAmount: 10000,
    userAnswer: "France",
  },
  {
    id: "2",
    title: "Va-t-il pleuvoir demain à Paris?",
    startDate: "2023-07-01T00:00:00Z",
    endDate: "2023-07-02T00:00:00Z",
    userBetAmount: null,
    totalBetAmount: 5000,
    userAnswer: null,
  },
];

export function CurrentBet() {
  const { selectedTeamId } = useTeam();
  const formatTimeLeft = (endDate: string) => {
    const now = new Date();
    const end = new Date(endDate);

    if (now > end) return "Expiré";

    return formatDistance(end, now, {
      locale: fr,
      addSuffix: true,
    });
  };

  if (bets.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-muted-foreground text-center">Aucun pari actif pour le moment.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {bets.map((bet) => (
        <Card key={bet.id}>
          <CardHeader>
            <CardTitle>{bet.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium">Date de début</p>
                <p className="text-muted-foreground text-sm">{format(new Date(bet.startDate), "dd MMMM yyyy à H:mm", { locale: fr })}</p>{" "}
              </div>
              <div>
                <p className="text-sm font-medium">Date de fin</p>
                <p className="text-muted-foreground text-sm">{format(new Date(bet.endDate), "dd MMMM yyyy à H:mm", { locale: fr })}</p>{" "}
              </div>
              <div>
                <p className="text-sm font-medium">Temps restant</p>
                <p className="text-muted-foreground text-sm">{formatTimeLeft(bet.endDate)}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Montant total des paris</p>
                <p className="text-muted-foreground text-sm">
                  Montant: <IncrementNumber end={bet.totalBetAmount} duration={1000} /> A.c.
                </p>
              </div>
            </div>
            {bet.userBetAmount !== null ? (
              <div className="mt-4">
                <Badge variant="secondary" className="mb-2">
                  Votre pari
                </Badge>
                <p className="text-sm">
                  Montant: <IncrementNumber end={bet.userBetAmount} duration={1000} /> A.c.
                </p>
                <p className="text-sm">Votre réponse: {bet.userAnswer}</p>
              </div>
            ) : (
              <div className="mt-4">
                <Badge variant="outline" className="mb-2">
                  Pas encore parié
                </Badge>
                <p className="text-muted-foreground text-sm">{"Vous n'avez pas encore parié sur cet événement."}</p>
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Link href={`/dashboard/${selectedTeamId}/bets/${bet.id}`} passHref className="w-full">
              <Button className="w-full">{bet.userBetAmount !== null ? "Voir les détails du pari" : "Placer un pari"}</Button>
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

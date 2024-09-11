"use client";

import { useEffect, useState } from "react";
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
  const calculateTimeLeft = (endDate: string) => {
    const difference = +new Date(endDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
      };
    }

    return timeLeft;
  };

  const formatTimeLeft = (timeLeft: any) => {
    if (Object.keys(timeLeft).length === 0) return "Expiré";
    return `${timeLeft.days}j ${timeLeft.hours}h ${timeLeft.minutes}m`;
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
                <p className="text-muted-foreground text-sm">{new Date(bet.startDate).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Date de fin</p>
                <p className="text-muted-foreground text-sm">{new Date(bet.endDate).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Temps restant</p>
                <p className="text-muted-foreground text-sm">{formatTimeLeft(calculateTimeLeft(bet.endDate))}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Montant total des paris</p>
                <p className="text-muted-foreground text-sm">
                  {" "}
                  Montant: <IncrementNumber end={bet.totalBetAmount} duration={1000} /> €
                </p>
              </div>
            </div>
            {bet.userBetAmount !== null ? (
              <div className="mt-4">
                <Badge variant="secondary" className="mb-2">
                  Votre pari
                </Badge>
                <p className="text-sm">
                  Montant: <IncrementNumber end={bet.userBetAmount} duration={1000} /> €
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
            <Button className="w-full">{bet.userBetAmount !== null ? "Voir les détails du pari" : "Placer un pari"}</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

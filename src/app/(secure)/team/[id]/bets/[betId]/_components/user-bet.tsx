"use client";

import type { Bet, UserInfo } from "@/app/(secure)/team/[id]/bets/[betId]/page";
import { useState } from "react";
import { IncrementNumber } from "@/components/increment-number";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export function UserBet({ bet, userInfo }: { bet: Bet; userInfo: UserInfo }) {
  const [betAmount, setBetAmount] = useState(bet.userBetAmount || "");

  const handleBet = () => {
    // Logique pour placer le pari
    console.log("Pari placé:", betAmount);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Votre pari</CardTitle>
      </CardHeader>
      <CardContent>
        {bet.userBetAmount !== null ? (
          <>
            <Badge variant="secondary" className="mb-2">
              Pari placé
            </Badge>
            <p className="text-sm">
              Montant: <IncrementNumber end={bet.userBetAmount} duration={1000} /> A.c.
            </p>
            <p className="text-sm">Votre réponse: {bet.userAnswer}</p>
          </>
        ) : (
          <>
            <p className="mb-2">Vos coins: {userInfo.coins} A.c.</p>
            <Input type="number" placeholder="Montant du pari" value={betAmount} onChange={(e) => setBetAmount(e.target.value)} className="mb-2" />
            <Button onClick={handleBet} className="w-full">
              Placer le pari
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
}

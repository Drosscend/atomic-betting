"use client";

import type { Bet } from "@/app/dashboard/[id]/bets/[betId]/page";
import { useState } from "react";
import { IncrementNumber } from "@/components/increment-number";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export function BetOptions({ options, userAnswerId }: { options: Bet["options"]; userAnswerId: string | null }) {
  const [selectedOption, setSelectedOption] = useState<string | null>(userAnswerId);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Options de paris</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Option</TableHead>
              <TableHead>Cote</TableHead>
              <TableHead>Total parié</TableHead>
              <TableHead className="text-right">Votre choix</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {options.map((option) => (
              <TableRow key={option.id} className={selectedOption === option.id ? "bg-muted/50" : ""} onClick={() => setSelectedOption(option.id)}>
                <TableCell className="font-medium">{option.text}</TableCell>
                <TableCell>{option.odds}</TableCell>
                <TableCell>
                  <IncrementNumber end={option.totalBet} duration={1000} /> A.c.
                </TableCell>
                <TableCell className="text-right">
                  {selectedOption === option.id ? (
                    <Badge variant="default">Votre choix</Badge>
                  ) : userAnswerId === option.id ? (
                    <Badge variant="secondary">Choix actuel</Badge>
                  ) : null}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

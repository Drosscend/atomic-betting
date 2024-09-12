"use client";

import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { CheckCircle2Icon, XCircleIcon } from "lucide-react";
import { useState } from "react";
import { IncrementNumber } from "@/components/increment-number";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type CompletedBet = {
  id: string;
  title: string;
  endDate: string;
  userBetAmount: number;
  amount: number;
  userAnswerId: number;
  answers: {
    id: number;
    label: string;
    quote: number;
    totalAmount: number;
  }[];
  isWinner: boolean;
};

const completedBets: CompletedBet[] = [
  {
    id: "3",
    title: "Qui va gagner l'Euro 2024?",
    endDate: "2024-07-14T22:00:00Z",
    userBetAmount: 200,
    amount: 400,
    userAnswerId: 1,
    answers: [
      { id: 1, label: "France", quote: 2.0, totalAmount: 1000 },
      { id: 2, label: "Allemagne", quote: 3.5, totalAmount: 500 },
      { id: 3, label: "Espagne", quote: 4.0, totalAmount: 250 },
      { id: 4, label: "Italie", quote: 5.0, totalAmount: 100 },
    ],
    isWinner: true,
  },
  {
    id: "4",
    title: "Quel sera le temps à Paris le 1er janvier 2024?",
    endDate: "2024-01-01T23:59:59Z",
    userBetAmount: 50,
    amount: 50,
    userAnswerId: 2,
    answers: [
      { id: 1, label: "Ensoleillé", quote: 1.5, totalAmount: 100 },
      { id: 2, label: "Pluvieux", quote: 2.0, totalAmount: 50 },
      { id: 3, label: "Neigeux", quote: 3.0, totalAmount: 25 },
    ],
    isWinner: false,
  },
];

export function CompletedBets() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(completedBets.length / itemsPerPage);

  const paginatedBets = completedBets.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="space-y-6">
      <h2 className="mb-4 text-2xl font-semibold">Paris terminés</h2>
      {paginatedBets.map((bet) => (
        <Card key={bet.id}>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              {bet.title}
              {bet.isWinner ? (
                <Badge variant="secondary" className="flex items-center">
                  <CheckCircle2Icon className="mr-1 size-4" />
                  Gagné
                </Badge>
              ) : (
                <Badge variant="destructive" className="flex items-center">
                  <XCircleIcon className="mr-1 size-4" />
                  Perdu
                </Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between space-x-4">
              <div>
                <p className="text-sm font-medium">Terminé le</p>
                <p className="text-muted-foreground text-sm">{format(new Date(bet.endDate), "dd MMMM yyyy à H:mm", { locale: fr })}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Montant de base parié</p>
                <p className="text-muted-foreground text-sm">
                  <IncrementNumber end={bet.userBetAmount} duration={1000} /> A.c.
                </p>
              </div>
              <div>
                <p className="text-sm font-medium">{bet.isWinner ? "Montant gagné" : "Montant perdu"}</p>
                <p className="text-muted-foreground text-sm">
                  <IncrementNumber end={bet.amount} duration={1000} /> A.c.
                </p>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm font-medium">Réponses</p>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Réponse</TableHead>
                    <TableHead>Cote</TableHead>
                    <TableHead>Total misé</TableHead>
                    <TableHead className="text-right">Votre choix</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bet.answers.map((answer) => (
                    <TableRow key={answer.id}>
                      <TableCell className="font-medium">{answer.label}</TableCell>
                      <TableCell>{answer.quote}</TableCell>
                      <TableCell>{answer.totalAmount} A.c.</TableCell>
                      <TableCell className="text-right">
                        {bet.userAnswerId === answer.id ? <Badge variant="default">Votre choix</Badge> : null}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      ))}
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" onClick={() => handlePageChange(Math.max(1, currentPage - 1))} />
          </PaginationItem>
          {[...Array(totalPages)].map((_, index) => (
            <PaginationItem key={index}>
              <PaginationLink href="#" isActive={currentPage === index + 1} onClick={() => handlePageChange(index + 1)}>
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          {totalPages > 5 && currentPage < totalPages - 2 && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}
          <PaginationItem>
            <PaginationNext href="#" onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}

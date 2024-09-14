"use client";

import { BetCard } from "@/app/(secure)/team/[id]/admin/bets/_components/bet-card";
import { betSchema } from "@/app/(secure)/team/[id]/admin/bets/bet.schema";
import { z } from "zod";
import { useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export function BetsList() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // TODO: Replace with actual data fetching logic
  const bets: z.infer<typeof betSchema>[] = [
    {
      id: "1",
      question: "Who will win the World Cup?",
      startDate: new Date(),
      endDate: new Date(),
      minPoints: 10,
      maxPoints: 1000,
      responses: [
        { id: "1", response: "Brazil" },
        { id: "2", response: "Germany" },
      ],
    },
    {
      id: "2",
      question: "Who will win the World Cup?",
      startDate: new Date(),
      endDate: new Date(),
      minPoints: 10,
      maxPoints: 1000,
      responses: [
        { id: "1", response: "Brazil" },
        { id: "2", response: "Germany" },
      ],
    },
    {
      id: "3",
      question: "Who will win the World Cup?",
      startDate: new Date(),
      endDate: new Date(),
      minPoints: 10,
      maxPoints: 1000,
      responses: [
        { id: "1", response: "Brazil" },
        { id: "2", response: "Germany" },
      ],
    },
  ];

  const totalPages = Math.ceil(bets.length / itemsPerPage);

  const renderPaginationItems = () => {
    const items = [];
    const maxVisiblePages = 5;

    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1) || totalPages <= maxVisiblePages) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink
              href="#"
              isActive={i === currentPage}
              onClick={(e) => {
                e.preventDefault();
                setCurrentPage(i);
              }}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      } else if ((i === currentPage - 2 && currentPage > 3) || (i === currentPage + 2 && currentPage < totalPages - 2)) {
        items.push(
          <PaginationItem key={i}>
            <PaginationEllipsis />
          </PaginationItem>
        );
      }
    }

    return items;
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {bets.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((bet) => (
          <BetCard key={bet.id} bet={bet} />
        ))}
      </div>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (currentPage > 1) setCurrentPage(currentPage - 1);
              }}
            />
          </PaginationItem>
          {renderPaginationItems()}
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (currentPage < totalPages) setCurrentPage(currentPage + 1);
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}

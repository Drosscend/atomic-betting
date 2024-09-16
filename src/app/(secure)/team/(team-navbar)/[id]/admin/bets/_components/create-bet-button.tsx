"use client";

import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function CreateBetButton({ teamId }: { teamId: string }) {
  return (
    <Link href={`/team/${teamId}/admin/bets/create`} passHref>
      <Button>
        <PlusIcon className="mr-2 size-4" />
        Créer un pari
      </Button>
    </Link>
  );
}

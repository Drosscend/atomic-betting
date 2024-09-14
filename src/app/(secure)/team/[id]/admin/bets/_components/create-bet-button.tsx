"use client";

import { BetForm } from "@/app/(secure)/team/[id]/admin/bets/_components/bet-form";
import { createBet } from "@/app/(secure)/team/[id]/admin/bets/bet.action";
import { betSchema } from "@/app/(secure)/team/[id]/admin/bets/bet.schema";
import { PlusIcon } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { useAction } from "next-safe-action/hooks";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function CreateBetButton() {
  const [isOpen, setIsOpen] = useState(false);

  const { execute, status, result } = useAction(createBet);

  function handleSubmission(data: z.infer<typeof betSchema>) {
    execute(data);

    console.log(result);

    if (result.data?.success) {
      toast.success(result.data.message);
    }

    if (result.serverError) {
      toast.error(result.serverError);
    }

    if (result.validationErrors) {
      const { _errors, ...fieldErrors } = result.validationErrors;
      if (_errors) {
        toast.error(_errors.join(", "));
      } else {
        const messages = Object.values(fieldErrors).flatMap((error) => error._errors);
        toast.error(messages.join(", "));
      }
    }
  }

  return (
    <>
      <Button onClick={() => setIsOpen(true)} disabled={status === "executing"}>
        <PlusIcon className="mr-2 size-4" />
        Créer un pari
      </Button>
      <BetForm open={isOpen} onOpenChange={setIsOpen} onSubmit={handleSubmission} />
    </>
  );
}

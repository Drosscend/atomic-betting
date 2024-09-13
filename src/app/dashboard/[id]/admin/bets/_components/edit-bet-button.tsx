"use client";

import { BetForm } from "@/app/dashboard/[id]/admin/bets/_components/bet-form";
import { updateBet } from "@/app/dashboard/[id]/admin/bets/bet.action";
import { betSchema } from "@/app/dashboard/[id]/admin/bets/bet.schema";
import { EditIcon } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { useAction } from "next-safe-action/hooks";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface EditBetButtonProps {
  bet: z.infer<typeof betSchema>;
}
export function EditBetButton({ bet }: EditBetButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  const { execute, status, result } = useAction(updateBet);

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
        <EditIcon className="mr-2 size-4" />
        Modifier
      </Button>
      <BetForm open={isOpen} onOpenChange={setIsOpen} onSubmit={handleSubmission} defaultData={bet} />
    </>
  );
}

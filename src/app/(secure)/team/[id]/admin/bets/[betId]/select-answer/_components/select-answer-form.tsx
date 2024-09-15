"use client";

import { selectAnswer } from "@/app/(secure)/team/[id]/admin/bets/[betId]/select-answer/select-answer.action";
import { SelectAnswerInput } from "@/validations/bet.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useAction } from "next-safe-action/hooks";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { BetWithTransactions } from "@/lib/database/bet";

interface SelectAnswerFormProps {
  bet: BetWithTransactions;
  teamId: string;
}

export function SelectAnswerForm({ bet, teamId }: SelectAnswerFormProps) {
  const router = useRouter();

  const form = useForm<SelectAnswerInput>({
    resolver: zodResolver(SelectAnswerInput),
    defaultValues: {
      betId: bet.id,
      optionId: "",
    },
  });

  const { execute, isExecuting } = useAction(selectAnswer, {
    onSuccess: (result) => {
      if (result.data && result.data.success) {
        toast(result.data.message);
        router.push(`/team/${teamId}/admin/bets`);
      } else {
        toast(`Une erreur est survenue : ${result.data?.message || "Erreur inconnue"}`);
      }
    },
    onError: ({ error }) => {
      toast(`Une erreur est survenue : ${error.serverError || "Erreur inconnue"}`);
    },
  });

  const onSubmit = (data: SelectAnswerInput) => {
    execute(data);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{bet.questionBet?.question}</CardTitle>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent>
            <FormField
              control={form.control}
              name="optionId"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>{`Sélectionnez la réponse correcte`}</FormLabel>
                  <FormControl>
                    <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col space-y-1">
                      {bet.questionBet?.options.map((option) => (
                        <FormItem className="flex items-center space-x-3 space-y-0" key={option.id}>
                          <FormControl>
                            <RadioGroupItem value={option.id} />
                          </FormControl>
                          <FormLabel className="font-normal">{option.content}</FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isExecuting}>
              {isExecuting ? `Validation en cours...` : `Valider la réponse`}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}

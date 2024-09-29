"use client";

import { placeBet } from "@/app/(secure)/team/(team-navbar)/[id]/bets/[betId]/bet.actions";
import { PlaceBetInput, placeBetSchema } from "@/validations/bet.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRightIcon, ClockIcon, CoinsIcon, UsersIcon } from "lucide-react";
import { toast } from "sonner";
import { useAction } from "next-safe-action/hooks";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { IncrementNumber } from "@/components/increment-number";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { BetWithTransactions } from "@/lib/database/bet";
import { TransactionWithOption, calculateOdds } from "@/lib/odds.utils";
import { cn } from "@/lib/utils";
import { formatTimeLeft } from "@/lib/utils.date";

interface BetFormProps {
  bet: BetWithTransactions;
  userSelectedOption: string | null;
  userTransactions: BetWithTransactions["transactions"];
  userCoins: number;
}

export function BetForm({ bet, userSelectedOption, userTransactions, userCoins }: BetFormProps) {
  const router = useRouter();

  const totalUserBet = userTransactions.reduce((sum, t) => sum + Math.abs(t.coinsAmount), 0);
  const maxAllowedBet = Math.min(bet.maxCoins - totalUserBet, userCoins);

  const form = useForm<PlaceBetInput>({
    resolver: zodResolver(placeBetSchema),
    defaultValues: {
      betId: bet.id,
      optionId: userSelectedOption || "",
      coinsAmount: 0,
    },
  });

  const { execute, status } = useAction(placeBet, {
    onSuccess: (result) => {
      if (result.data && result.data.success) {
        router.refresh();
        toast.success(`${result.data.message}`);
      } else if (result.data) {
        toast.error(`${result.data.message}`);
      }
    },
    onError: ({ error }) => {
      toast.error(`Une erreur est survenue : ${error.serverError || "Erreur inconnue"}`);
    },
  });

  const onSubmit = (data: PlaceBetInput) => {
    execute(data);
  };

  const allOptions = bet.questionBet?.options.map((option) => option.id) || [];
  const transactions: TransactionWithOption[] = bet.transactions
    .filter((t) => t.transactionType === "BET")
    .map((t) => ({
      betOptionId: t.betOptionId!,
      coinsAmount: t.coinsAmount,
    }));
  const odds = calculateOdds(transactions, allOptions);

  const totalCoins = bet.transactions.reduce((sum, t) => sum + Math.abs(t.coinsAmount), 0);
  const optionStats = bet.questionBet?.options.reduce(
    (acc, option) => {
      const optionTransactions = bet.transactions.filter((t) => t.betOptionId === option.id);
      const totalCoinsForOption = optionTransactions.reduce((sum, t) => sum + Math.abs(t.coinsAmount), 0);
      const uniqueUsers = new Set(optionTransactions.map((t) => t.teamMembershipId)).size;
      const maxBet = Math.max(...optionTransactions.map((t) => Math.abs(t.coinsAmount)), 0);
      const percentage = (totalCoinsForOption / totalCoins) * 100 || 0;

      acc[option.id] = {
        totalCoins: totalCoinsForOption,
        uniqueUsers,
        maxBet,
        percentage,
      };
      return acc;
    },
    {} as Record<string, { totalCoins: number; uniqueUsers: number; maxBet: number; percentage: number }>
  );

  return (
    <Card className="mx-auto w-full max-w-2xl">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardHeader>
            <CardTitle className="text-center text-2xl font-bold">{`${bet.questionBet?.question || bet.description}`}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <ClockIcon className="text-muted-foreground size-5" />
                  <p className="text-sm font-medium">{`Temps restant`}</p>
                </div>
                <p className="text-primary text-2xl font-bold">{`${formatTimeLeft(bet.endDateTime)}`}</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <CoinsIcon className="text-muted-foreground size-5" />
                  <p className="text-sm font-medium">{`Total des paris`}</p>
                </div>
                <p className="text-primary text-2xl font-bold">
                  <IncrementNumber end={Math.abs(totalCoins)} duration={1000} /> {`A.c.`}
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <CoinsIcon className="text-muted-foreground size-5" />
                  <p className="text-sm font-medium">{`Vos coins`}</p>
                </div>
                <p className="text-primary text-2xl font-bold">{`${userCoins} A.c.`}</p>
              </div>
            </div>

            {userTransactions.length > 0 && (
              <div className="bg-muted rounded-lg p-4">
                <h3 className="mb-2 text-lg font-semibold">{`Vos paris`}</h3>
                <ul className="space-y-2">
                  {userTransactions.map((transaction, index) => (
                    <li key={index} className="text-sm">
                      {`${Math.abs(transaction.coinsAmount)} A.c. sur l'option "${
                        bet.questionBet?.options.find((o) => o.id === transaction.betOptionId)?.content
                      }" à une cote de ${transaction.odds?.toFixed(2)}`}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <FormField
              control={form.control}
              name="optionId"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel className="text-lg font-semibold">{`Choisissez une option`}</FormLabel>
                  <FormControl>
                    <RadioGroup onValueChange={field.onChange} value={field.value} className="grid gap-4">
                      {bet.questionBet?.options.map((option) => {
                        const stats = optionStats?.[option.id];
                        const isSelected = field.value === option.id;
                        return (
                          <FormItem className="space-y-2" key={option.id}>
                            <FormControl>
                              <RadioGroupItem
                                value={option.id}
                                disabled={userSelectedOption !== null && userSelectedOption !== option.id}
                                className="sr-only"
                                id={`option-${option.id}`}
                              />
                            </FormControl>
                            <FormLabel
                              htmlFor={`option-${option.id}`}
                              className={cn(
                                "bg-muted hover:bg-muted/80 flex cursor-pointer flex-col rounded-lg p-4 transition-colors",
                                isSelected && "ring-2 ring-red-500"
                              )}
                            >
                              <div className="mb-2 flex items-center justify-between">
                                <span className="font-medium">{option.content}</span>
                                <span className="text-sm font-semibold">Cote: 1:{odds[option.id]?.toFixed(2) || "N/A"}</span>
                              </div>
                              <div className="text-muted-foreground mb-2 grid grid-cols-3 gap-2 text-sm">
                                <div className="flex items-center">
                                  <CoinsIcon className="mr-1 size-4" />
                                  <span>{stats?.totalCoins || 0} A.c.</span>
                                </div>
                                <div className="flex items-center">
                                  <UsersIcon className="mr-1 size-4" />
                                  <span>{stats?.uniqueUsers || 0} joueurs</span>
                                </div>
                                <div>Max: {stats?.maxBet || 0} A.c.</div>
                              </div>
                              <Progress value={stats?.percentage || 0} className="h-2" />
                              <div className="mt-1 text-right text-xs">{(stats?.percentage || 0).toFixed(1)}%</div>
                            </FormLabel>
                          </FormItem>
                        );
                      })}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="coinsAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold">{`Montant du pari (A.c.)`}</FormLabel>
                  <div className="flex items-center space-x-2">
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : "")}
                        min={bet.minCoins}
                        max={maxAllowedBet}
                        className="text-lg"
                      />
                    </FormControl>
                    <Button type="button" onClick={() => form.setValue("coinsAmount", maxAllowedBet)} className="whitespace-nowrap">
                      All-in
                    </Button>
                  </div>
                  <FormMessage />
                  <p className="text-muted-foreground mt-1 text-sm">{`Min: ${bet.minCoins} A.c. | Max: ${maxAllowedBet} A.c.`}</p>
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={status === "executing"} className="w-full text-lg font-semibold">
              {`${userSelectedOption ? "Parier à nouveau" : "Placer le pari"}`}
              <ArrowRightIcon className="ml-2 size-5" />
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}

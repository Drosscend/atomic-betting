"use client";

import { editBet } from "@/app/(secure)/team/[id]/admin/bets/[betId]/edit-bet.action";
import { EditBetInput, editBetSchema } from "@/validations/bet.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { toast } from "sonner";
import { useAction } from "next-safe-action/hooks";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type { BetWithTransactions } from "@/lib/database/bet";
import type { TeamWithMemberships } from "@/lib/database/team";
import { cn } from "@/lib/utils";

export function EditBetForm({ team, bet }: { team: TeamWithMemberships; bet: BetWithTransactions }) {
  const router = useRouter();

  const form = useForm<EditBetInput>({
    resolver: zodResolver(editBetSchema),
    defaultValues: {
      betId: bet.id,
      type: bet.type,
      startDateTime: new Date(bet.startDateTime),
      endDateTime: new Date(bet.endDateTime),
      minCoins: bet.minCoins,
      maxCoins: bet.maxCoins,
      description: bet.description,
      question: bet.questionBet?.question,
      options: bet.questionBet?.options.map((option) => option.content),
    },
  });

  const { execute, isExecuting } = useAction(editBet, {
    onSuccess: (result) => {
      if (result.data && result.data.success && result.data.betId) {
        toast(result.data.message);
        router.push(`/team/${team.id}/admin/bets`);
      } else {
        toast(`Une erreur est survenue : ${result.data?.message || "Erreur inconnue"}`);
      }
    },
    onError: ({ error }) => {
      toast(`Une erreur est survenue : ${error.serverError || "Erreur inconnue"}`);
    },
  });

  const onSubmit = (data: EditBetInput) => {
    execute(data);
  };

  const addOption = () => {
    const currentOptions = form.getValues("options");
    if (currentOptions.length < 5) {
      form.setValue("options", [...currentOptions, ""]);
    }
  };

  const removeOption = (index: number) => {
    const currentOptions = form.getValues("options");
    if (currentOptions.length > 2) {
      form.setValue(
        "options",
        currentOptions.filter((_, i) => i !== index)
      );
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{`Modifier le pari`}</CardTitle>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{`Type de pari`}</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner un type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="QUESTION">{`Question`}</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="startDateTime"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>{`Date et heure de début`}</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button variant={"outline"} className={cn("w-[240px] pl-3 text-left font-normal", !field.value && "text-muted-foreground")}>
                          {field.value ? format(field.value, "Pp", { locale: fr }) : <span>{`Choisir une date et une heure`}</span>}
                          <CalendarIcon className="ml-auto size-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                      <div className="border-t p-3">
                        <Input
                          type="time"
                          value={format(field.value, "HH:mm")}
                          onChange={(e) => {
                            const [hours, minutes] = e.target.value.split(":");
                            const newDate = new Date(field.value);
                            newDate.setHours(parseInt(hours, 10));
                            newDate.setMinutes(parseInt(minutes, 10));
                            field.onChange(newDate);
                          }}
                        />
                      </div>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="endDateTime"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>{`Date et heure de fin`}</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button variant={"outline"} className={cn("w-[240px] pl-3 text-left font-normal", !field.value && "text-muted-foreground")}>
                          {field.value ? format(field.value, "Pp", { locale: fr }) : <span>{`Choisir une date et une heure`}</span>}
                          <CalendarIcon className="ml-auto size-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                      <div className="border-t p-3">
                        <Input
                          type="time"
                          value={format(field.value, "HH:mm")}
                          onChange={(e) => {
                            const [hours, minutes] = e.target.value.split(":");
                            const newDate = new Date(field.value);
                            newDate.setHours(parseInt(hours, 10));
                            newDate.setMinutes(parseInt(minutes, 10));
                            field.onChange(newDate);
                          }}
                        />
                      </div>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="minCoins"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{`Mise minimum (jetons)`}</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} onChange={(e) => field.onChange(parseInt(e.target.value))} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="maxCoins"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{`Mise maximum (jetons)`}</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} onChange={(e) => field.onChange(parseInt(e.target.value))} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{`Description`}</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Décrivez le pari en détail" className="resize-none" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="question"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{`Question`}</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Posez votre question" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {form.watch("options").map((_, index) => (
              <FormField
                key={index}
                control={form.control}
                name={`options.${index}`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{`Option ${index + 1}`}</FormLabel>
                    <FormControl>
                      <div className="flex items-center space-x-2">
                        <Input {...field} placeholder={`Option ${index + 1}`} />
                        {index > 1 && (
                          <Button type="button" variant="outline" size="icon" onClick={() => removeOption(index)}>
                            -
                          </Button>
                        )}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
            {form.watch("options").length < 5 && (
              <Button type="button" variant="outline" onClick={addOption}>
                {`Ajouter une option`}
              </Button>
            )}
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isExecuting}>
              {isExecuting ? `Modification en cours...` : `Modifier le pari`}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}

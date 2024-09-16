"use client";

import { createBet } from "@/app/(secure)/team/[id]/admin/bets/create/create-bet.action";
import { CreateBetInput, createBetSchema } from "@/validations/bet.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { addHours, addMinutes } from "date-fns";
import { toast } from "sonner";
import { useAction } from "next-safe-action/hooks";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { DateTimePicker } from "@/components/forms/date-time-picker.form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import type { TeamWithMemberships } from "@/lib/database/team";

export function CreateBetForm({ team }: { team: TeamWithMemberships }) {
  const router = useRouter();

  const form = useForm<CreateBetInput>({
    resolver: zodResolver(createBetSchema),
    defaultValues: {
      teamId: team.id,
      type: "QUESTION",
      startDateTime: addMinutes(new Date(), 5),
      endDateTime: addHours(new Date(), team.defaultHoursBet),
      minCoins: 1,
      maxCoins: 100,
      description: "",
      question: "",
      options: ["", ""],
    },
  });

  const { execute, isExecuting } = useAction(createBet, {
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

  const onSubmit = (data: CreateBetInput) => {
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
        <CardTitle>{`Créer un nouveau pari`}</CardTitle>
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
            <div className="flex flex-col space-y-4 lg:flex-row lg:space-x-4 lg:space-y-0">
              <DateTimePicker control={form.control} name="startDateTime" label={`Date et heure de début`} minDate={new Date()} />
              <DateTimePicker control={form.control} name="endDateTime" label={`Date et heure de fin`} minDate={form.watch("startDateTime")} />
            </div>
            <div className="flex flex-col space-y-4 lg:flex-row lg:space-x-4 lg:space-y-0">
              <FormField
                control={form.control}
                name="minCoins"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>{`Mise minimum (Atomic Coins)`}</FormLabel>
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
                  <FormItem className="flex-1">
                    <FormLabel>{`Mise maximum (Atomic Coins)`}</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} onChange={(e) => field.onChange(parseInt(e.target.value))} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
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
            <Separator />
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
              {isExecuting ? `Création en cours...` : `Créer le pari`}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}

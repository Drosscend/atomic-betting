"use client";

import { useTeam } from "@/contexts/team-context";
import { type CreateTeamInput, createTeamSchema } from "@/validations/create-team.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useAction } from "next-safe-action/hooks";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useConfetti } from "@/components/confetti";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createTeam } from "../create-team.action";

export function CreateTeamForm() {
  const { showConfetti } = useConfetti();
  const router = useRouter();
  const { setSelectedTeamId } = useTeam();

  const form = useForm<CreateTeamInput>({
    resolver: zodResolver(createTeamSchema),
    defaultValues: {
      name: "",
      defaultCoins: 300,
      defaultHoursBet: 1,
    },
  });

  const { execute, isExecuting } = useAction(createTeam, {
    onSuccess: (result) => {
      if (result.data && result.data.success && result.data.teamId) {
        toast(result.data.message);
        setSelectedTeamId(result.data.teamId);
        showConfetti(3000);
        router.push(`/team`);
      } else {
        toast(`Une erreur est survenue : ${result.data?.message || "Erreur inconnue"}`);
      }
    },
    onError: ({ error }) => {
      toast(`Une erreur est survenue : ${error.serverError || "Erreur inconnue"}`);
    },
  });

  const onSubmit = (data: CreateTeamInput) => {
    execute(data);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{`Créer une nouvelle équipe`}</CardTitle>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{`Nom de l'équipe`}</FormLabel>
                  <FormControl>
                    <Input placeholder="Nom de l'équipe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="defaultCoins"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{`Pièces par défaut`}</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} onChange={(e) => field.onChange(parseInt(e.target.value))} />
                  </FormControl>
                  <FormDescription>{`Nombre de pièces attribuées par défaut aux nouveaux membres.`}</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="defaultHoursBet"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{`Heures de pari par défaut`}</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} onChange={(e) => field.onChange(parseInt(e.target.value))} />
                  </FormControl>
                  <FormDescription>{`Nombre d'heures de pari par défaut pour les nouveaux paris.`}</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isExecuting}>
              {isExecuting ? `Création en cours...` : `Créer l'équipe`}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}

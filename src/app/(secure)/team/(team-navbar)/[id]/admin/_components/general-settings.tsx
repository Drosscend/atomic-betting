"use client";

import { updateTeamSettings } from "@/app/(secure)/team/(team-navbar)/[id]/admin/actions";
import { UpdateTeamSettingsInput, updateTeamSettingsSchema } from "@/validations/team-settings.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { TeamWithMemberships } from "@/lib/database/team";

export function GeneralSettings({ team }: { team: TeamWithMemberships }) {
  const form = useForm<UpdateTeamSettingsInput>({
    resolver: zodResolver(updateTeamSettingsSchema),
    defaultValues: {
      teamName: team.name,
      defaultCoins: team.defaultCoins,
      defaultDuration: team.defaultHoursBet,
      dailyRewardCoins: team.dailyRewardCoins,
      streakRewardCoins: team.streakRewardCoins,
    },
  });

  const { execute: executeUpdate, status: updateStatus } = useAction(updateTeamSettings, {
    onSuccess: (result) => {
      if (result.data && result.data.success) {
        toast.success(result.data.message);
      } else if (result.data) {
        toast.error(result.data.message);
      }
    },
    onError: ({ error }) => {
      toast.error(`Une erreur est survenue : ${error.serverError || "Erreur inconnue"}`);
    },
  });

  const onSubmit = (data: UpdateTeamSettingsInput) => {
    executeUpdate({ ...data, teamId: team.id });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{`Paramètres généraux`}</CardTitle>
        <CardDescription>{`Gérez les paramètres de base de votre équipe`}</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="teamName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{`Nom de l'équipe`}</FormLabel>
                  <FormControl>
                    <Input {...field} />
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
                  <FormLabel>{`Jetons par défaut`}</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} onChange={(e) => field.onChange(parseInt(e.target.value))} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="defaultDuration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{`Durée par défaut des paris (heures)`}</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} onChange={(e) => field.onChange(parseInt(e.target.value))} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dailyRewardCoins"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{`Jetons pour la récompense quotidienne`}</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} onChange={(e) => field.onChange(parseInt(e.target.value))} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="streakRewardCoins"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{`Jetons pour la récompense de série`}</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} onChange={(e) => field.onChange(parseInt(e.target.value))} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={updateStatus === "executing"}>
              {updateStatus === "executing" ? `Enregistrement...` : `Enregistrer`}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}

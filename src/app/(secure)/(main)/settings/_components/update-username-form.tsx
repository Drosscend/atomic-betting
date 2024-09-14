"use client";

import { updateUsername } from "@/app/(secure)/(main)/settings/actions";
import { UpdateUsernameInput, updateUsernameSchema } from "@/validations/user-settings.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { User } from "next-auth";
import { useSession } from "next-auth/react";
import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface UpdateUsernameFormProps {
  user: User;
}

export function UpdateUsernameForm({ user }: UpdateUsernameFormProps) {
  const { update } = useSession();

  const form = useForm<UpdateUsernameInput>({
    resolver: zodResolver(updateUsernameSchema),
    defaultValues: {
      username: user.name || "",
    },
  });

  const { execute, status } = useAction(updateUsername, {
    onSuccess: async (result) => {
      if (result.data && result.data.success) {
        toast(result.data.message);
        await update({ user: { ...user, name: form.getValues().username } });
      } else if (result.data) {
        toast(result.data.message);
      }
    },
    onError: ({ error }) => {
      toast(`Une erreur est survenue : ${error.serverError || "Erreur inconnue"}`);
    },
  });

  const onSubmit = (data: UpdateUsernameInput) => {
    execute(data);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{`Modifier le nom d'utilisateur`}</CardTitle>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent>
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{`Nouveau nom d'utilisateur`}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={status === "executing"}>{`Mettre à jour`}</Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}

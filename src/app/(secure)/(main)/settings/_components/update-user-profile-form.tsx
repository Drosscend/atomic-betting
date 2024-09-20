"use client";

import { updateUserProfile } from "@/app/(secure)/(main)/settings/actions";
import { UpdateUserProfileInput, updateUserProfileSchema } from "@/validations/user-settings.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { UserFull } from "@/lib/database/user";

interface UpdateUserProfileFormProps {
  user: UserFull;
}

export function UpdateUserProfileForm({ user }: UpdateUserProfileFormProps) {
  const { update } = useSession();

  const form = useForm<UpdateUserProfileInput>({
    resolver: zodResolver(updateUserProfileSchema),
    defaultValues: {
      username: user.name || "",
      biography: user.biography || "",
    },
  });

  const { execute, status } = useAction(updateUserProfile, {
    onSuccess: async (result) => {
      if (result.data && result.data.success) {
        toast(result.data.message);
        await update({ user: { ...user, name: form.getValues().username, biography: form.getValues().biography } });
      } else if (result.data) {
        toast(result.data.message);
      }
    },
    onError: ({ error }) => {
      toast(`Une erreur est survenue : ${error.serverError || "Erreur inconnue"}`);
    },
  });

  const onSubmit = (data: UpdateUserProfileInput) => {
    execute(data);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{`Modifier le profil utilisateur`}</CardTitle>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{`Nom d'utilisateur`}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="biography"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{`Biographie`}</FormLabel>
                  <FormControl>
                    <Textarea {...field} value={field.value || ""} />
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

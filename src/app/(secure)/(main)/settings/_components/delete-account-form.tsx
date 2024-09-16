"use client";

import { deleteAccount } from "@/app/(secure)/(main)/settings/actions";
import { DeleteAccountInput, deleteAccountSchema } from "@/validations/user-settings.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useAction } from "next-safe-action/hooks";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export function DeleteAccountForm() {
  const router = useRouter();
  const form = useForm<DeleteAccountInput>({
    resolver: zodResolver(deleteAccountSchema),
    defaultValues: {
      confirmation: "" as "confirmer",
    },
  });

  const { execute, status } = useAction(deleteAccount, {
    onSuccess: async (result) => {
      if (result.data && result.data.success) {
        toast(result.data.message);
        router.push("/");
      } else if (result.data) {
        toast(result.data.message);
      }
    },
    onError: ({ error }) => {
      toast(`Une erreur est survenue : ${error.serverError || "Erreur inconnue"}`);
    },
  });

  const onSubmit = (data: DeleteAccountInput) => {
    execute(data);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{`Supprimer le compte`}</CardTitle>
      </CardHeader>
      <CardContent>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="destructive">{`Supprimer mon compte`}</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{`Êtes-vous sûr de vouloir supprimer votre compte ?`}</DialogTitle>
              <DialogDescription>{`Cette action est irréversible. Toutes vos données seront supprimées définitivement.`}</DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  control={form.control}
                  name="confirmation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{`Tapez "confirmer" pour supprimer votre compte`}</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter className="mt-4">
                  <Button type="submit" variant="destructive" disabled={status === "executing"}>
                    {`Supprimer définitivement`}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}

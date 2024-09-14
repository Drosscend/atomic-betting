"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const invitationSchema = z.object({
  invitation: z
    .string()
    .min(1, { message: `Le champ ne peut pas être vide.` })
    .refine(
      (value) => {
        const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;
        const linkRegex = new RegExp(`^${window.location.origin}/invite/[0-9a-fA-F-]{36}$`);
        return uuidRegex.test(value) || linkRegex.test(value);
      },
      {
        message: `Veuillez entrer un UUID valide ou un lien d'invitation valide.`,
      }
    ),
});

export function JoinTeamDialog() {
  const router = useRouter();
  const form = useForm<z.infer<typeof invitationSchema>>({
    resolver: zodResolver(invitationSchema),
    defaultValues: {
      invitation: "",
    },
  });

  const onSubmit = (data: z.infer<typeof invitationSchema>) => {
    const uuid = data.invitation.includes("/") ? data.invitation.split("/").pop() : data.invitation;
    router.push(`/invite/${uuid}`);
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{`Rejoindre une équipe`}</DialogTitle>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="invitation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{`Code ou lien d'invitation`}</FormLabel>
                <FormControl>
                  <Input placeholder="UUID ou lien d'invitation" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            {`Rejoindre`}
          </Button>
        </form>
      </Form>
    </DialogContent>
  );
}

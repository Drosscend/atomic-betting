"use client";

import { Invitation, invitationSchema } from "@/validations/join-team.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export function JoinTeamDialog() {
  const router = useRouter();
  const form = useForm<Invitation>({
    resolver: zodResolver(invitationSchema),
    defaultValues: {
      invitation: "",
    },
  });

  const onSubmit = (data: Invitation) => {
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

import { z } from "zod";

export const invitationSchema = z.object({
  invitation: z
    .string()
    .min(1, { message: `Le champ d'invitation ne peut pas être vide.` })
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

export type Invitation = z.infer<typeof invitationSchema>;

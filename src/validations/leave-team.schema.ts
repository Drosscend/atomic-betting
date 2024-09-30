import { z } from "zod";

export const leaveTeamSchema = z.object({
  teamId: z.string().uuid({ message: "L'ID de l'équipe doit être un UUID valide." }),
});

export const leaveTeamSchemaInput = z.object({
  confirmation: z.literal("quitter", {
    errorMap: () => ({ message: `Veuillez saisir exactement 'quitter' pour confirmer.` }),
  }),
});

export type LeaveTeamInput = z.infer<typeof leaveTeamSchema>;
export type LeaveTeamInputInput = z.infer<typeof leaveTeamSchemaInput>;

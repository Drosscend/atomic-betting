import { z } from "zod";

export const joinTeamSchema = z.object({
  teamId: z.string().uuid({ message: "L'ID de l'équipe doit être un UUID valide." }),
});

export type JoinTeamInput = z.infer<typeof joinTeamSchema>;

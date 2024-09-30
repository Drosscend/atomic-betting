import { z } from "zod";

export const cancelJoinRequestSchema = z.object({
  teamId: z.string().uuid({ message: "L'ID de l'équipe doit être un UUID valide." }),
});

export type CancelJoinRequestInput = z.infer<typeof cancelJoinRequestSchema>;

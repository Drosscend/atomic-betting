import { MembershipStatus } from "@prisma/client";
import { z } from "zod";

export const updateMembershipStatusSchema = z.object({
  userId: z.string().uuid({ message: "L'ID de l'utilisateur doit être un UUID valide." }),
  status: z.nativeEnum(MembershipStatus, {
    errorMap: () => ({ message: "Le statut d'adhésion fourni n'est pas valide." }),
  }),
  teamId: z.string().uuid({ message: "L'ID de l'équipe doit être un UUID valide." }),
});

export type UpdateMembershipStatusInput = z.infer<typeof updateMembershipStatusSchema>;

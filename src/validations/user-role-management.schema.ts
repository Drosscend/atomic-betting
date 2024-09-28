import { MembershipRole } from "@prisma/client";
import { z } from "zod";

export const updateUserRoleSchema = z.object({
  userId: z.string().uuid({ message: "L'ID de l'utilisateur doit être un UUID valide." }),
  role: z.nativeEnum(MembershipRole, {
    errorMap: () => ({ message: "Le rôle fourni n'est pas valide." }),
  }),
  teamId: z.string().uuid({ message: "L'ID de l'équipe doit être un UUID valide." }),
});

export type UpdateUserRoleInput = z.infer<typeof updateUserRoleSchema>;

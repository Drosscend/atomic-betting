import { z } from "zod";

const MAX_COINS = 2147483647;

export const updateUserCoinsSchema = z.object({
  userId: z.string().uuid({ message: "L'ID de l'utilisateur doit être un UUID valide." }),
  coins: z
    .number()
    .int()
    .min(0, { message: `Le nombre de jetons doit être positif ou nul.` })
    .max(MAX_COINS, { message: `Le nombre de jetons ne peut pas dépasser ${MAX_COINS}.` }),
  teamId: z.string().uuid({ message: "L'ID de l'équipe doit être un UUID valide." }),
});

export const removeUserSchema = z.object({
  userId: z.string().uuid({ message: "L'ID de l'utilisateur doit être un UUID valide." }),
  teamId: z.string().uuid({ message: "L'ID de l'équipe doit être un UUID valide." }),
});

export type UpdateUserCoinsInput = z.infer<typeof updateUserCoinsSchema>;
export type RemoveUserInput = z.infer<typeof removeUserSchema>;

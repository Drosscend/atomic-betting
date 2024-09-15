import { z } from "zod";

export const updateUserCoinsSchema = z.object({
  userId: z.string(),
  coins: z
    .number()
    .int()
    .min(0, { message: `Le nombre de jetons doit être positif ou nul.` })
    .max(2147483647, { message: `Le nombre de jetons ne peut pas dépasser 2 147 483 647.` }),
  teamId: z.string(),
});

export const removeUserSchema = z.object({
  userId: z.string(),
  teamId: z.string(),
});

export type UpdateUserCoinsInput = z.infer<typeof updateUserCoinsSchema>;
export type RemoveUserInput = z.infer<typeof removeUserSchema>;

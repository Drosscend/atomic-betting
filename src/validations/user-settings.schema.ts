import { z } from "zod";

export const updateUsernameSchema = z.object({
  username: z
    .string()
    .min(3, { message: `Le nom d'utilisateur doit contenir au moins 3 caractères.` })
    .max(50, { message: `Le nom d'utilisateur ne peut pas dépasser 50 caractères.` }),
});

export const deleteAccountSchema = z.object({
  confirmation: z.literal("confirmer", { errorMap: () => ({ message: `Veuillez saisir 'confirmer' pour supprimer votre compte.` }) }),
});

export type UpdateUsernameInput = z.infer<typeof updateUsernameSchema>;
export type DeleteAccountInput = z.infer<typeof deleteAccountSchema>;

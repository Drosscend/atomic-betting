import { z } from "zod";

export const updateUserProfileSchema = z.object({
  username: z
    .string()
    .min(3, { message: `Le nom d'utilisateur doit contenir au moins 3 caractères.` })
    .max(50, { message: `Le nom d'utilisateur ne peut pas dépasser 50 caractères.` }),
  biography: z.string().max(500, { message: `La biographie ne peut pas dépasser 500 caractères.` }).nullable(),
});

export const deleteAccountSchema = z.object({
  confirmation: z.literal("confirmer", { errorMap: () => ({ message: `Veuillez saisir 'confirmer' pour supprimer votre compte.` }) }),
});

export const deleteSessionSchema = z.object({
  sessionId: z.string(),
});

export type UpdateUserProfileInput = z.infer<typeof updateUserProfileSchema>;
export type DeleteAccountInput = z.infer<typeof deleteAccountSchema>;
export type DeleteSessionInput = z.infer<typeof deleteSessionSchema>;

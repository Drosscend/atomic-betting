import { z } from "zod";

const MIN_USERNAME_LENGTH = 3;
const MAX_USERNAME_LENGTH = 50;
const MAX_BIOGRAPHY_LENGTH = 500;

export const updateUserProfileSchema = z.object({
  username: z
    .string()
    .min(MIN_USERNAME_LENGTH, { message: `Le nom d'utilisateur doit contenir au moins ${MIN_USERNAME_LENGTH} caractères.` })
    .max(MAX_USERNAME_LENGTH, { message: `Le nom d'utilisateur ne peut pas dépasser ${MAX_USERNAME_LENGTH} caractères.` }),
  biography: z
    .string()
    .max(MAX_BIOGRAPHY_LENGTH, { message: `La biographie ne peut pas dépasser ${MAX_BIOGRAPHY_LENGTH} caractères.` })
    .nullable()
    .refine((bio) => bio === null || bio.trim().length > 0, {
      message: `La biographie ne peut pas être une chaîne vide ou ne contenir que des espaces.`,
    }),
});

export const deleteAccountSchema = z.object({
  confirmation: z.literal("confirmer", {
    errorMap: () => ({ message: `Veuillez saisir exactement 'confirmer' (sans guillemets) pour supprimer votre compte.` }),
  }),
});

export const deleteSessionSchema = z.object({
  sessionId: z.string().uuid({ message: "L'ID de session doit être un UUID valide." }),
});

export type UpdateUserProfileInput = z.infer<typeof updateUserProfileSchema>;
export type DeleteAccountInput = z.infer<typeof deleteAccountSchema>;
export type DeleteSessionInput = z.infer<typeof deleteSessionSchema>;

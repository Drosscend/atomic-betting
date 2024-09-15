import { z } from "zod";

export const updateTeamSettingsSchema = z.object({
  teamName: z
    .string()
    .min(1, { message: `Le nom de l'équipe est requis.` })
    .max(50, { message: `Le nom de l'équipe ne peut pas dépasser 50 caractères.` }),
  defaultCoins: z.number().int().min(0, { message: `Le nombre de jetons par défaut doit être positif ou nul.` }),
  defaultDuration: z.number().int().min(1, { message: `La durée par défaut des paris doit être d'au moins 1 heure.` }),
});

export const deleteTeamSchema = z.object({
  confirmation: z.literal("supprimer", { errorMap: () => ({ message: `Veuillez saisir 'supprimer' pour confirmer la suppression de l'équipe.` }) }),
});

export type UpdateTeamSettingsInput = z.infer<typeof updateTeamSettingsSchema>;
export type DeleteTeamInput = z.infer<typeof deleteTeamSchema>;

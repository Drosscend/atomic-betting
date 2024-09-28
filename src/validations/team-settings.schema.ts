import { z } from "zod";

const MIN_TEAM_NAME_LENGTH = 1;
const MAX_TEAM_NAME_LENGTH = 50;
const MAX_COINS = 2147483647;
const MAX_DURATION = 168; // One week

export const updateTeamSettingsSchema = z.object({
  teamName: z
    .string()
    .min(MIN_TEAM_NAME_LENGTH, { message: `Le nom de l'équipe doit contenir au moins ${MIN_TEAM_NAME_LENGTH} caractère.` })
    .max(MAX_TEAM_NAME_LENGTH, { message: `Le nom de l'équipe ne peut pas dépasser ${MAX_TEAM_NAME_LENGTH} caractères.` })
    .refine((name) => /^[a-zA-Z0-9\s-]+$/.test(name), {
      message: `Le nom de l'équipe ne peut contenir que des lettres, des chiffres, des espaces et des tirets.`,
    }),
  defaultCoins: z
    .number()
    .int()
    .min(0, { message: `Le nombre de jetons par défaut doit être positif ou nul.` })
    .max(MAX_COINS, { message: `Le nombre de jetons par défaut ne peut pas dépasser ${MAX_COINS}.` }),
  defaultDuration: z
    .number()
    .int()
    .min(1, { message: `La durée par défaut des paris doit être d'au moins 1 heure.` })
    .max(MAX_DURATION, { message: `La durée par défaut des paris ne peut pas dépasser ${MAX_DURATION} heures.` }),
  dailyRewardCoins: z
    .number()
    .int()
    .min(1, { message: `Le nombre de jetons pour la récompense quotidienne doit être d'au moins 1.` })
    .max(MAX_COINS, { message: `Le nombre de jetons pour la récompense quotidienne ne peut pas dépasser ${MAX_COINS}.` }),
  streakRewardCoins: z
    .number()
    .int()
    .min(1, { message: `Le nombre de jetons pour la récompense de série doit être d'au moins 1.` })
    .max(MAX_COINS, { message: `Le nombre de jetons pour la récompense de série ne peut pas dépasser ${MAX_COINS}.` }),
});

export const deleteTeamSchema = z.object({
  confirmation: z.literal("supprimer", { errorMap: () => ({ message: `Veuillez saisir 'supprimer' pour confirmer la suppression de l'équipe.` }) }),
});

export type UpdateTeamSettingsInput = z.infer<typeof updateTeamSettingsSchema>;
export type DeleteTeamInput = z.infer<typeof deleteTeamSchema>;

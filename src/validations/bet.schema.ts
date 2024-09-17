import { BetType } from "@prisma/client";
import { z } from "zod";

export const betSchema = z.object({
  type: z.nativeEnum(BetType),
  startDateTime: z.date().refine(
    (value) => {
      return value > new Date();
    },
    { message: `La date de début doit être ultérieure à la date actuelle.` }
  ),
  endDateTime: z.date(),
  minCoins: z.number().int().positive(),
  maxCoins: z.number().int().positive(),
  description: z
    .string()
    .min(10, { message: `La description doit contenir au moins 10 caractères.` })
    .max(500, { message: `La description ne peut pas dépasser 500 caractères.` }),
  question: z
    .string()
    .min(5, { message: `La question doit contenir au moins 5 caractères.` })
    .max(200, { message: `La question ne peut pas dépasser 200 caractères.` }),
  options: z
    .array(z.string())
    .min(2, { message: `Il doit y avoir au moins 2 options.` })
    .max(5, { message: `Il ne peut pas y avoir plus de 5 options.` })
    .refine(
      (value) => {
        return value.length === new Set(value).size;
      },
      { message: `Les options doivent être uniques.` }
    ),
});

export const createBetSchema = betSchema.extend({
  teamId: z.string(),
});

export const editBetSchema = betSchema.extend({
  betId: z.string(),
});

export const SelectAnswerInput = z.object({
  betId: z.string(),
  optionId: z.string(),
});

export const placeBetSchema = z.object({
  betId: z.string(),
  optionId: z.string().min(1, { message: "Veuillez sélectionner une option" }),
  coinsAmount: z.number().int().positive({ message: "Le montant doit être supérieur à 0" }),
});

export type CreateBetInput = z.infer<typeof createBetSchema>;
export type EditBetInput = z.infer<typeof editBetSchema>;
export type SelectAnswerInput = z.infer<typeof SelectAnswerInput>;
export type PlaceBetInput = z.infer<typeof placeBetSchema>;

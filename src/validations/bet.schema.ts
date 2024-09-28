import { BetType } from "@prisma/client";
import { z } from "zod";

const MIN_DESCRIPTION_LENGTH = 10;
const MAX_DESCRIPTION_LENGTH = 500;
const MIN_QUESTION_LENGTH = 5;
const MAX_QUESTION_LENGTH = 200;
const MIN_OPTIONS = 2;
const MAX_OPTIONS = 5;

export const betSchema = z.object({
  type: z.nativeEnum(BetType, {
    errorMap: () => ({ message: `Type de pari invalide` }),
  }),
  startDateTime: z.coerce.date().refine((value) => value > new Date(), { message: `La date de début doit être ultérieure à la date actuelle.` }),
  endDateTime: z.coerce.date().refine((value) => value > new Date(), { message: `La date de fin doit être ultérieure à la date actuelle.` }),
  minCoins: z.number().int().positive({
    message: `Le nombre minimum de jetons doit être un entier positif.`,
  }),
  maxCoins: z.number().int().positive({
    message: `Le nombre maximum de jetons doit être un entier positif.`,
  }),
  description: z
    .string()
    .min(MIN_DESCRIPTION_LENGTH, {
      message: `La description doit contenir au moins ${MIN_DESCRIPTION_LENGTH} caractères.`,
    })
    .max(MAX_DESCRIPTION_LENGTH, {
      message: `La description ne peut pas dépasser ${MAX_DESCRIPTION_LENGTH} caractères.`,
    }),
  question: z
    .string()
    .min(MIN_QUESTION_LENGTH, {
      message: `La question doit contenir au moins ${MIN_QUESTION_LENGTH} caractères.`,
    })
    .max(MAX_QUESTION_LENGTH, {
      message: `La question ne peut pas dépasser ${MAX_QUESTION_LENGTH} caractères.`,
    }),
  options: z
    .array(z.string().min(1, { message: `Une option ne peut pas être vide.` }))
    .min(MIN_OPTIONS, { message: `Il doit y avoir au moins ${MIN_OPTIONS} options.` })
    .max(MAX_OPTIONS, { message: `Il ne peut pas y avoir plus de ${MAX_OPTIONS} options.` })
    .refine((value) => value.length === new Set(value).size, { message: `Les options doivent être uniques.` }),
});

export const createBetSchema = betSchema.extend({
  teamId: z.string().uuid({ message: "L'ID de l'équipe doit être un UUID valide." }),
});

export const editBetSchema = betSchema.extend({
  betId: z.string().uuid({ message: "L'ID du pari doit être un UUID valide." }),
});

export const SelectAnswerInput = z.object({
  betId: z.string().uuid({ message: "L'ID du pari doit être un UUID valide." }),
  optionId: z.string().uuid({ message: "L'ID de l'option doit être un UUID valide." }),
});

export const placeBetSchema = z.object({
  betId: z.string().uuid({ message: "L'ID du pari doit être un UUID valide." }),
  optionId: z.string().uuid({ message: "L'ID de l'option doit être un UUID valide." }),
  coinsAmount: z.number().int().positive({ message: "Le montant des jetons doit être un entier positif." }),
});

export type CreateBetInput = z.infer<typeof createBetSchema>;
export type EditBetInput = z.infer<typeof editBetSchema>;
export type SelectAnswerInput = z.infer<typeof SelectAnswerInput>;
export type PlaceBetInput = z.infer<typeof placeBetSchema>;

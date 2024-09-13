import { addDays, isAfter, startOfDay } from "date-fns";
import { z } from "zod";

export const betSchema = z.object({
  id: z.string().optional(),
  question: z.string().min(10, "La question doit contenir au moins 10 caractères.").max(255, "La question ne peut pas dépasser 255 caractères."),
  startDate: z.date().min(startOfDay(new Date()), "La date de début doit être ultérieure à la date actuelle."),
  endDate: z.date().refine((value) => {
    const endDate = new Date(value);
    const startDate = addDays(new Date(), 1);
    return isAfter(endDate, startDate);
  }, "La date de fin doit être ultérieure à la date de début."),
  minPoints: z.number().min(10).default(10),
  maxPoints: z.number().max(250000).default(250000),
  responses: z
    .array(
      z.object({
        id: z.string().optional(),
        response: z.string().min(1, "La réponse doit contenir au moins 1 caractère.").max(255, "La réponse ne peut pas dépasser 255 caractères."),
      })
    )
    .nonempty(),
});

import { z } from "zod";

export const cardSchema = z.object({
  deckId: z.string().min(1),
  front: z.string().trim().min(1),
  back: z.string().trim().min(1),
});

export type CardValues = z.infer<typeof cardSchema>;
export type StudyMode = "basic" | "reverse" | "typing";

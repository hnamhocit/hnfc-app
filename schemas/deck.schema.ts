import z from "zod";

export const deckSchema = z.object({
  title: z.string().min(1).max(100),
  description: z.string().max(500),
  tags: z.array(z.string().max(10)),
  color: z.string().regex(/^#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})$/),
});

export type DeckInput = z.infer<typeof deckSchema>;

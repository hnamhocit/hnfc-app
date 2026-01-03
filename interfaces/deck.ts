import { IDocument } from "./document";

export interface IDeck extends IDocument {
  title: string;
  description: string;
  tags: string[];
  color: string;

  ownerId: string;
}

export interface IDeckStats {
  totalCards: number;
  dueCards: number;
  progress: number;
}

export type IDeckWithStats = IDeck & IDeckStats;

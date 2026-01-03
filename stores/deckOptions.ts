import { create } from "zustand";

export interface DeckOption {
  id: string;
  title: string;
}

interface DeckOptionsState {
  options: DeckOption[];
  loaded: boolean;
  setOptions: (options: DeckOption[]) => void;
  reset: () => void;
}

export const useDeckOptionsStore = create<DeckOptionsState>((set) => ({
  options: [],
  loaded: false,
  setOptions: (options) => set({ options, loaded: true }),
  reset: () => set({ options: [], loaded: false }),
}));

import { create } from "zustand";

export interface SideSheetState {
  open: boolean;
  title: string;
  description?: string;
  view: string;
  width: number;
  payload?: Record<string, string | number | boolean | null>;
}

interface UiStore {
  commandPaletteOpen: boolean;
  sideSheet: SideSheetState;
  setCommandPaletteOpen: (open: boolean) => void;
  openSideSheet: (state: Omit<SideSheetState, "open">) => void;
  closeSideSheet: () => void;
}

const defaultSideSheet: SideSheetState = {
  open: false,
  title: "",
  view: "",
  width: 480,
};

export const useUiStore = create<UiStore>((set) => ({
  commandPaletteOpen: false,
  sideSheet: defaultSideSheet,
  setCommandPaletteOpen: (open) => set({ commandPaletteOpen: open }),
  openSideSheet: (state) => set({ sideSheet: { ...state, open: true } }),
  closeSideSheet: () => set({ sideSheet: defaultSideSheet }),
}));

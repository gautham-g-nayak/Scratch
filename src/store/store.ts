import { create } from "zustand";
import { Store } from "./types";

export const useStore = create<Store>((set) => ({
  // States
  showBall: false,
  catAction: [],
  ballAction: [],

  // Update functions
  setShowBall: (showBall: Boolean) => set({ showBall }),
  setCatAction: (catAction: any) => set({ catAction }),
  setBallAction: (ballAction: any) => set({ ballAction }),
}));

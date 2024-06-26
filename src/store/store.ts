import { create } from "zustand";
import { Store } from "./types";

export const useStore = create<Store>((set) => ({
  // States
  showBall: false,
  showApple: false,
  showBanana: false,
  showDog: false,
  catAction: [],
  ballAction: [],
  appleAction: [],
  bananaAction: [],
  dogAction: [],

  // Update functions
  setShowBall: (showBall: Boolean) => set({ showBall }),
  setShowBanana: (showBanana: Boolean) => set({ showBanana }),
  setShowApple: (showApple: Boolean) => set({ showApple }),
  setShowDog: (showDog: Boolean) => set({ showDog }),
  setCatAction: (catAction: any) => set({ catAction }),
  setBallAction: (ballAction: any) => set({ ballAction }),
  setDogAction: (dogAction: any) => set({ dogAction }),
  setAppleAction: (appleAction: any) => set({ appleAction }),
  setBananaAction: (bananaAction: any) => set({ bananaAction }),
}));

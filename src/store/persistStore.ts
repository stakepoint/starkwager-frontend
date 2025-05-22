import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface UserState {
  user: string | null;
  setUser: (user: string | null) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),
    }),
    {
      name: "user-storage",
    }
  )
);

export interface WalletState {
  address: string | null;
  setAddress: (address: string | null) => void;
  clearAddress: () => void;
}

export const useWalletStore = create<WalletState>()(
  persist(
    (set) => ({
      address: null,
      setAddress: (address) => set({ address }),
      clearAddress: () => set({ address: null }),
    }),
    {
      name: "wallet-storage",
    }
  )
);

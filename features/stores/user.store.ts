import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface User {
  id: number;
  username: string;
  email: string;
  role: "User" | "Admin";
}

interface UserStore {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
}

export const UserStorageKey = "user-storage";

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),
    }),
    {
      name: UserStorageKey,
      storage: createJSONStorage(() => localStorage),
    }
  )
);

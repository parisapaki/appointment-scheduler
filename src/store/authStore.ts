import { create } from "zustand";
import type { Input } from "../components/Auth/LoginForm";

type AuthStore = {
  user: Input | null;
  login: (userdata: Input) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  login: (userData) => set({ user: userData }),
  logout: () => set({ user: null }),
}));

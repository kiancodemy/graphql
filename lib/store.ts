"use client";
import { create } from "zustand";
interface User {
  name: String;
  email: string;
}

interface BearState {
  bears: unknown;
  adduser: (user: User) => void;
  removeuser: () => void;
}

export const useBearStore = create<BearState>()((set) => ({
  bears: localStorage.getItem("info")
    ? JSON.parse(localStorage.getItem("info") as string)
    : 77,
  adduser: (users: User) =>
    set(
      () => (
        localStorage.setItem("info", JSON.stringify(users)), { bears: users }
      )
    ),
  removeuser: () =>
    set(() => (localStorage.removeItem("info"), { bears: null })),
}));

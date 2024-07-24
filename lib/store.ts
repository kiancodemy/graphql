"use client";
import { create } from "zustand";
import { User } from "@/type";
import { BearState } from "@/type";

export const useBearStore = create<BearState>()((set) => ({
  bears: localStorage.getItem("info")
    ? JSON.parse(localStorage.getItem("info") as string)
    : null,
  adduser: (users: User) =>
    set(
      () => (
        localStorage.setItem("info", JSON.stringify(users)), { bears: users }
      )
    ),
  removeuser: () =>
    set(() => (localStorage.removeItem("info"), { bears: null })),
}));

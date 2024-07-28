"use client";
import { create } from "zustand";
import { User } from "@/type";
import { BearState } from "@/type";
import { persist } from "zustand/middleware";
// the store itself does not need any change
export const useBearStore = create(
  persist(
    (set, get) => ({
      bears: 0,
      chart: [],
      adduser: (users: User) => set({ bears: users }),
      removeuser: () => set({ bears: null }),
      send: (charts: any) => set({ chart: charts }),
    }),
    {
      name: "food-storage",
    }
  )
);

"use client";

import { useEffect } from "react";
import { useBearStore } from "@/lib/zustand/store";
import UseStore from "../zustand/usestore";

import { useRouter } from "next/navigation";
export const useProtec = () => {
  const bears = UseStore(useBearStore, (state: any) => state.bears);
  const router = useRouter();
  useEffect(() => {
    if (bears?._id) {
      router.push("/main");
    } else {
      return;
    }
  }, [bears, router]);
};

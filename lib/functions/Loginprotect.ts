"use client";
import { useEffect, useState } from "react";
import { useBearStore } from "@/lib/zustand/store";
import useStore from "../zustand/usestore";

import { useRouter } from "next/navigation";
export const protect = () => {
  const bears = useStore(useBearStore, (state: any) => state.bears);
  const router = useRouter();
  useEffect(() => {
    if (bears?._id) {
      router.push("/main");
    } else {
      return;
    }
  }, [bears]);
};

export const getit = () => {
  const [a, b] = useState<any>();
  useEffect(() => {
    localStorage.getItem("info")
      ? b(JSON.parse(localStorage.getItem("info") as string))
      : b(null);
  }, []);
  return a;
};

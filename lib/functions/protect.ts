"use client";
import { useEffect } from "react";
import { useBearStore } from "@/lib/store";

import { useRouter } from "next/navigation";
export const protect = () => {
  const bears = useBearStore((state) => state.bears);
  const router = useRouter();
  useEffect(() => {
    if (bears?.name) {
      router.push("/main");
    } else {
      return;
    }
  }, []);
};

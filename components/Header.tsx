"use client";
import React from "react";
import { FaUser } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";

import { useRouter } from "next/navigation";
import { useMutation } from "@apollo/client";
import { useBearStore } from "@/lib/store";

import { logout } from "@/lib/mutation";
export default function Header() {
  const removeinfo = useBearStore((state) => state.removeuser);
  const bears = useBearStore((state) => state.bears);
  const [logedout] = useMutation(logout);
  const router = useRouter();

  const logingout = () => {
    logedout();

    removeinfo();
    router.push("/");
  };

  return (
    <div className="flex flex-col gap-y-3 px-4 my-6 container mx-auto lg:max-w-7xl md:max-w-4xl max-w-[340px] py-2">
      <div className="flex items-center justify-center lg:justify-end gap-x-3">
        <div className="flex border-2 text-white border-white py-2 px-6 rounded-sm  items-center justify-center gap-x-3">
          <h1>{bears?.name}</h1>
          <div className="w-6 bg-white h-6 rounded-full flex justify-center items-center">
            <FaUser className="text-black"></FaUser>
          </div>
        </div>
        <div
          className="flex justify-center py-2 px-6 rounded-md duration-500  items-center hover:bg-blue-600 
bg-blue-400 gap-x-3 text-white"
        >
          <button className="capitalize" onClick={logingout}>
            log out
          </button>
          <FiLogOut></FiLogOut>
        </div>
      </div>
      <div>
        <h1 className="font-bold py-3 text-2xl  lg:text-4xl capitalize text-center bg-gradient-to-r from-pink-600 via-green-40 to-indigo-400 text-transparent bg-clip-text ">
          spend wisely, track wisely
        </h1>
      </div>
    </div>
  );
}

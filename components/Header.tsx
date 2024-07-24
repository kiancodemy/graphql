"use client";
import React from "react";
import { FaUser } from "react-icons/fa";

import { useRouter } from "next/navigation";
import { gql, useMutation } from "@apollo/client";
import { useBearStore } from "@/lib/store";

const logout = gql`
  mutation {
    logout
  }
`;

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
    <div className="bg-black justify-end px-4 my-6 flex container mx-auto lg:max-w-7xl md:max-w-4xl max-w-[340px] py-2">
      <div className="flex items-center justify-center gap-x-3">
        <div className="flex border-2 text-white border-white py-2 px-6 rounded-sm  items-center justify-center gap-x-4">
          <h1>{bears?.name}</h1>
          <div className="w-6 bg-white h-6 rounded-full flex justify-center items-center">
            <FaUser className="text-black"></FaUser>
          </div>
        </div>
        <button
          className="py-2 capitalize rounded-md hover:bg-blue-600 duration-500  px-6 bg-blue-400 text-white"
          onClick={logingout}
        >
          log out
        </button>
      </div>
    </div>
  );
}

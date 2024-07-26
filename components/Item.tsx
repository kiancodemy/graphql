import React from "react";
import { ITEM } from "@/type";
import { useMutation } from "@apollo/client";
import { MdDeleteOutline } from "react-icons/md";
import { deleteTransaction } from "@/lib/mutation";
import { AiFillEdit } from "react-icons/ai";
import { useEffect } from "react";
import { toast, Zoom } from "react-toastify";
import { getTransaction } from "@/lib/query";
/////
import { TbMoneybag } from "react-icons/tb";
import { FaLocationPin } from "react-icons/fa6";
import { FaAddressCard } from "react-icons/fa6";
import { MdOutlineDescription } from "react-icons/md";

import Link from "next/link";
export default function Item({ items }: any) {
  const [data, { error }] = useMutation(deleteTransaction);
  const deleter = async () => {
    await data({
      variables: { id: items._id },
      refetchQueries: [{ query: getTransaction }],
    });
    toast.success(<span className="capitalize">deleted successfully</span>, {
      position: "top-right",
      transition: Zoom,
      autoClose: 1000,
    });
  };
  useEffect(() => {
    if (error) {
      toast.error(<span className="capitalize">{error.message}</span>, {
        position: "top-right",
        transition: Zoom,
        autoClose: 1500,
      });
    }
  }, [error]);
  return (
    <div
      className={`${
        items.category === "saving" || items.category === "invest"
          ? "bg-green-500"
          : "bg-red-600"
      } p-4 capitalize flex  flex-col gap-y-3 rounded-md text-white`}
    >
      <div className="flex items-center justify-between mb-3">
        <h1 className="font-bold">{items.category}</h1>
        <div className="flex text-xl items-center font-semibold gap-x-3">
          <button
            onClick={deleter}
            className="cursor-pointer hover:shadow-md duration-300"
          >
            <MdDeleteOutline></MdDeleteOutline>
          </button>
          <Link
            href={`/item/${items._id}`}
            className="cursor-pointer hover:shadow-md duration-300"
          >
            <AiFillEdit></AiFillEdit>
          </Link>
        </div>
      </div>
      <div className="flex gap-x-3 items-center">
        <TbMoneybag></TbMoneybag>
        <h1>amount:</h1>
        <h1>${items.amount}</h1>
      </div>
      <div className="flex gap-x-3 items-center">
        <MdOutlineDescription></MdOutlineDescription>
        <h1>description:</h1>
        <h1>{items.description}</h1>
      </div>
      <div className="flex gap-x-3 items-center">
        <FaAddressCard></FaAddressCard>
        <h1>paymentType:</h1>
        <h1>{items.paymentType}</h1>
        <h1></h1>
      </div>
      <div className="flex gap-x-3 items-center">
        <FaLocationPin></FaLocationPin>
        <h1>location:</h1>
        <h1>{items.location}</h1>
      </div>
    </div>
  );
}

/*amount: 11.5;
category: "saving";
date: "2024-07-30";
description: "ff";
location: "ffgf";
paymentType: "card";
userId: "66a0cd1c175ea4a4b34f4580";
__typename: "Transaction";
_id: "66a3b24c72a59034681e3b65";*/

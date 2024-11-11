"use client";

import { ID } from "@/type";
import { useQuery } from "@apollo/client";
import { updateTransaction } from "@/lib/mutation";
import { getTransaction } from "@/lib/query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import React, { useEffect } from "react";
import { useMutation } from "@apollo/client";

import { toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { getTransactonById } from "@/lib/query";
export default function Update({ id }: ID) {
  const router = useRouter();
  ///get data by id  bygraphql
  const { data, loading } = useQuery(getTransactonById, {
    variables: { id: id },
  });

  // set default value of inputs
  useEffect(() => {
    if (data?.getTransactionById?._id) {
      const all = data.getTransactionById;
      setdescription(all.description);
      setpaymentType(all.paymentType);
      setcategory(all.category);
      setamount(all.amount);
      setlocation(all.location);
      setdate(all.date);
    }
  }, [data]);

  const [updater, { error }] = useMutation(updateTransaction);

  const [description, setdescription] = useState("");
  const [paymentType, setpaymentType] = useState("");
  const [category, setcategory] = useState("");
  const [amount, setamount] = useState<Number | String | any>("");
  const [location, setlocation] = useState("");
  const [date, setdate] = useState("");

  const submitForm = async () => {
    console.log(description);
    if (!paymentType || !category || !amount || !date) {
      toast.error(<span className="capitalize">fill all empty inputs!</span>, {
        position: "top-right",
        transition: Zoom,
        autoClose: 1000,
      });
      setdescription("");
      setpaymentType("card");
      setcategory("saving");
      setamount("");
      setlocation("");
      setdate("");

      return true;
    }
    try {
      await updater({
        variables: {
          id: data.getTransactionById._id,
          input: {
            userId: data.getTransactionById.userId,
            description,
            paymentType,
            category,
            amount,
            location,
            date,
          },
        },
        refetchQueries: [{ query: getTransaction }],
      });
      toast.success(<span className="capitalize">updated successfully</span>, {
        position: "top-right",
        transition: Zoom,
        autoClose: 1000,
      });
      router.push("/main");
    } catch (err) {
      return true;
    }
  };

  ///error handler//
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
    <div className="min-h-screen flex justify-center items-center">
      {!loading && (
        <div className="[&>h1]:font-semibold container text-white flex flex-col gap-y-3 max-w-[340px] md:max-w-[500px] p-4 rounded-md ">
          <h1 className="capitalize">transaction</h1>
          <input
            value={description}
            onChange={(e) => setdescription(e.target.value)}
            className="p-2 text-black rounded-md focus:outline-none"
            type="text"
          />
          <h1 className="capitalize">payment</h1>
          <select
            value={data?.getTransactionById?.paymentType}
            onChange={(e) => setpaymentType(e.target.value)}
            className="rounded-sm focus:outline-none p-1 text-black bg-[#ddd]"
          >
            <option value="card">card</option>
            <option value="cash">cash</option>
          </select>
          <h1 className="capitalize">category</h1>
          <select
            value={category}
            onChange={(e) => setcategory(e.target.value)}
            className="rounded-sm text-black bg-[#ddd] focus:outline-none p-1"
          >
            <option value="saving">saving</option>
            <option value="expense">expense</option>
            <option value="invest">invest</option>
          </select>
          <h1 className="capitalize">amount</h1>
          <input
            onChange={(e) => setamount(Number(e.target.value))}
            value={amount}
            className="text-black rounded-sm focus:outline-none p-1 bg-[#ddd]"
            type="number"
          />
          <h1 className="capitalize">location</h1>
          <input
            value={location}
            onChange={(e) => setlocation(e.target.value)}
            className="p-2 text-black rounded-md focus:outline-none"
            type="text"
          />
          <h1 className="capitalize">date</h1>
          <input
            value={date}
            onChange={(e) => setdate(e.target.value)}
            className="p-2 text-black rounded-md focus:outline-none"
            type="date"
          />
          <button
            type="submit"
            disabled={loading}
            onClick={submitForm}
            className="bg-blue-500 mt-3 rounded-md py-2 capitalize"
          >
            update
          </button>
        </div>
      )}
    </div>
  );
}

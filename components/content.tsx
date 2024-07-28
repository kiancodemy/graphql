"use client";
import React, { useEffect, useState } from "react";
import { addTransactions } from "@/lib/mutation";
import { useMutation } from "@apollo/client";
import Mychart from "./Mychart";
import { toast, Zoom } from "react-toastify";
import { useBearStore } from "@/lib/zustand/store";
import { getTransaction } from "@/lib/query";
import useStore from "@/lib/zustand/usestore";

export default function content() {
  const [description, setdescription] = useState("");
  const [paymentType, setpaymentType] = useState("card");
  const [category, setcategory] = useState("saving");
  const [amount, setamount] = useState<Number | String>("");
  const [location, setlocation] = useState("");
  const [date, setdate] = useState("");

  //graphlq add transaction
  const [creat, { error, loading }] = useMutation(addTransactions);
  const bears = useStore(useBearStore, (state: any) => state.bears);
  //chart info
  const chart = useStore(useBearStore, (state: any) => state.chart);
  //erro handler

  useEffect(() => {
    if (error) {
      toast.error(<span className="capitalize">{error?.message}</span>, {
        position: "top-right",
        transition: Zoom,
        autoClose: 1500,
      });
    }
  }, [error]);
  //submit hamdeler//

  const submit = async () => {
    try {
      if (!paymentType || !category || !amount || !date) {
        toast.error(
          <span className="capitalize">fill all empty inputs!</span>,
          {
            position: "top-right",
            transition: Zoom,
            autoClose: 1000,
          }
        );
        setdescription("");
        setpaymentType("card");
        setcategory("saving");
        setamount("");
        setlocation("");
        setdate("");

        return true;
      }

      await creat({
        variables: {
          input: {
            userId: bears._id,
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
      toast.success(
        <span className="capitalize">transaction added successfully</span>,
        {
          position: "top-right",
          transition: Zoom,
          autoClose: 1000,
        }
      );
      setdescription("");
      setpaymentType("card");
      setcategory("saving");
      setamount("");
      setlocation("");
      setdate("");
      const element: any = document.getElementById("kian");
      element.scrollIntoView({ behavior: "smooth" });
    } catch (err) {}
  };

  return (
    <div
      className={`p-4 gap-x-6 ${
        chart?.length === 0 && "justify-center"
      } flex-col lg:flex-row gap-y-10 flex container my-4 lg:max-w-4xl mx-auto`}
    >
      {chart?.length > 0 && (
        <div className="basis-[45%] ">
          <Mychart></Mychart>
        </div>
      )}
      <h1 className="basis-[55%] flex flex-col gap-y-6">
        <div className="flex text-white flex-col gap-y-2">
          <h1 className="capitalize">transaction</h1>
          <input
            value={description}
            onChange={(e) => setdescription(e.target.value)}
            className="p-2 text-black rounded-md focus:outline-none"
            type="text"
          />
        </div>
        <div className="grid justify-center grid-cols-3 items-center text-white gap-x-3">
          <div className="flex flex-col gap-y-2">
            <h1 className="capitalize">payment</h1>
            <select
              value={paymentType}
              onChange={(e) => setpaymentType(e.target.value)}
              className="rounded-sm focus:outline-none p-1 text-black bg-[#ddd]"
            >
              <option value="card">card</option>
              <option value="cash">cash</option>
            </select>
          </div>
          <div className="flex flex-col gap-y-2">
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
          </div>
          <div className="flex flex-col  gap-y-2">
            <h1 className="capitalize">amount</h1>
            <input
              onChange={(e) => setamount(Number(e.target.value))}
              value={amount}
              className="text-black rounded-sm focus:outline-none p-1 bg-[#ddd]"
              type="number"
            />
          </div>
        </div>
        <div className="grid items-center text-white grid-cols-2 gap-x-2">
          <div className="flex flex-col gap-y-2">
            <h1 className="capitalize">location</h1>
            <input
              value={location}
              onChange={(e) => setlocation(e.target.value)}
              className="p-2 text-black rounded-md focus:outline-none"
              type="text"
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <h1 className="capitalize">date</h1>
            <input
              value={date}
              onChange={(e) => setdate(e.target.value)}
              className="p-2 text-black rounded-md focus:outline-none"
              type="date"
            />
          </div>
        </div>
        <button
          type="submit"
          onClick={submit}
          disabled={loading}
          className="capitalize hover:bg-pink-600 duration-500 bg-pink-800 py-2 text-white rounded-md"
        >
          add transaction
        </button>
      </h1>
    </div>
  );
}

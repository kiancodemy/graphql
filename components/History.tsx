"use client";
import React from "react";
import Item from "./Item";
import { getTransaction } from "@/lib/query";
import { useQuery } from "@apollo/client";
import { useBearStore } from "@/lib/zustand/store";
import useStore from "@/lib/zustand/usestore";
import Loading from "@/app/loading";
import { ITEM } from "@/type";

export default function History() {
  const bears = useStore(useBearStore, (state: any) => state.bears);

  const { loading, error, data } = useQuery(getTransaction, {
    variables: { id: bears?._id },
  });

  return (
    <div className="lg:max-w-4xl py-10 flex flex-col gap-y-3 p-3 text-white text-center mt-6 lg:mt-8 md:ma-w-2xl max-w-[340[x] mx-auto container">
      <h1
        className="capitalize text-2xl font-semibold
        lg:text-4xl
      text-center"
      >
        history
      </h1>
      {loading && <Loading></Loading>}
      {data?.getTransactions.length === 0 && (
        <div>
          <h1 className="capitalize text-center py-4 lg:text-4xl text-2xl  ">
            there is no transaction yet!
          </h1>
        </div>
      )}
      {data && data?.getTransactions.length > 0 && (
        <div className="grid mt-6 lg:grid-cols-3 gap-x-3 gap-y-6 md:grid-cols-2 grid-cols-1">
          {data?.getTransactions.map((items: ITEM) => {
            return <Item key={`${items._id}`} items={items}></Item>;
          })}
        </div>
      )}
    </div>
  );
}

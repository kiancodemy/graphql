"use client";
import React, { useEffect } from "react";
import Item from "./Item";
import { getTransaction } from "@/lib/query";
import { useQuery } from "@apollo/client";

import Loading from "@/app/loading";
import { ITEM } from "@/type";

import { useBearStore } from "@/lib/zustand/store";


export default function History() {

  // graphql all transaction related to user//
  const { loading, data } = useQuery(getTransaction);
  const send = useBearStore((state: any) => state.send);

  //sending transactin info to chart//

  useEffect(() => {
    if (data?.getTransactions?.length > 0) {
      const saving = data?.getTransactions
        .filter((value: any) => value.category === "saving")
        .reduce((a: any, b: any) => a + b.amount, 0);

      const invest = data?.getTransactions
        .filter((value: any) => value.category === "invest")
        .reduce((a: any, b: any) => a + b.amount, 0);

      const expense = data?.getTransactions
        .filter((value: any) => value.category === "expense")
        .reduce((a: any, b: any) => a + b.amount, 0);

      send([
        { type: "saving", amount: saving },
        { type: "invest", amount: invest },
        { type: "expense", amount: expense },
      ]);
    } else {
      send([]);
    }
  }, [data]);

  return (
    <div
      id="kian"
      className="lg:max-w-4xl py-8 flex flex-col gap-y-3 p-3 text-white text-center mt-2 lg:mt-4 md:ma-w-2xl max-w-[340[x] mx-auto container"
    >
      <h1
        className="capitalize text-2xl font-semibold
        lg:text-4xl
      text-center"
      >
        history
      </h1>
      {loading && <Loading></Loading>}
      {!loading && data?.getTransactions?.length === 0 && (
        <div>
          <h1 className="capitalize text-center py-4 lg:text-4xl text-2xl  ">
            there is no transaction yet!
          </h1>
        </div>
      )}
      {data && data?.getTransactions?.length > 0 && (
        <div className="grid mt-6 lg:grid-cols-3 gap-x-3 gap-y-6 md:grid-cols-2 grid-cols-1">
          {data?.getTransactions.map((items: ITEM) => {
            return <Item key={`${items._id}`} items={items}></Item>;
          })}
        </div>
      )}
    </div>
  );
}

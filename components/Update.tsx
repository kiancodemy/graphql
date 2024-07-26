"use client";
import React from "react";
import { ID } from "@/type";
import { useQuery } from "@apollo/client";
import { updateTransaction } from "@/lib/mutation";
import { getTransactonById } from "@/lib/query";
export default function Update({ id }: ID) {
  const { data } = useQuery(getTransactonById, { variables: { id: id } });
  console.log(data);
  return <div>hi</div>;
}

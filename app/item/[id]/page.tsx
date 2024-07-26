import React from "react";
import Item from "@/components/Item";
import { ID } from "@/type";
import { ITEM } from "@/type";
import { getClient, query } from "@/app/ApolloClient";

import { gql } from "@apollo/client";
export const getTransaction = gql`
  query {
    getTransactions {
      _id
      userId
      description
      paymentType
      category
      amount
      location
      date
    }
  }
`;
import Update from "@/components/Update";
export async function generateStaticParams() {
  const client = await getClient();
  const { data } = await client.query({ query: getTransaction });
  console.log(data.getTransactions);

  return data?.getTransactions.map((item: ITEM) => ({
    id: item._id,
  }));
}
export default async function page({ params }: { params: ID }) {
  const { id } = params;
  return (
    <div>
      <h1>{id}</h1>
    </div>
  );
}

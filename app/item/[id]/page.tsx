import React from "react";

import { ID } from "@/type";

import Update from "@/components/Update";

export default async function page({ params }: { params: ID }) {
  return (
    <>
      <Update id={params.id}></Update>
    </>
  );
}

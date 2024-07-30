import React from "react";
import Header from "./Header";
import MyContent from "./MyContent";
import History from "./History";

export default function Main() {
  return (
    <div className="container mx-auto lg:max-w-7xl md:max-w-4xl max-w-[340px] min-h-[100vh]">
      <Header></Header>
      <MyContent></MyContent>
      <History></History>
    </div>
  );
}

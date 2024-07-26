import React from "react";
import Header from "./Header";
import Content from "./content";
export default function Main() {
  return (
    <div className="container mx-auto lg:max-w-7xl md:max-w-4xl max-w-[340px] min-h-[100vh]">
      <Header></Header>
      <Content></Content>
    </div>
  );
}

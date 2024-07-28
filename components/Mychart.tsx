"use client";
import React from "react";
import "chart.js/auto";
import { Chart } from "react-chartjs-2";
import useStore from "@/lib/zustand/usestore";
import { useBearStore } from "@/lib/zustand/store";

export default function Mychart() {
  const chart = useStore(useBearStore, (state: any) => state.chart);

  const options = {
    plugins: {
      legend: {
        labels: {
          color: "#fff",
        },
      },
    },
    scales: {},
  };
  const data = {
    labels: chart?.map((item: any) => item.type),
    color: "#fff",

    datasets: [
      {
        label: "overview of costs",
        data: chart?.map((item: any) => item.amount),
        backgroundColor: ["#6EACDA", "#FFDE4D", "#FF0000"],
        hoverOffset: 4,

        rotation: 720,
        borderWidth: 2,

        color: "#fff",
        borderColor: "#fff",
      },
    ],
  };
  return (
    <div className=" h-auto mx-auto">
      <Chart type="pie" options={options} data={data}></Chart>;
    </div>
  );
}

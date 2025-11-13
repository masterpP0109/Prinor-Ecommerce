"use client";

import React from "react";
import ApexCharts from "react-apexcharts";

const ChartTwo = ({ role }: { role: 'admin' | 'seller' | 'buyer' }) => {
  const options = {
    chart: {
      type: "bar" as const,
      height: 350,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        endingShape: "rounded",
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: ["Product A", "Product B", "Product C", "Product D"],
    },
    yaxis: {
      title: {
        text: "Sales",
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: (val: any) => `${val} units`,
      },
    },
  };

  const series = [
    {
      name: "Sales",
      data: role === "admin" ? [30, 40, 45, 50] : role === "seller" ? [20, 30, 35, 40] : [10, 20, 25, 30],
    },
    {
      name: "Revenue",
      data: role === "admin" ? [300, 400, 450, 500] : role === "seller" ? [200, 300, 350, 400] : [100, 200, 250, 300],
    },
  ];

  return (
    <div>
      <ApexCharts options={options} series={series} type="bar" height={350} />
    </div>
  );
};

export default ChartTwo;
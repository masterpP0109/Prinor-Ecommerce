"use client";

import React from "react";
import ApexCharts from "react-apexcharts";

const ChartFour = ({ role }: { role: 'admin' | 'seller' | 'buyer' }) => {
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
      categories: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    },
    yaxis: {
      title: {
        text: "Visitors",
      },
    },
    fill: {
      opacity: 1,
    },
    title: {
      text: role === "admin" ? "Visitor Analytics (Admin View)" : "Visitor Analytics",
      align: "center" as const,
    },
  };

  const series = [
    {
      name: "Visitors",
      data: [30, 40, 45, 50, 49, 60, 70],
    },
  ];

  return (
    <div>
      <ApexCharts options={options} series={series} type="bar" height={350} />
    </div>
  );
};

export default ChartFour;
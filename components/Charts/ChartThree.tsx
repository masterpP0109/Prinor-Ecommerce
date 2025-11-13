"use client";

import React from "react";
import ReactApexChart from "react-apexcharts";

const ChartThree = ({ role }: { role: 'admin' | 'seller' | 'buyer' }) => {
  const chartOptions = {
    chart: {
      type: "donut" as const,
    },
    labels: ["Remote", "Hybrid", "Onsite", "Leave"],
    colors: ["#3B82F6", "#9333EA", "#FBBF24", "#EF4444"],
    dataLabels: {
      enabled: true,
    },
    legend: {
      position: "bottom" as const,
    },
  };

  const chartData = role === "admin" ? [44, 55, 41, 37] : role === "seller" ? [30, 40, 20, 10] : [10, 20, 30, 40];

  return (
    <div className="chart-container">
      <h4 className="text-title-md font-bold text-black dark:text-white">Visitor Analytics</h4>
      <ReactApexChart options={chartOptions} series={chartData} type="donut" height={350} />
    </div>
  );
};

export default ChartThree;
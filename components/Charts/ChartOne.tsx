"use client";

import React from "react";
import dynamic from "next/dynamic";
import { useAuth } from "../../hooks/useAuth";
import { Chart as ChartJS, registerables } from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(...registerables);

const ChartOne = () => {
  const { user } = useAuth();

  if (!user) return null;

  const data = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Revenue",
        data: user.role === "admin" ? [65, 59, 80, 81, 56, 55, 40] : [28, 48, 40, 19, 86, 27, 90],
        fill: true,
        backgroundColor: "rgba(59,130,246,0.4)",
        borderColor: "rgba(59,130,246,1)",
      },
      {
        label: "Sales",
        data: user.role === "seller" ? [45, 39, 60, 71, 46, 45, 30] : [18, 28, 20, 9, 76, 17, 80],
        fill: true,
        backgroundColor: "rgba(147,51,234,0.4)",
        borderColor: "rgba(147,51,234,1)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Revenue and Sales Data",
      },
    },
  };

  return (
    <div className="chart-container">
      <Line data={data} options={options} />
    </div>
  );
};

export default ChartOne;
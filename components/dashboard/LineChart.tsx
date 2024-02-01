"use client";

import { DashboardChartType } from "@/types/transactions";
import { Line } from "react-chartjs-2";

interface LinearChartProps {
  chartData: DashboardChartType;
  title: string;
}

export default function LinearChart({ chartData, title }: LinearChartProps) {
  const chartOptions = {
    scales: {
      x: {
        ticks: {
          color: "white",
        },
      },
      y: {
        ticks: {
          color: "white",
        },
      },
    },
  };

  return (
    <div className="bg-card-color rounded-[8px] h-full w-full p-2">
      <h3 className="text-lg font-bold text-gray-200 mb-4">{title}</h3>
      <div className="h-[250px] w-full">
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
}

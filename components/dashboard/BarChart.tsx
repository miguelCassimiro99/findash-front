"use client";

import { DashboardChartType } from "@/types/transactions";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Tooltip,
  PointElement,
  LineElement,
  BarElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  BarElement
);

interface BarChartProps {
  chartData: DashboardChartType;
  title: string;
}

export default function BarChart({ chartData, title }: BarChartProps) {
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
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  );
}

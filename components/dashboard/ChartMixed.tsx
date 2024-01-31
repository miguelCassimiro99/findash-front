"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Tooltip,
  PointElement,
  LineElement,
} from "chart.js";
import { Line } from "react-chartjs-2";

interface MixedChartsProps {
  height: number;
  title: string;
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip
);

const ChartMixed = ({ height = 300, title }: MixedChartsProps) => {
  const chartData = {
    labels: [
      "2023-01",
      "2023-02",
      "2023-03",
      "2023-04",
      "2023-05",
      "2023-06",
      "2023-07",
    ],
    datasets: [
      {
        data: [100, 120, 115, 134, 168, 132, 200],
        backgroundColor: "#ffae7e",
        borderColor: "white",
      },
    ],
  };

  const charOptions = {
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
        <Line data={chartData} options={charOptions} />
      </div>
    </div>
  );
};

export default ChartMixed;

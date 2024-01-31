"use client";

import dynamic from "next/dynamic";
const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface MixedChartsProps {
  height: number;
  title: string;
  description?: string;
}

export default function MixedCharts({ height = 300, title }: MixedChartsProps) {
  const option = {
    chart: {
      id: "apexchart-example",
    },
    xaxis: {
      categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
    },
  };

  const series = [
    {
      name: "series-1",
      data: [30, 40, 35, 50, 49, 60, 70, 91, 125],
    },
  ];

  return (
    <div className="bg-card-color rounded-[8px] h-full w-full p-2">
      <h3 className="text-lg text-gray-200">{title}</h3>
      <ApexChart type="line" options={option} series={series} height={height} />
    </div>
  );
}

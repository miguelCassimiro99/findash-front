import Card from "@/components/dashboard/Card";
import ChartMixed from "@/components/dashboard/ChartMixed";
import TransactionsTable from "@/components/dashboard/TransactionsTable";
import ValueDescription from "@/components/dashboard/ValueDescription";
import { Suspense } from "react";

async function getData(accessToken: string): Promise<string | undefined> {
  try {
    const response = await fetch("http://localhost:3000/dasboard", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    });

    if (!response.ok) throw new Error("Could not get dashboard data");
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error", error);
  }
}

const examplesCards = [
  {
    isMonetary: true,
    countValue: 89900,
    description: "MRR this mount",
  },
  {
    isMonetary: false,
    countValue: 4581,
    description: "MRR today",
  },
  {
    isMonetary: true,
    countValue: 89900,
    description: "MRR yesterday",
  },
];

const lastColumnExample = [
  {
    isMonetary: true,
    countValue: 984600,
    description: "Total MRR",
  },
  {
    isMonetary: false,
    countValue: 4581,
    description: "Paying customers",
  },
  {
    isMonetary: false,
    countValue: 89900,
    description: "Mensal plan customers",
  },
  {
    isMonetary: true,
    countValue: 89900,
    description: "Annual plan customers",
  },
  {
    isMonetary: false,
    countValue: 89900,
    description: "Total users",
  },
];

export default async function Page() {
  return (
    <section className="dashboard-section w-full h-full flex flex-col lg:overflow-hidden lg:flex-row gap-2">
      <div className="column-quarter flex flex-col h-full w-full gap-2 lg:w-3/4 xl:flex-1">
        <div className="row gap-2 flex flex-col md:flex-row">
          <div className="col-monthly flex flex-row overflow-x-auto w-full md:flex-col md:w-1/3 gap-2 h-fit">
            {examplesCards.map((item, index) => (
              <Card key={index}>
                <ValueDescription {...item} />
              </Card>
            ))}
          </div>
          <div className="mrr-graph flex w-full h-[316px]">
            <Suspense>
              <ChartMixed height={250} title="Transactions" />
            </Suspense>
          </div>
        </div>

        <div className="row flex-1 flex flex-col md:flex-row gap-2 h-[400px]">
          <TransactionsTable />

          <div className="mrr-graph flex w-full md:w-1/2 h-[400px]">
            <Suspense>
              <ChartMixed height={300} title="Deposits" />
            </Suspense>
          </div>
        </div>
      </div>

      <div className="column-total mb-20 md:mb-0 w-full gap-4 lg:w-1/4 xl:w-fit h-fit rounded-[8px] bg-[#272953] p-2 flex flex-wrap justify-between lg:gap-4 lg:flex-col">
        {lastColumnExample.map((item, index) => (
          <div key={index}>
            <ValueDescription {...item} />
          </div>
        ))}
      </div>
    </section>
  );
}

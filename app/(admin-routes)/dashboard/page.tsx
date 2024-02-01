import Card from "@/components/dashboard/Card";
import TransactionsTable from "@/components/dashboard/TransactionsTable";
import ValueDescription from "@/components/dashboard/ValueDescription";
import { Suspense } from "react";
import { generateDashboardData } from "../../../actions/transactions";

import BarChart from "@/components/dashboard/BarChart";
import LinearChart from "@/components/dashboard/LineChart";
import TransactionsFilters from "@/components/ui/Modal/TransactionsFilters";
import { promises as fs } from "fs";
import {
  DashboardResponseType,
  ITransaction,
} from "../../../types/transactions";

interface PageProps {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}

async function getData(
  data: ITransaction[],
  params: { [key: string]: string | string[] | undefined } | undefined
): Promise<DashboardResponseType | null> {
  try {
    return await generateDashboardData(data, params);
  } catch (error) {
    console.log("Error getting Dashboard data: ", error);
    return null;
  }
}

export default async function Page({ params, searchParams }: PageProps) {
  const file = await fs.readFile(
    process.cwd() + "/app/transactions.json",
    "utf-8"
  );

  const data = (await JSON.parse(file)) as ITransaction[];

  if (!searchParams) searchParams = undefined;
  const dashboardData = await getData(data, searchParams);

  return (
    <>
      <section className="dashboard-section w-full h-full flex flex-col lg:overflow-hidden lg:flex-row gap-2">
        <div className="column-quarter flex flex-col h-full w-full gap-2 lg:w-3/4 xl:flex-1">
          <div className="row gap-2 flex flex-col md:flex-row">
            <div className="col-monthly flex flex-row overflow-x-auto w-full md:flex-col md:w-1/3 gap-2 h-fit">
              {!dashboardData?.balance && (
                <Card>
                  <div
                    role="status"
                    className="max-w-sm animated-pulse duration-200"
                  >
                    <div className="h-2.5 bg-gray-100 rounded-full animate-pulse w-20 mb-4"></div>
                    <div className="h-2 bg-gray-100 rounded-full animate-pulse w-48 mb-1"></div>
                  </div>
                </Card>
              )}
              {dashboardData?.balance.map((item, index) => (
                <Card key={index}>
                  <ValueDescription {...item} />
                </Card>
              ))}
            </div>
            <div className="mrr-graph flex w-full h-[316px]">
              {dashboardData?.linearChartData && (
                <Suspense>
                  <LinearChart
                    title="Transactions"
                    chartData={dashboardData.linearChartData}
                  />
                </Suspense>
              )}
            </div>
          </div>

          <div className="row flex-1 flex flex-col md:flex-row gap-2 h-[400px]">
            <TransactionsTable
              lastTransactions={dashboardData?.lastTransactions}
            />

            <div className="mrr-graph flex w-full md:w-1/2 h-[400px]">
              <Suspense>
                {dashboardData?.barChartData && (
                  <BarChart
                    chartData={dashboardData.barChartData}
                    title="Deposits"
                  />
                )}
              </Suspense>
            </div>
          </div>
        </div>

        <div className="column-total mb-20 md:mb-0 w-full gap-4 lg:w-1/4 xl:w-fit h-fit rounded-[8px] bg-[#272953] p-2 flex flex-wrap justify-between lg:gap-4 lg:flex-col">
          {!dashboardData?.totalNumbers ||
            (!dashboardData.totalNumbers.length && (
              <>
                <div
                  role="status"
                  className="max-w-sm animated-pulse duration-200"
                >
                  <div className="h-2.5 bg-gray-100 rounded-full animate-pulse w-20 mb-4"></div>
                  <div className="h-2 bg-gray-100 rounded-full animate-pulse w-48 mb-1"></div>
                </div>

                <div
                  role="status"
                  className="max-w-sm animated-pulse duration-200"
                >
                  <div className="h-2.5 bg-gray-100 rounded-full animate-pulse w-20 mb-4"></div>
                  <div className="h-2 bg-gray-100 rounded-full animate-pulse w-48 mb-1"></div>
                </div>

                <div
                  role="status"
                  className="max-w-sm animated-pulse duration-200"
                >
                  <div className="h-2.5 bg-gray-100 rounded-full animate-pulse w-20 mb-4"></div>
                  <div className="h-2 bg-gray-100 rounded-full animate-pulse w-48 mb-1"></div>
                </div>

                <div
                  role="status"
                  className="max-w-sm animated-pulse duration-200"
                >
                  <div className="h-2.5 bg-gray-100 rounded-full animate-pulse w-20 mb-4"></div>
                  <div className="h-2 bg-gray-100 rounded-full animate-pulse w-48 mb-1"></div>
                </div>
              </>
            ))}

          {dashboardData?.totalNumbers && dashboardData.totalNumbers.length && (
            <>
              {dashboardData.totalNumbers.map((item, index) => (
                <div key={index}>
                  <ValueDescription {...item} />
                </div>
              ))}
            </>
          )}
        </div>
      </section>
      {dashboardData?.transactionsFilters && (
        <Suspense>
          <TransactionsFilters
            filterOptionsList={dashboardData.transactionsFilters}
          />
        </Suspense>
      )}
    </>
  );
}

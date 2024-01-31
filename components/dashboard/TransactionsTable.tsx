import { ITransaction } from "@/types/transactions";
import {
  ArrowDownCircleIcon,
  ArrowUpCircleIcon,
} from "@heroicons/react/24/outline";

const exampleTable = [
  {
    date: 1682698259192,
    amount: "5565",
    transaction_type: "deposit",
    currency: "brl",
    account: "Baker Hughes",
    industry: "Oil and Gas Equipment",
    state: "TX",
  },
  {
    date: 1673216606378,
    amount: "3716",
    transaction_type: "deposit",
    currency: "brl",
    account: "General Mills",
    industry: "Food Consumer Products",
    state: "MN",
  },
  {
    date: 1671293734303,
    amount: "1480",
    transaction_type: "withdraw",
    currency: "brl",
    account: "Wynn Resorts",
    industry: "Hotels",
    state: "NV",
  },
  {
    date: 1661438596457,
    amount: "6894",
    transaction_type: "deposit",
    currency: "brl",
    account: "Hyatt Hotels",
    industry: "Hotels",
    state: "IL",
  },
  {
    date: 1671305218364,
    amount: "4390",
    transaction_type: "deposit",
    currency: "brl",
    account: "Fossil Group",
    industry: "Apparel",
    state: "TX",
  },
  {
    date: 1669009703807,
    amount: "761",
    transaction_type: "withdraw",
    currency: "brl",
    account: "Wyndham Worldwide",
    industry: "Hotels",
    state: "NJ",
  },
];

interface TransactionsTableProps {
  lastTransactions?: ITransaction[];
}

export default function TransactionsTable({
  lastTransactions,
}: TransactionsTableProps) {
  const columns = [
    "Status",
    "Industry",
    "Amount",
    "currency",
    "Type",
    "State",
    "Date",
  ];

  function formateDateTime(date: number): string {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    };

    return new Date(date).toLocaleDateString("en-US", options);
  }

  function formateAmountValue(value: string): number {
    return parseFloat(value) / 100;
  }

  return (
    <div className="flex-1 h-[400px] flex flex-col items-start justify-start gap-4 rounded-[8px] bg-[#272953] p-2 overflow-x-auto">
      <h3 className="text-lg text-gray-200">Recent transactions</h3>

      <div className="relative overflow-auto w-full">
        {!lastTransactions?.length && (
          <div role="status" className="max-w-sm animate-pulse">
            <div className="h-2.5 bg-gray-200 rounded-full  w-48 mb-4"></div>
            <div className="h-2 bg-gray-200 rounded-full max-w-[360px] mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full max-w-[330px] mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full max-w-[300px] mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full max-w-[360px]"></div>
            <span className="sr-only">Loading...</span>
          </div>
        )}

        {lastTransactions && lastTransactions?.length > 0 && (
          <table className="w-full text-sm text-left rtl:text-right text-gray-100">
            <thead className="text-xs text-gray-400 uppercase bg-gray-50">
              <tr>
                {columns.map((col, index) => (
                  <th
                    key={index}
                    scope="col"
                    className="px-1 py-0 md:py-2 md:px-2 font-medium"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {lastTransactions.map((item, index) => (
                <tr key={index} className="border-b border-gray-400">
                  <td className="mrr-table-td">
                    <span className="flex justify-center items-center">
                      {item.transaction_type === "deposit" && (
                        <ArrowDownCircleIcon className="w-6 h-6 text-green-700" />
                      )}

                      {item.transaction_type === "withdraw" && (
                        <ArrowUpCircleIcon className="w-6 h-6 text-red-700" />
                      )}
                    </span>
                  </td>
                  <td className="mrr-table-td">{item.industry}</td>
                  <td className="mrr-table-td">
                    {formateAmountValue(item.amount)}
                  </td>
                  <td className="mrr-table-td">R$ {item.currency}</td>
                  <td className="mrr-table-td">{item.transaction_type}</td>
                  <td className="mrr-table-td">{item.state}</td>
                  <td className="mrr-table-td">{formateDateTime(item.date)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

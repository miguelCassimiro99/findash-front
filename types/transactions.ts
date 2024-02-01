export interface ITransaction {
  date: number;
  amount: string;
  transaction_type: "withdraw" | "deposit";
  currency: string;
  account: string;
  industry: string;
  state: string;
}

export type DashboardCardType = {
  isMonetary: boolean;
  countValue: number;
  description: string;
};

export type DashboardChartType = {
  labels: string[];
  datasets: any;
};

export type DashboardResponseType = {
  balance: DashboardCardType[];
  lastTransactions: ITransaction[];
  totalNumbers: DashboardCardType[];
  linearChartData: DashboardChartType;
  barChartData: DashboardChartType;
};

export type FilterTransactionsType = {
  startDate?: Date;
  endDate?: Date;
  accounts?: string[];
  industries?: string[];
  states?: string[];
};

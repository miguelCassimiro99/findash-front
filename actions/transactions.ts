"use server";

import {
  DashboardCardType,
  DashboardResponseType,
  FilterTransactionsType,
  ITransaction,
} from "../types/transactions";

function filterTransactions(
  transactionsList: ITransaction[],
  params: FilterTransactionsType
): ITransaction[] {
  const {
    startDate = 0,
    endDate = Infinity,
    accounts = [],
    industries = [],
    states = [],
  } = params || {};

  const filteredTransactions = transactionsList.filter((transaction) => {
    const transactionDate = new Date(transaction.date * 1000);

    return (
      transactionDate >= startDate &&
      transactionDate <= endDate &&
      (accounts.length === 0 || accounts.includes(transaction.account)) &&
      (industries.length === 0 || industries.includes(transaction.industry)) &&
      (states.length === 0 || states.includes(transaction.state))
    );
  });

  filteredTransactions.sort((a, b) => a.date - b.date);

  return filteredTransactions;
}

export const generateDashboardData = async (
  //? This Functions starts with the filter
  //? The filter is Typed and must have none setted
  //? First we filter all list of transactions with the conditions
  //? So, each function receives the filtered list to not have to proccess
  //? To many data

  transactionsList: ITransaction[],
  params?: FilterTransactionsType
): Promise<DashboardResponseType | null> => {
  try {
    if (!params) params = {};
    const filteredTransactions = filterTransactions(transactionsList, params);

    const balance = calculateBalance(filteredTransactions);
    const lastTransactions = getLastTransactions(filteredTransactions);
    const totalNumbers = calculateTotalNumbers(filteredTransactions);
    const linearChartData = generateLinearChart(filteredTransactions);
    const barChartData = generateBarChart(filteredTransactions);

    return {
      balance,
      lastTransactions,
      totalNumbers,
      linearChartData,
      barChartData,
    };
  } catch (error) {
    console.log("Error: ", error);
    return null;
  }
};

function calculateBalance(transactions: ITransaction[]): DashboardCardType[] {
  let balance = 0;
  let deposits = 0;
  let withdrawals = 0;

  for (const transaction of transactions) {
    const transactionAmount = parseFloat(transaction.amount) / 100;

    balance += transactionAmount;
    if (transaction.transaction_type === "deposit")
      deposits += transactionAmount;
    if (transaction.transaction_type === "withdraw")
      withdrawals += transactionAmount;
  }

  return [
    {
      isMonetary: true,
      countValue: balance,
      description: "Total Transactions",
    },
    {
      isMonetary: true,
      countValue: deposits,
      description: "Deposits",
    },
    {
      isMonetary: true,
      countValue: withdrawals,
      description: "Withdraws",
    },
  ];
}

function getLastTransactions(transactions: ITransaction[]) {
  transactions.sort((a, b) => b.date - a.date);

  return transactions.slice(0, 6);
}

function calculateTotalNumbers(
  transactions: ITransaction[]
): DashboardCardType[] {
  let totalDeposits = 0;
  let totalStates = 0;
  let biggestDeposit = 0;
  let biggestWithDraw = 0;

  const uniqueStates: Set<string> = new Set();

  transactions.forEach((item) => {
    uniqueStates.add(item.state);

    const amount = parseFloat(item.amount) / 100;

    if (item.transaction_type === "withdraw" && amount > biggestWithDraw)
      biggestWithDraw = amount;

    if (item.transaction_type === "deposit") {
      totalDeposits += 1;
      if (amount > biggestDeposit) biggestDeposit = amount;
    }
  });

  return [
    {
      isMonetary: false,
      countValue: totalDeposits,
      description: "Total Deposits",
    },
    {
      isMonetary: true,
      countValue: biggestDeposit,
      description: "Biggest Deposit",
    },
    {
      isMonetary: true,
      countValue: biggestWithDraw,
      description: "Biggest WithDraw",
    },
    {
      isMonetary: false,
      countValue: uniqueStates.size,
      description: "States",
    },
  ];
}

function generateLinearChart(transactions: ITransaction[]) {
  const labels: string[] = [];
  const amounts: number[] = [];

  transactions.sort((a, b) => a.date - b.date);

  transactions.forEach((item) => {
    const date = new Date(item.date).toLocaleDateString();
    labels.push(date);
    amounts.push(parseFloat(item.amount) / 100);
  });

  return {
    labels,
    datasets: [
      {
        label: "Transactions Value",
        data: amounts,
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };
}

function generateBarChart(transactions: ITransaction[]) {
  const data: any = {};

  transactions.forEach((item) => {
    const industry = item.industry;
    if (data[industry]) return data[industry]++;
    data[industry] = 1;
  });

  const labels = Object.keys(data);
  const values = Object.values(data);

  return {
    labels,
    datasets: [
      {
        label: "Transactions count by Industry",
        data: values,
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };
}

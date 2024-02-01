"use server";

import {
  DashboardCardType,
  DashboardResponseType,
  FilterTransactionsType,
  ITransaction,
} from "../types/transactions";

function filterTransactions(
  transactionsList: ITransaction[],
  params: FilterTransactionsType,
  firsDate: Date,
  lastDate: Date
): ITransaction[] {
  const {
    startDate = 0,
    endDate = Infinity,
    accounts = [],
    industries = [],
    states = [],
  } = params || {};

  let startDateTime = firsDate.getTime();
  let endDateTime = lastDate.getTime();

  if (params.startDate) {
    const dateObj = new Date(params.startDate);
    dateObj.setHours(0, 0, 0, 0);
    startDateTime = dateObj.getTime();
  }

  if (params.endDate) {
    const dateObj = new Date(params.endDate);
    dateObj.setHours(23, 59, 59, 999);
    endDateTime = dateObj.getTime();
  }

  const filteredTransactions = transactionsList.filter((transaction) => {
    const transactionDate = new Date(transaction.date);

    return (
      transaction.date >= startDateTime &&
      transaction.date <= endDateTime &&
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
    const transactionsFilters = getFilters(transactionsList);
    const filteredTransactions = filterTransactions(
      transactionsList,
      params,
      transactionsFilters.firstDate,
      transactionsFilters.lastDate
    );

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
      transactionsFilters,
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

function getFilters(transactions: ITransaction[]) {
  const accounts: Set<string> = new Set();
  const industries: Set<string> = new Set();
  const states: Set<string> = new Set();

  transactions.sort((a, b) => a.date - b.date);

  const firstDate = new Date(transactions[0].date);
  const lastDate = new Date(transactions[transactions.length - 1].date);

  transactions.forEach((item) => {
    accounts.add(item.account);
    industries.add(item.industry);
    states.add(item.state);
  });

  return {
    accounts: Array.from(accounts),
    industries: Array.from(industries),
    states: Array.from(states),
    firstDate,
    lastDate,
  };
}

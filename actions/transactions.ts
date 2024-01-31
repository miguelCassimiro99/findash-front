"use server";

import {
  DashboardCardType,
  DashboardResponseType,
  ITransaction,
} from "../types/transactions";

type FilterType = {
  startDate?: Date;
  endDate?: Date;
  accounts?: string[];
  industries?: string[];
  states?: string[];
};

function filterTransactions(
  transactionsList: ITransaction[],
  params: FilterType
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

  return filteredTransactions;
}

export const generateDashboardData = async (
  //? This Functions starts with the filter
  //? The filter is Typed and must have none setted
  //? First we filter all list of transactions with the conditions
  //? So, each function receives the filtered list to not have to proccess
  //? To many data

  transactionsList: ITransaction[],
  params?: FilterType
): Promise<DashboardResponseType | null> => {
  try {
    if (!params) params = {};
    const filteredTransactions = filterTransactions(transactionsList, params);

    const balance = calculateBalance(filteredTransactions);
    const lastTransactions = getLastTransactions(filteredTransactions);
    const totalNumbers = calculateTotalNumbers(filteredTransactions);

    return {
      balance,
      lastTransactions,
      totalNumbers,
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

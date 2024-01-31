"use server";

import transactionsData from "../mock/transactions.json";
import { ITransaction } from "../types/transactions";

export const fetchTransactions = (): ITransaction[] => {
  return transactionsData as ITransaction[];
};

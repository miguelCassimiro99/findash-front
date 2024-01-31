export interface ITransaction {
  date: number;
  amount: string;
  transaction_type: "withdraw" | "deposit";
  currency: string;
  account: string;
  industry: string;
  state: string;
}

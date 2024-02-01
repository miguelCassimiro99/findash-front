"use client";

import { create } from "zustand";
import { produce } from "immer";

//TODO: create the reset function

import { FilterTransactionsType } from "@/types/transactions";

interface IState {
  filteredTransactions: FilterTransactionsType;
  isFilterModalOpen: boolean;
}

interface IActions {
  setFilter: (filter: FilterTransactionsType) => void;
  setFilterModalOpen: (isOpen: boolean) => void;
}

interface IStore {
  state: IState;
  actions: IActions;
}

export const useStore = create<IStore>((set) => {
  const setState = (fn: any) => set(produce(fn) as (state: IStore) => IStore);

  return {
    state: {
      filteredTransactions: {},
      isFilterModalOpen: false,
    },
    actions: {
      setFilter: (filter: FilterTransactionsType) => {
        setState(({ state }: IStore) => {
          state.filteredTransactions = filter;
        });
      },
      setFilterModalOpen: (isOpen: boolean) => {
        setState(({ state }: IStore) => {
          state.isFilterModalOpen = isOpen;
        });
      },
    },
  };
});

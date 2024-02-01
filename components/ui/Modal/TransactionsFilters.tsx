"use client";

import { Dialog, Transition } from "@headlessui/react";
import { useStore } from "../../../store/transactions";
import { Fragment } from "react";
import TransactionsFilter, {
  OptionsType,
} from "../../Forms/TransactionsFilter/TransactionsFilter";
import { TransactionsFiltersList } from "@/types/transactions";

interface TransactionsFilterModalProps {
  filterOptionsList: TransactionsFiltersList;
}

export default function TransactionsFilters({
  filterOptionsList,
}: TransactionsFilterModalProps) {
  const { isFilterModalOpen } = useStore((store) => store.state);
  const { setFilterModalOpen } = useStore((store) => store.actions);

  let accountOptions: OptionsType[] = [];
  let industriesOptions: OptionsType[] = [];
  let statesOptions: OptionsType[] = [];

  function formatFiltersList(filterOptions: TransactionsFiltersList) {
    filterOptions.accounts.forEach((account: string) => {
      accountOptions.push({ label: account, value: account });
    });

    filterOptions.industries.forEach((industry: string) => {
      industriesOptions.push({ label: industry, value: industry });
    });

    filterOptions.states.forEach((state: string) => {
      statesOptions.push({ label: state, value: state });
    });
  }

  formatFiltersList(filterOptionsList);

  return (
    <Transition appear show={isFilterModalOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => setFilterModalOpen(false)}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all h-fit max-h-[70vh] md:max-h-[80vh] overflow-y-auto overflow-x-hidden">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Filter options
                </Dialog.Title>
                <div className="mt-2 overflow-y-auto">
                  <TransactionsFilter
                    firstDate={filterOptionsList.firstDate}
                    lastDate={filterOptionsList.lastDate}
                    accountOptions={accountOptions}
                    industriesOptions={industriesOptions}
                    statesOptions={statesOptions}
                  />
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

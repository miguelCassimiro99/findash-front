"use client";

import { Dialog, Transition } from "@headlessui/react";
import { useStore } from "../../../store/transactions";
import { Fragment } from "react";
import TransactionsFilter from "../../Forms/TransactionsFilter/TransactionsFilter";

export default function TransactionsFilters() {
  const { isFilterModalOpen } = useStore((store) => store.state);
  const { setFilterModalOpen } = useStore((store) => store.actions);

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
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all h-[80vh] lg:h-fit">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Filter options
                </Dialog.Title>
                <div className="mt-2">
                  <TransactionsFilter />
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

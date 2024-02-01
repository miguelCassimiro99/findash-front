"use client";

//TODO: get the maximum and min date from the list filtered

import { zodResolver } from "@hookform/resolvers/zod";
import { Datepicker } from "flowbite-react";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { MultiSelect } from "react-multi-select-component";
import {
  TransactionsFilterFormData,
  transactionsFilterSchema,
} from "../../../types/schema";
import { Form } from "../Composition/Index";
import { useStore } from "@/store/transactions";
import { usePathname, useRouter } from "next/navigation";

export type OptionsType = {
  label: string;
  value: string;
};

const options = [
  { label: "Option 1", value: "option1" },
  { label: "Option 2", value: "option2" },
] as OptionsType[];

interface TransactionsFilterFormProps {
  firstDate: Date;
  lastDate: Date;
  accountOptions: OptionsType[];
  industriesOptions: OptionsType[];
  statesOptions: OptionsType[];
}

export default function TransactionsFilter({
  firstDate,
  lastDate,
  accountOptions,
  industriesOptions,
  statesOptions,
}: TransactionsFilterFormProps) {
  const [startDate, setStartDate] = useState<Date | undefined>(firstDate);
  const [endDate, setEndtDate] = useState<Date | undefined>(lastDate);
  const [selectedIndustries, setSelectedIndustries] = useState<any[]>([]);
  const [selectedStates, setSelectedStates] = useState<any[]>([]);
  const [selectedAccounts, setSelectedAccounts] = useState<any[]>([]);

  const { setFilterModalOpen } = useStore((store) => store.actions);
  const router = useRouter();
  const pathname = usePathname();

  const transactionsFilterForm = useForm<TransactionsFilterFormData>({
    resolver: zodResolver(transactionsFilterSchema),
    mode: "all",
  });

  const { handleSubmit } = transactionsFilterForm;

  function applyFilter(data: any) {
    let accounts: string[] = [];
    if (selectedAccounts && selectedAccounts.length > 0) {
      selectedAccounts.forEach((account: { label: string; value: string }) => {
        accounts.push(account.value);
      });
    }

    let industries: string[] = [];
    if (selectedIndustries && selectedIndustries.length > 0) {
      selectedIndustries.forEach(
        (industry: { label: string; value: string }) => {
          industries.push(industry.value);
        }
      );
    }

    let states: string[] = [];
    if (selectedStates && selectedStates.length > 0) {
      selectedStates.forEach((state: { label: string; value: string }) => {
        states.push(state.value);
      });
    }

    if (startDate && (startDate > lastDate || startDate < firstDate))
      setStartDate(firstDate);
    if (endDate && (endDate > lastDate || endDate < firstDate))
      setEndtDate(lastDate);

    if (startDate && endDate) {
      if (startDate > endDate) {
        let biggerDate = startDate;
        setStartDate(endDate);
        setEndtDate(biggerDate);
      }
    }

    let queryString = `&accounts=${accounts}`;
    queryString += `&industries=${industries}`;
    queryString += `&states=${states}`;
    queryString += `&startDate=${startDate}`;
    queryString += `&endDate=${endDate}`;

    localStorage.setItem("queryStringLocal", queryString);

    setFilterModalOpen(false);
    router.push(`${pathname}?${queryString}`);
  }

  function getLastFilter() {
    const storedQuery = localStorage.getItem("queryStringLocal");
    if (!storedQuery) return;

    setFilterModalOpen(false);
    router.push(`${pathname}?${storedQuery}`);
  }

  function resetFilter() {
    setFilterModalOpen(false);
    router.push(`${pathname}`);
  }

  return (
    <FormProvider {...transactionsFilterForm}>
      <form
        onSubmit={handleSubmit(applyFilter)}
        className="flex flex-col justify-start items-start gap-2 max-w-sm"
      >
        <Form.Field className="w-full">
          <Form.Label htmlFor="start-date" autoFocus={false}>
            Start Date
          </Form.Label>
          <Datepicker
            defaultDate={firstDate}
            minDate={firstDate}
            maxDate={lastDate}
            name="start-date"
            autoFocus={false}
            onSelectedDateChanged={(date) => setStartDate(date)}
            onReset={() => setStartDate(undefined)}
          />
        </Form.Field>

        <Form.Field className="w-full">
          <Form.Label htmlFor="end-date">End Date</Form.Label>
          <Datepicker
            defaultDate={lastDate}
            minDate={firstDate}
            maxDate={lastDate}
            onSelectedDateChanged={(date) => setEndtDate(date)}
            onReset={() => setEndtDate(undefined)}
          />
        </Form.Field>

        <Form.Field className="w-full">
          <Form.Label htmlFor="end-date">Accounts</Form.Label>
          <MultiSelect
            options={accountOptions}
            value={selectedAccounts}
            onChange={setSelectedAccounts}
            labelledBy="Select Accounts"
          />
        </Form.Field>

        <Form.Field className="w-full">
          <Form.Label htmlFor="end-date">Industries</Form.Label>
          <MultiSelect
            options={industriesOptions}
            value={selectedIndustries}
            onChange={setSelectedIndustries}
            labelledBy="Select Industries"
          />
        </Form.Field>

        <Form.Field className="w-full">
          <Form.Label htmlFor="end-date">States</Form.Label>
          <MultiSelect
            options={statesOptions}
            value={selectedStates}
            onChange={setSelectedStates}
            labelledBy="Select States"
          />
        </Form.Field>

        <div className="flex justify-start items-center gap-2">
          <button
            className="inline-flex justify-start rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-dashboard-color hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 transition-all"
            type="submit"
          >
            Apply filter
          </button>

          <button
            className="inline-flex justify-start rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-dashboard-color hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            type="button"
            onClick={() => getLastFilter()}
          >
            Use previous
          </button>

          <button
            className="inline-flex justify-start rounded-md px-4 py-2 text-sm font-medium text-orange-700 hover:bg-orange-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 transition-all"
            type="button"
            onClick={() => resetFilter()}
          >
            Reset
          </button>
        </div>
      </form>
    </FormProvider>
  );
}

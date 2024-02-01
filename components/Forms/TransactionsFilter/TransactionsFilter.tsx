"use client";

//TODO: get the maximum and min date from the list filtered

const accountOptions = [
  { label: "Finance", value: "Finance" },
  { label: "Healthcare", value: "Healthcare" },
  { label: "Retail", value: "Retail" },
];

const industriesOptions = [
  { label: "Finance", value: "Finance" },
  { label: "Healthcare", value: "Healthcare" },
  { label: "Retail", value: "Retail" },
];

const stateOptions = [
  { label: "TX", value: "TX" },
  { label: "NV", value: "NV" },
  { label: "NJ", value: "NJ" },
  { label: "NY", value: "NY" },
];

import { FormProvider } from "react-hook-form";
import { useForm } from "react-hook-form";
import {
  TransactionsFilterFormData,
  transactionsFilterSchema,
} from "../../../types/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "../Composition/Index";
import { Datepicker } from "flowbite-react";
import { useState } from "react";
import { MultiSelect } from "react-multi-select-component";

export default function TransactionsFilter() {
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndtDate] = useState<Date | undefined>(undefined);
  const [selectedIndustries, setSelectedIndustries] = useState<any[]>([]);
  const [selectedStates, setSelectedStates] = useState<any[]>([]);
  const [selectedAccounts, setSelectedAccounts] = useState<any[]>([]);

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

    const selectedOptions = {
      startDate: startDate ? startDate : undefined,
      endDate: endDate ? endDate : undefined,
      accounts,
      industries,
      states,
    };

    console.log("Selected Options: ", selectedOptions);
  }

  return (
    <FormProvider {...transactionsFilterForm}>
      <form
        onSubmit={handleSubmit(applyFilter)}
        className="flex flex-col justify-start items-start gap-2 max-w-sm overflow-y-auto"
      >
        <Form.Field className="w-full">
          <Form.Label htmlFor="start-date" autoFocus={false}>
            Start Date
          </Form.Label>
          <Datepicker
            name="start-date"
            autoFocus={false}
            onSelectedDateChanged={(date) => setStartDate(date)}
            onReset={() => setStartDate(undefined)}
          />
        </Form.Field>

        <Form.Field className="w-full">
          <Form.Label htmlFor="end-date">End Date</Form.Label>
          <Datepicker
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
            options={stateOptions}
            value={selectedStates}
            onChange={setSelectedStates}
            labelledBy="Select States"
          />
        </Form.Field>

        <button
          className="inline-flex justify-start rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-dashboard-color hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          type="submit"
        >
          Apply filter
        </button>
      </form>
    </FormProvider>
  );
}

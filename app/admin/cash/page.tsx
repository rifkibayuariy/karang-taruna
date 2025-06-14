"use client";

import { useState } from "react";
import Breadcrumb from "@/components/admin/breadcrumb";
import Table from "@/components/admin/cash/table";
import {
  BanknotesIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  ExclamationCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  ArrowUpCircleIcon,
  ArrowDownCircleIcon,
  BanknotesIcon as BanknotesIconSolid,
} from "@heroicons/react/24/solid";

export default function Cash() {
  const [showModal, setShowModal] = useState(false);

  return (
    <main className="md:pt-8 pb-12">
      <div className="w-full pb-6 md:pb-10">
        <h1 className="hidden md:block text-xl md:text-2xl font-bold mb-3">
          Cash
        </h1>
        <Breadcrumb />
      </div>
      <h2 className="pb-3">
        <ExclamationCircleIcon className="size-6 inline-block mr-3" />
        Recap this month
      </h2>
      <div className="text-sm grid grid-cols-2 md:grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-4">
        {[
          {
            label: "Income",
            value: "500.000",
            Icon: ArrowUpCircleIcon,
            iconColor: "text-green-500",
          },
          {
            label: "Expense",
            value: "100.000",
            Icon: ArrowDownCircleIcon,
            iconColor: "text-red-500",
          },
          { label: "Net Income", value: "400.000", isDoubleIcon: true },
          {
            label: "Balance",
            value: "5.200.000",
            isDark: true,
            Icon: BanknotesIconSolid,
          },
        ].map((box, i) => (
          <div
            key={i}
            className={`p-5 shadow-sm rounded-xl ${
              box.isDark ? "bg-gray-800 text-white" : "bg-white"
            }`}
          >
            <div className="relative">
              <span className="block">{box.label}</span>
              <div className="pt-3 font-bold">
                <span className="text-sm">Rp. </span>
                <span className="md:text-xl">{box.value}</span>
              </div>
              <div className="absolute right-0 top-0 md:top-1/2 md:-translate-y-1/2">
                {!box.isDoubleIcon ? (
                  <>
                    <BanknotesIcon className="size-6 md:size-10" />
                    {box.Icon && (
                      <span className="absolute bottom-0 right-0 p-0.5 rounded-full bg-white">
                        <box.Icon
                          className={`size-3 md:size-5 ${box.iconColor || ""}`}
                        />
                      </span>
                    )}
                  </>
                ) : (
                  <div className="flex">
                    <ArrowUpIcon className="size-3 md:size-5 text-green-500" />
                    <ArrowDownIcon className="size-3 md:size-5 -ml-1 text-red-500" />
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-row gap-2 w-full">
        <div className="flex flex-auto md:items-center">
          <button
            onClick={() => setShowModal(true)}
            className="px-3 py-2 bg-gray-800 rounded-xl text-white text-sm flex items-center justify-center gap-2 cursor-pointer"
          >
            <PlusIcon className="size-4" />
            <span className="font-semibold">
              New <span className="hidden lg:inline-block">Transaction</span>
            </span>
          </button>
        </div>
        <div className="w-full md:w-100 flex justify-end">
          <div className="relative w-full">
            <input
              className="block peer z-0 h-full w-full rounded-xl py-3 pl-12 text-sm bg-white shadow-sm placeholder:text-gray-500 focus:outline-none"
              placeholder="Search"
            />
            <MagnifyingGlassIcon className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
          </div>
        </div>
      </div>

      <div className="pt-4 md:pt-6">
        <Table />
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
            <h2 className="text-lg font-bold mb-4">Add New Transaction</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Amount
                </label>
                <input
                  type="number"
                  placeholder="Rp"
                  className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 text-sm focus:ring-gray-800 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Type
                </label>
                <select className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 text-sm focus:ring-gray-800 focus:outline-none">
                  <option value="income">Income</option>
                  <option value="expense">Expense</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-gray-800 text-white font-semibold rounded-xl hover:bg-gray-900"
              >
                Save Transaction
              </button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}

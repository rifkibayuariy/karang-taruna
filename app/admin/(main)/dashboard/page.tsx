import { CircleDollarSign, ArrowUp, ArrowDown } from "lucide-react";
import { BanknotesIcon } from "@heroicons/react/24/outline";
import { BanknotesIcon as BanknotesIconSolid } from "@heroicons/react/24/solid";
import Breadcrumb from "@/components/admin/ui/breadcrumb";
import { CashflowChart } from "@/components/admin/dashboard/cashflow-chart";

export default function Dashboard() {
  return (
    <main className="md:pt-8 pb-12">
      <h1 className="hidden md:block text-xl text-nowrap md:text-2xl font-bold text-techtona-1">
        Dashboard
      </h1>
      <div className="pb-6 md:pt-3">
        <Breadcrumb />
      </div>
      <div className="text-xs sm:text-sm grid grid-cols-2 md:grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-4">
        <div className="p-4 sm:p-5 border border-zinc-200 bg-white/50 backdrop-filter backdrop-blur-lg rounded-xl">
          <div className="relative text-techtona-1">
            <div className="flex gap-2 items-center">
              <CircleDollarSign className="p-1 bg-techtona-3 rounded-full" />
              <span className="font-semibold">Income</span>
            </div>
            <div className="pt-3 font-extrabold">
              <span className="text-sm">Rp. </span>
              <span className="md:text-xl">2.400.000</span>
            </div>
            <div className="absolute right-0 top-0 md:top-1/2 md:-translate-y-1/2">
              <BanknotesIcon className="size-6 sm:size-7 md:size-10" />
              <span className="absolute bottom-0 right-0">
                <ArrowUp className="size-3.5 sm:size-4 md:size-6 bg-techtona-2 text-techtona-1 rounded-full p-0.75" />
              </span>
            </div>
          </div>
        </div>
        <div className="p-4 sm:p-5 border border-zinc-200 bg-white/50 backdrop-filter backdrop-blur-lg rounded-xl">
          <div className="relative text-techtona-1">
            <div className="flex gap-2 items-center">
              <CircleDollarSign className="p-1 bg-techtona-3 rounded-full" />
              <span className="font-semibold">Expense</span>
            </div>
            <div className="pt-3 font-extrabold">
              <span className="text-sm">Rp. </span>
              <span className="md:text-xl">1.500.000</span>
            </div>
            <div className="absolute right-0 top-0 md:top-1/2 md:-translate-y-1/2">
              <BanknotesIcon className="size-6 sm:size-7 md:size-10" />
              <span className="absolute bottom-0 right-0">
                <ArrowDown className="size-3.5 sm:size-4 md:size-6 bg-red-400 text-white rounded-full p-0.75" />
              </span>
            </div>
          </div>
        </div>
        <div className="p-4 sm:p-5 border border-zinc-200 bg-white/50 backdrop-filter backdrop-blur-lg rounded-xl">
          <div className="relative text-techtona-1">
            <div className="flex gap-2 items-center">
              <CircleDollarSign className="p-1 bg-techtona-3 rounded-full" />
              <span className="font-semibold">
                Net<span className="hidden md:inline-block ml-1">Income</span>
              </span>
            </div>
            <div className="pt-3 font-extrabold">
              <span className="text-sm">Rp. </span>
              <span className="md:text-xl">900.000</span>
            </div>
            <div className="absolute right-0 top-0 md:top-1/2 md:-translate-y-1/2 h-6 sm:h-fit">
              <div className="flex h-full sm:h-fit items-center gap-0.5">
                <ArrowUp className="size-4 sm:size-5 md:size-6 text-techtona-1 bg-techtona-2 rounded-full p-1" />
                <ArrowDown className="size-4 sm:size-5 md:size-6 text-white bg-red-400 rounded-full p-1" />
              </div>
            </div>
          </div>
        </div>
        <div className="p-4 sm:p-5 border border-zinc-200 bg-white/50 backdrop-filter backdrop-blur-lg rounded-xl">
          <div className="relative text-techtona-1">
            <div className="flex gap-2 items-center">
              <CircleDollarSign className="p-1 bg-techtona-3 rounded-full" />
              <span className="font-semibold">Balance</span>
            </div>
            <div className="pt-3 font-extrabold">
              <span className="text-sm">Rp. </span>
              <span className="md:text-xl">5.200.000</span>
            </div>
            <div className="absolute right-0 top-0 md:top-1/2 md:-translate-y-1/2">
              <BanknotesIconSolid className="size-6 sm:size-7 md:size-10 p-1 md:p-2 rounded-full bg-techtona-2" />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8 text-sm font-semibold grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 2xl:grid-cols-2 gap-4">
        <div className="p-5 border border-zinc-200 bg-white/50 backdrop-filter backdrop-blur-lg rounded-xl">
          <div className="flex justify-between mb-7">
            <span className="block text-techtona-1 font-bold text-lg">
              Cashflow
            </span>
            <div className="flex gap-3 md:gap-5">
              <div className="flex items-center gap-1 md:gap-1.5">
                <div className="h-3 md:h-4 w-3 md:w-4 rounded bg-techtona-2"></div>
                <span className="text-xs text-techtona-1">Income</span>
              </div>
              <div className="flex items-center gap-1 md:gap-1.5">
                <div className="h-3 md:h-4 w-3 md:w-4 rounded bg-techtona-1"></div>
                <span className="text-xs text-techtona-1">Expense</span>
              </div>
            </div>
          </div>
          <CashflowChart />
        </div>
      </div>
    </main>
  );
}

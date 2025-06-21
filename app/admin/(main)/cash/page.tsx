import Breadcrumb from "@/components/admin/ui/breadcrumb";
import { BanknotesIcon } from "@heroicons/react/24/outline";
import { BanknotesIcon as BanknotesIconSolid } from "@heroicons/react/24/solid";
import {
  CircleAlert,
  CircleDollarSign,
  ArrowUp,
  ArrowDown,
  PlusIcon,
} from "lucide-react";
import {
  DataTable,
  DataTableSearch,
  DataTablePagination,
} from "@/components/admin/ui/data-table";
import { columns, Cash } from "@/components/admin/cash/columns";
import { Button } from "@/components/admin/ui/button";

async function getCash(): Promise<Cash[]> {
  return [
    {
      id: 1,
      date: "2025-05-25",
      transaction: "Uang Penerangan",
      nominal: 100000,
      type: "expense",
    },
    {
      id: 2,
      date: "2025-05-25",
      transaction: "Iuran Uang Kas",
      nominal: 500000,
      type: "income",
    },
    {
      id: 3,
      date: "2025-05-24",
      transaction: "Cetak Undangan Kumpulan",
      nominal: 50000,
      type: "expense",
    },
    {
      id: 4,
      date: "2025-05-08",
      transaction: "Menjenguk si X",
      nominal: 200000,
      type: "expense",
    },
  ];
}

export default async function CashPage(props: {
  searchParams?: Promise<{
    search?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;

  const search = searchParams?.search || "";
  const currentPage = Number(searchParams?.page) || 1;

  const cash = await getCash();

  const filtered = cash.filter(
    (c) =>
      c.date.toLowerCase().includes(search.toLocaleLowerCase()) ||
      c.type.toLowerCase().includes(search.toLocaleLowerCase()) ||
      c.transaction.toLowerCase().includes(search.toLocaleLowerCase())
  );

  const itemsPerPage = 10;
  const paginated = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  return (
    <main className="md:pt-8 pb-12">
      <div className="w-full pb-6 md:pb-10">
        <h1 className="hidden md:block text-xl md:text-2xl font-bold mb-3 text-techtona-1">
          Cash
        </h1>
        <Breadcrumb />
      </div>
      <h2 className="pb-3 text-techtona-1 flex items-center">
        <CircleAlert className="size-7 inline-block mr-3 bg-techtona-2 p-1.25 rounded-full" />
        <div className="font-semibold">Recap this month</div>
      </h2>
      <div className="text-xs sm:text-sm grid grid-cols-2 md:grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-4">
        <div className="p-4 sm:p-5 border border-zinc-200 rounded-xl">
          <div className="relative text-techtona-1">
            <div className="flex gap-2 items-center">
              <CircleDollarSign className="p-1 bg-techtona-3 rounded-full" />
              <span className="font-semibold">Income</span>
            </div>
            <div className="pt-3 font-extrabold">
              <span className="text-sm">Rp. </span>
              <span className="md:text-xl">500.000</span>
            </div>
            <div className="absolute right-0 top-0 md:top-1/2 md:-translate-y-1/2">
              <BanknotesIcon className="size-6 sm:size-7 md:size-10" />
              <span className="absolute bottom-0 right-0">
                <ArrowUp className="size-3.5 sm:size-4 md:size-6 bg-techtona-2 text-techtona-1 rounded-full p-0.75" />
              </span>
            </div>
          </div>
        </div>
        <div className="p-4 sm:p-5 border border-zinc-200 rounded-xl">
          <div className="relative text-techtona-1">
            <div className="flex gap-2 items-center">
              <CircleDollarSign className="p-1 bg-techtona-3 rounded-full" />
              <span className="font-semibold">Expense</span>
            </div>
            <div className="pt-3 font-extrabold">
              <span className="text-sm">Rp. </span>
              <span className="md:text-xl">100.000</span>
            </div>
            <div className="absolute right-0 top-0 md:top-1/2 md:-translate-y-1/2">
              <BanknotesIcon className="size-6 sm:size-7 md:size-10" />
              <span className="absolute bottom-0 right-0">
                <ArrowDown className="size-3.5 sm:size-4 md:size-6 bg-red-400 text-white rounded-full p-0.75" />
              </span>
            </div>
          </div>
        </div>
        <div className="p-4 sm:p-5 border border-zinc-200 rounded-xl">
          <div className="relative text-techtona-1">
            <div className="flex gap-2 items-center">
              <CircleDollarSign className="p-1 bg-techtona-3 rounded-full" />
              <span className="font-semibold">
                Net<span className="hidden md:inline-block ml-1">Income</span>
              </span>
            </div>
            <div className="pt-3 font-extrabold">
              <span className="text-sm">Rp. </span>
              <span className="md:text-xl">400.000</span>
            </div>
            <div className="absolute right-0 top-0 md:top-1/2 md:-translate-y-1/2 h-6 sm:h-fit">
              <div className="flex h-full sm:h-fit items-center gap-0.5">
                <ArrowUp className="size-4 sm:size-5 md:size-6 text-techtona-1 bg-techtona-2 rounded-full p-1" />
                <ArrowDown className="size-4 sm:size-5 md:size-6 text-white bg-red-400 rounded-full p-1" />
              </div>
            </div>
          </div>
        </div>
        <div className="p-4 sm:p-5 border border-zinc-200 bg-techtona-1 rounded-xl">
          <div className="relative text-techtona-1">
            <div className="flex gap-2 items-center">
              <CircleDollarSign className="sm:p-1 sm:bg-techtona-2 text-techtona-2 sm:text-techtona-1 size-5 sm:size-6 rounded-full" />
              <span className="font-semibold text-techtona-2">Balance</span>
            </div>
            <div className="pt-3 font-extrabold text-white">
              <span className="text-sm">Rp. </span>
              <span className="md:text-xl">5.200.000</span>
            </div>
            <div className="absolute right-0 top-0 md:top-1/2 md:-translate-y-1/2">
              <BanknotesIconSolid className="size-6 sm:size-7 md:size-10 p-1 md:p-2 rounded-full bg-techtona-2" />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-row gap-2 w-full">
        <div className="flex flex-auto md:items-center">
          <Button className="bg-techtona-1 hover:bg-techtona-4 text-white">
            <PlusIcon className="size-4" />
            <span className="font-semibold">
              New <span className="hidden lg:inline-block">Transaction</span>
            </span>
          </Button>
        </div>
        <div className="w-full md:w-100 flex justify-end">
          <DataTableSearch className="focus-visible:ring-techtona-3 border-zinc-200 shadow-none" />
        </div>
      </div>

      <div className="pt-4">
        <div className="border border-zinc-200 rounded-lg">
          <DataTable columns={columns} data={paginated} />
        </div>
      </div>

      <DataTablePagination totalPages={totalPages} currentPage={currentPage} />
    </main>
  );
}

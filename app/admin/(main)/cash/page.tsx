import Breadcrumb from "@/components/admin/ui/breadcrumb";
import { BanknotesIcon } from "@heroicons/react/24/outline";
import { BanknotesIcon as BanknotesIconSolid } from "@heroicons/react/24/solid";
import { CircleAlert, CircleDollarSign, ArrowUp, ArrowDown, Plus } from "lucide-react";
import { DataTableSearch, DataTablePagination } from "@/components/admin/ui/data-table";
import Link from "next/link";

import { getCashByType, getCashDataTable } from "@/lib/data/Cash";
import TransactionTable from "./_components/data-table";
import { calculateSummary, formatCurrency } from "@/lib/utils";

export default async function CashPage(props: {
	searchParams?: Promise<{
		search?: string;
		page?: string;
	}>;
}) {
	const searchParams = await props.searchParams;

	const search = searchParams?.search || "";
	const currentPage = Number(searchParams?.page) || 1;

	const cash = await getCashDataTable({ page: currentPage, search: search });

	const incomeRes = await getCashByType({ type: "income" });
	const expenseRes = await getCashByType({ type: "expense" });

	const incomeTotal = calculateSummary(incomeRes.data).income;
	const expenseTotal = calculateSummary(expenseRes.data).expense;

	const netIncome = incomeTotal - expenseTotal;
	const balance = netIncome;

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
							<span className="md:text-xl">{formatCurrency(incomeTotal)}</span>
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
							<span className="md:text-xl">{formatCurrency(expenseTotal)}</span>
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
							<span className="md:text-xl">{formatCurrency(netIncome)}</span>
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
							<span className="md:text-xl">{formatCurrency(balance)}</span>
						</div>
						<div className="absolute right-0 top-0 md:top-1/2 md:-translate-y-1/2">
							<BanknotesIconSolid className="size-6 sm:size-7 md:size-10 p-1 md:p-2 rounded-full bg-techtona-2" />
						</div>
					</div>
				</div>
			</div>

			<div className="mt-8 flex flex-row gap-2 w-full">
				<div className="flex flex-auto md:items-center">
					<Link
						href="/admin/cash/new"
						className="bg-techtona-1 hover:bg-techtona-4 text-white cursor-pointer flex items-center justify-center gap-2 py-2 px-4 rounded-md text-sm"
					>
						<Plus className="size-4" />
						<span className="font-semibold">
							New <span className="hidden lg:inline-block">Transaction</span>
						</span>
					</Link>
				</div>
				<div className="w-full md:w-100 flex justify-end">
					<DataTableSearch className="focus-visible:ring-techtona-3 border-zinc-200 shadow-none" />
				</div>
			</div>

			<div className="pt-4">
				<div className="border border-zinc-200 rounded-lg">
					<TransactionTable data={cash.data} />
				</div>
			</div>

			<DataTablePagination
				totalPages={cash.meta?.total_page ?? 0}
				currentPage={cash.meta?.page ?? 1}
			/>
		</main>
	);
}

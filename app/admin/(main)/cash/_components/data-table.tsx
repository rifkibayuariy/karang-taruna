"use client";

import { DataTable } from "@/components/admin/ui/data-table";
import { generateColumns } from "./columns";
import type { Cash } from "@/types/Cash";

type Props = {
	data: Cash[];
};

export default function TransactionTable({ data }: Props) {
	const columns = generateColumns();

	return <DataTable columns={columns} data={data} />;
}

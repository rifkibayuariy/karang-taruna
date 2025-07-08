import { ColumnDef } from "@tanstack/react-table";
import type { Cash } from "@/types/Cash";
import TransactionDelete from "./action-delete";
import { Badge } from "@/components/admin/ui/badge";
import { format } from "date-fns";
import { formatCurrency } from "@/lib/utils";

export function generateColumns(): ColumnDef<Cash>[] {
	return [
		{
			accessorKey: "date",
			header: "Date",
			cell: ({ row }) => {
				const rawDate = row.getValue("date");
				const date = new Date(rawDate as string);
				return format(date, "PPP");
			},
		},
		{
			accessorKey: "type",
			header: "Type",
			cell: ({ row }) => (
				<Badge
					className={`font-bold ${
						row.original.type == "income"
							? "bg-techtona-2 text-techtona-1"
							: row.original.type == "expense"
							? "bg-red-400"
							: ""
					}`}
				>
					{row.original.type}
				</Badge>
			),
		},
		{
			accessorKey: "description",
			header: "Transaction",
		},
		{
			accessorKey: "nominal",
			header: "Nominal",
			cell: ({ row }) => (
				<div className="flex items-end justify-between gap-1">
					<span className="text-xs">Rp.</span>
					<span>{formatCurrency(row.original.nominal)}</span>
				</div>
			),
		},
		{
			header: "Action",
			cell: ({ row }) => (
				<div className="flex gap-2">
					<TransactionDelete cash={row.original} />
				</div>
			),
		},
	];
}

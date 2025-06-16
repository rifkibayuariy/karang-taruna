"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/admin/ui/button";
import { Badge } from "@/components/admin/ui/badge";
import { PenSquare } from "lucide-react";

export type MonthlyMeeting = {
  id: number;
  date: string;
  location: string;
  host: string;
  income: number;
  expense: number;
};

const formatRupiah = (nominal: number | string) => {
  const number =
    typeof nominal === "number" ? nominal : Number(nominal.replace(/\D/g, ""));
  const formatted = new Intl.NumberFormat("id-ID").format(number);
  return formatted;
};

export const columns: ColumnDef<MonthlyMeeting>[] = [
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    accessorKey: "location",
    header: "Location",
    cell: ({ row }) => (
      <Badge className={`bg-techtona-2 text-techtona-1 font-semibold`}>
        {row.original.location}
      </Badge>
    ),
  },
  {
    accessorKey: "host",
    header: "Host",
  },
  {
    accessorKey: "income",
    header: "Income",
    cell: ({ row }) => (
      <div className="flex items-end justify-between gap-1">
        <span className="text-xs">Rp.</span>
        <span>{formatRupiah(row.original.income)}</span>
      </div>
    ),
  },
  {
    accessorKey: "expense",
    header: "Expense",
    cell: ({ row }) => (
      <div className="flex items-end justify-between gap-1">
        <span className="text-xs">Rp.</span>
        <span>{formatRupiah(row.original.expense)}</span>
      </div>
    ),
  },
  {
    header: "Action",
    cell: ({ row }) => (
      <Button
        size="sm"
        onClick={() => alert(row.original.id)}
        className="bg-techtona-1 hover:bg-techtona-4 font-semibold"
      >
        <PenSquare />
        <span className="sr-only">Edit</span>
      </Button>
    ),
  },
];

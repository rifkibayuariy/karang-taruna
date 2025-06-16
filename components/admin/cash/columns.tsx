"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/admin/ui/button";
import { Badge } from "@/components/admin/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/admin/ui/alert-dialog";
import { CircleAlert, CircleX, Trash2, Plus } from "lucide-react";

export type Cash = {
  id: number;
  date: string;
  type: string;
  transaction: string;
  nominal: number;
};

const formatRupiah = (nominal: number | string) => {
  const number =
    typeof nominal === "number" ? nominal : Number(nominal.replace(/\D/g, ""));
  const formatted = new Intl.NumberFormat("id-ID").format(number);
  return formatted;
};

export const columns: ColumnDef<Cash>[] = [
  {
    accessorKey: "date",
    header: "Date",
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
    accessorKey: "transaction",
    header: "Transaction",
  },
  {
    accessorKey: "nominal",
    header: "Nominal",
    cell: ({ row }) => (
      <div className="flex items-end justify-between gap-1">
        <span className="text-xs">Rp.</span>
        <span>{formatRupiah(row.original.nominal)}</span>
      </div>
    ),
  },
  {
    header: "Action",
    cell: ({ row }) => (
      <div className="flex gap-2">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              size="sm"
              className="bg-red-400 hover:bg-red-500 cursor-pointer"
            >
              <Trash2 className="size-4" />
              <span className="sr-only">Delete</span>
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader className="mb-4">
              <div className="flex justify-center">
                <CircleAlert className="size-14 bg-techtona-2 p-2 text-techtona-1 rounded-full" />
              </div>
              <AlertDialogTitle className="text-center text-red-500">
                Delete Transaction?
              </AlertDialogTitle>
              <AlertDialogDescription className="text-center text-zinc-700">
                This action cannot be undone. This action will delete the
                transaction.
                <span
                  className={`flex gap-3 items-center border border-zinc-300 p-1.5 text-xs my-3 rounded-md font-semibold justify-center ${
                    row.original.type == "income"
                      ? "bg-techtona-3"
                      : "bg-red-100"
                  }`}
                >
                  <span className="h-fit">{row.original.date}</span>
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
                  <span className="h-fit">{row.original.transaction}</span>
                  <span className="h-fit">
                    Rp.
                    {formatRupiah(row.original.nominal)}
                  </span>
                </span>
                Delete transaction?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="md:justify-center">
              <AlertDialogCancel>
                <CircleX className="size-4" />
                <span className="font-semibold text-zinc-700">Cancel</span>
              </AlertDialogCancel>
              <AlertDialogAction asChild>
                <button className="bg-red-400 hover:bg-red-500">
                  <Trash2 className="size-4" />
                  <span className="font-semibold">Delete</span>
                </button>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    ),
  },
];

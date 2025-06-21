"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/admin/ui/table";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "@/components/admin/ui/pagination";

import { Input } from "@/components/admin/ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

interface DataTableSearchProps {
  placeholder?: string;
  defaultValue?: string;
  className?: string;
  queryKey?: string;
}

interface DataTablePaginationProps {
  totalPages: number;
  currentPage?: number;
  queryKey?: string;
}

function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Table>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id} className="bg-techtona-3">
            {headerGroup.headers.map((header) => {
              return (
                <TableHead key={header.id} className="py-2 px-4 text-zinc-600">
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              );
            })}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row) => (
            <TableRow
              key={row.id}
              data-state={row.getIsSelected() && "selected"}
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id} className="py-3 px-4 text-zinc-800">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={columns.length} className="h-24 text-center">
              No results.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

function DataTableSearch({
  placeholder = "Search...",
  className,
  queryKey = "search",
}: DataTableSearchProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchValueFromURL = searchParams.get(queryKey) ?? "";

  const [value, setValue] = useState(searchValueFromURL);

  useEffect(() => {
    setValue(searchParams.get(queryKey) ?? "");
  }, [searchParams, queryKey]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setValue(val);
    handleSearch(val);
  };

  const handleSearch = useDebouncedCallback((value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set(queryKey, value);
    } else {
      params.delete(queryKey);
    }

    params.delete("page");
    router.push(`?${params.toString()}`);
  }, 500);

  return (
    <Input
      placeholder={placeholder}
      className={cn("w-full max-w-sm", className)}
      value={value}
      onChange={handleChange}
    />
  );
}

function DataTablePagination({
  totalPages,
  currentPage = 1,
  queryKey = "page",
}: DataTablePaginationProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());

    if (newPage === 1) {
      params.delete(queryKey);
    } else {
      params.set(queryKey, newPage.toString());
    }

    router.push(`?${params.toString()}`);
  };

  const renderPageButton = (page: number) => (
    <PaginationItem key={page}>
      <button
        onClick={() => handleChange(page)}
        className={`px-3 py-1 rounded-sm text-sm ${
          page === currentPage
            ? "bg-techtona-2 text-techtona-1 font-bold"
            : "bg-zinc-50 hover:bg-techtona-3"
        }`}
      >
        {page}
      </button>
    </PaginationItem>
  );

  const getVisiblePages = (): (number | "...")[] => {
    const pages: (number | "...")[] = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
      return pages;
    }

    if (currentPage <= 5) {
      pages.push(1, 2, 3, 4, 5, "...", totalPages);
    } else if (currentPage >= totalPages - 2) {
      pages.push(
        "...",
        totalPages - 5,
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages
      );
    } else {
      pages.push(
        1,
        "...",
        currentPage - 1,
        currentPage,
        currentPage + 1,
        "...",
        totalPages
      );
    }

    return pages;
  };

  const visiblePages = getVisiblePages();

  return (
    <Pagination className="mt-4 text-techtona-1">
      <PaginationContent className=" rounded-xl p-1 border border-zinc-200">
        <PaginationItem>
          <PaginationPrevious
            onClick={() => handleChange(currentPage - 1)}
            className={`hover:bg-techtona-3 text-techtona-1
              ${
                currentPage === 1
                  ? "pointer-events-none opacity-50"
                  : "pointer-cursor"
              }`}
          />
        </PaginationItem>

        {visiblePages.map((item, index) =>
          item === "..." ? (
            <PaginationItem key={`ellipsis-${index}`}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            renderPageButton(item)
          )
        )}

        <PaginationItem>
          <PaginationNext
            onClick={() => handleChange(currentPage + 1)}
            className={`hover:bg-techtona-3 text-techtona-1
              ${
                currentPage >= totalPages
                  ? "pointer-events-none opacity-50"
                  : "pointer-cursor"
              }
            `}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

export { DataTable, DataTableSearch, DataTablePagination };

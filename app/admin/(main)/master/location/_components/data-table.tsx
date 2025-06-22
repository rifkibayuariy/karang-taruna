"use client";

import { DataTable } from "@/components/admin/ui/data-table";
import { generateColumns } from "./columns";
import type { Location } from "@/types/Location";

type Props = {
  data: Location[];
  currentPage: number;
  perPage: number;
};

export default function LocationTable({ data, currentPage, perPage }: Props) {
  const columns = generateColumns({ currentPage, itemsPerPage: perPage });

  return <DataTable columns={columns} data={data} />;
}

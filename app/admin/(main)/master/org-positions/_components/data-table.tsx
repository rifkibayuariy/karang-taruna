"use client";

import { DataTable } from "@/components/admin/ui/data-table";
import { generateColumns } from "./columns";
import type { OrganizationPosition } from "@/types/OrganizationPosition";

type Props = {
  data: OrganizationPosition[];
  currentPage: number;
  perPage: number;
};

export default function OrganizationPositionsTable({
  data,
  currentPage,
  perPage,
}: Props) {
  const columns = generateColumns({ currentPage, itemsPerPage: perPage });

  return <DataTable columns={columns} data={data} />;
}

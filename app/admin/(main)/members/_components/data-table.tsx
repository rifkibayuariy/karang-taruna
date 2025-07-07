"use client";

import { DataTable } from "@/components/admin/ui/data-table";
import { generateColumns } from "./columns";
import type { Member } from "@/types/Member";

type Props = {
  data: Member[];
  currentPage: number;
  perPage: number;
};

export default function MembersTable({ data, currentPage, perPage }: Props) {
  const columns = generateColumns({ currentPage, itemsPerPage: perPage });

  return <DataTable columns={columns} data={data} />;
}
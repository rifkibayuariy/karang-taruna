import { ColumnDef } from "@tanstack/react-table";
import type { OrganizationPosition } from "@/types/OrganizationPosition";
import OrganizationPositionDelete from "./action-delete";
import { Button } from "@/components/admin/ui/button";
import { SquarePen } from "lucide-react";
import Link from "next/link";

export function generateColumns({
  currentPage,
  itemsPerPage,
}: {
  currentPage: number;
  itemsPerPage: number;
}): ColumnDef<OrganizationPosition>[] {
  return [
    {
      accessorKey: "id_organization_position",
      header: "No",
      cell: ({ row }) => (currentPage - 1) * itemsPerPage + row.index + 1,
    },
    {
      accessorKey: "name",
      header: "Position",
    },
    {
      accessorKey: "description",
      header: "Description",
    },
    {
      header: "Action",
      cell: ({ row }) => (
        <div className="flex gap-2">
          <Link
            href={`/admin/master/org-positions/${row.original.id_organization_position}/edit`}
          >
            <Button
              size="sm"
              className="bg-techtona-2 hover:bg-techtona-5 cursor-pointer"
            >
              <SquarePen className="size-4 text-techtona-1" />
              <span className="sr-only">Update</span>
            </Button>
          </Link>
          <OrganizationPositionDelete position={row.original} />
        </div>
      ),
    },
  ];
}

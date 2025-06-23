import { ColumnDef } from "@tanstack/react-table";
import type { Location } from "@/types/Location";
import LocationDelete from "./action-delete";
import { Button } from "@/components/admin/ui/button";
import { SquarePen } from "lucide-react";
import Link from "next/link";

export function generateColumns({
  currentPage,
  itemsPerPage,
}: {
  currentPage: number;
  itemsPerPage: number;
}): ColumnDef<Location>[] {
  return [
    {
      accessorKey: "id_location",
      header: "No",
      cell: ({ row }) => (currentPage - 1) * itemsPerPage + row.index + 1,
    },
    {
      accessorKey: "location_name",
      header: "Location Name",
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
            href={`/admin/master/location/${row.original.id_location}/edit`}
          >
            <Button
              size="sm"
              className="bg-techtona-2 hover:bg-techtona-5 cursor-pointer"
            >
              <SquarePen className="size-4 text-techtona-1" />
              <span className="sr-only">Update</span>
            </Button>
          </Link>
          <LocationDelete location={row.original} />
        </div>
      ),
    },
  ];
}

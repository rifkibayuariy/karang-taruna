"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/admin/ui/button";
import { SquarePen, Trash2 } from "lucide-react";
import FormLocationDialog from "@/components/admin/master/location/form-dialog";

export type Location = {
  id: number;
  name: string;
  description: string;
};

export const columns: ColumnDef<Location>[] = [
  {
    accessorKey: "name",
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
        <FormLocationDialog location={row.original}>
          <Button
            size="sm"
            className="bg-techtona-2 hover:bg-techtona-5 cursor-pointer"
          >
            <SquarePen className="size-4 text-techtona-1" />
            <span className="sr-only">Update</span>
          </Button>
        </FormLocationDialog>
        <Button
          size="sm"
          className="bg-red-400 hover:bg-red-500 cursor-pointer"
          onClick={() => alert(row.original.id)}
        >
          <Trash2 className="size-4" />
          <span className="sr-only">Delete</span>
        </Button>
      </div>
    ),
  },
];

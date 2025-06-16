"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/admin/ui/button";
import { SquarePen, CircleAlert, CircleX, Trash2 } from "lucide-react";
import FormLocationDialog from "@/components/admin/master/location/form-dialog";
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
        <FormLocationDialog mode="edit" location={row.original}>
          <Button
            size="sm"
            className="bg-techtona-2 hover:bg-techtona-5 cursor-pointer"
          >
            <SquarePen className="size-4 text-techtona-1" />
            <span className="sr-only">Update</span>
          </Button>
        </FormLocationDialog>
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
                <CircleAlert className="size-14 bg-red-400 p-2 text-white rounded-full" />
              </div>
              <AlertDialogTitle className="text-center text-red-500">
                Delete Location?
              </AlertDialogTitle>
              <AlertDialogDescription className="text-center text-zinc-700">
                This action cannot be undone. This action will delete the
                location. Delete
                <span className="font-extrabold mx-1.5">
                  {row.original.name}
                </span>
                location?
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

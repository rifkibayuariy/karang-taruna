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
import {
  CircleAlert,
  CircleX,
  Trash2,
  Check,
  CircleMinus,
  PenSquare,
  X,
} from "lucide-react";

export type Member = {
  id: number;
  fullname: string;
  nickname: string;
  location: string;
  is_active: boolean;
  status: string;
};

export const columns: ColumnDef<Member>[] = [
  {
    accessorKey: "fullname",
    header: "Fullname",
  },
  {
    accessorKey: "nickname",
    header: "Nickname",
  },
  {
    accessorKey: "location",
    header: "Location",
    cell: ({ row }) => (
      <Badge variant="outline" className={`text-zinc-800 font-semibold`}>
        {row.original.location}
      </Badge>
    ),
  },
  {
    accessorKey: "is_active",
    header: "Status",
    cell: ({ row }) =>
      row.original.status == "approved" ? (
        <Badge
          className={`font-bold ${
            row.original.is_active
              ? "bg-techtona-2 text-techtona-1"
              : "bg-orange-400 text-white"
          }`}
        >
          {row.original.is_active ? "active" : "inactive"}
        </Badge>
      ) : (
        <span>-</span>
      ),
  },
  {
    header: "Action",
    cell: ({ row }) => (
      <div className="flex gap-2">
        {row.original.status == "approved" ? (
          row.original.is_active ? (
            <>
              <Button
                size="sm"
                className="bg-techtona-1 hover:bg-techtona-4 font-semibold"
              >
                <PenSquare />
                <span className="sr-only">Edit</span>
              </Button>
              <Button
                size="sm"
                className="bg-red-200 text-red-500 hover:bg-red-400 font-semibold hover:text-white"
              >
                <CircleMinus />
                Deactivate
              </Button>
            </>
          ) : (
            <>
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
                      <CircleAlert className="size-14 text-zinc-800 rounded-full" />
                    </div>
                    <AlertDialogTitle className="text-center text-techtona-1">
                      Delete Member?
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-center text-zinc-700">
                      This action cannot be undone. This action will delete the
                      member. Delete
                      <span className="mx-2 font-extrabold">
                        {row.original.fullname}
                      </span>
                      ?
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter className="md:justify-center">
                    <AlertDialogCancel>
                      <CircleX className="size-4" />
                      <span className="font-semibold text-zinc-700">
                        Cancel
                      </span>
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
              <Button
                size="sm"
                className="bg-techtona-2 text-techtona-1 font-semibold hover:bg-techtona-5"
              >
                <Check />
                Activate
              </Button>
            </>
          )
        ) : row.original.status == "pending" ? (
          <>
            <Button
              size="sm"
              className="bg-techtona-2 text-techtona-1 font-semibold hover:bg-techtona-5"
            >
              <Check />
              Approve
            </Button>
            <Button
              size="sm"
              className="bg-red-400 text-white font-semibold hover:bg-red-500"
            >
              <X />
              Reject
            </Button>
          </>
        ) : (
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
                  <CircleAlert className="size-14 text-zinc-800 rounded-full" />
                </div>
                <AlertDialogTitle className="text-center text-techtona-1">
                  Delete Member Rejected?
                </AlertDialogTitle>
                <AlertDialogDescription className="text-center text-zinc-700">
                  This action cannot be undone. This action will delete the
                  member rejected. Delete
                  <span className="mx-2 font-extrabold">
                    {row.original.fullname}
                  </span>
                  ?
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
        )}
      </div>
    ),
  },
];

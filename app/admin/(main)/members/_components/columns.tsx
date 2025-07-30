import { ColumnDef } from "@tanstack/react-table";
import { Member } from "@/types/Member";
import { Button } from "@/components/admin/ui/button";
import { Badge } from "@/components/admin/ui/badge";
import { PenSquare } from "lucide-react";
import Link from "next/link";
import DeactivateMember from "./action-deactivate";
import ActivateMember from "./action-activate";
import DeleteMember from "./action-delete";
import ApproveMember from "./action-approve";
import RejectMember from "./action-reject";

export function generateColumns({
  currentPage,
  itemsPerPage,
}: {
  currentPage: number;
  itemsPerPage: number;
}): ColumnDef<Member>[] {
  return [
    {
      accessorKey: "id_member",
      header: "No",
      cell: ({ row }) => (currentPage - 1) * itemsPerPage + row.index + 1,
    },
    {
      accessorKey: "fullname",
      header: "Full Name",
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
          {row.original.location_name ?? "-"}
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
                <Link href={`members/${row.original.id_member}/edit`}>
                  <Button
                    size="sm"
                    className="bg-techtona-1 hover:bg-techtona-4 font-semibold cursor-pointer"
                  >
                    <PenSquare />
                    <span className="sr-only">Edit</span>
                  </Button>
                </Link>
                <DeactivateMember member={row.original} />
              </>
            ) : (
              <>
                <DeleteMember member={row.original} />
                <ActivateMember member={row.original} />
              </>
            )
          ) : row.original.status == "pending" ? (
            <>
              <ApproveMember member={row.original} />
              <RejectMember member={row.original} />
            </>
          ) : (
            <DeleteMember member={row.original} />
          )}
        </div>
      ),
    },
  ];
}

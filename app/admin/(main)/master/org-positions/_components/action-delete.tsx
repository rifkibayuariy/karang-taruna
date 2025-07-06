import type { OrganizationPosition } from "@/types/OrganizationPosition";
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
import { Button } from "@/components/admin/ui/button";
import { Trash2, CircleAlert, CircleX } from "lucide-react";
import { useRouter } from "next/navigation";
import { deleteOrganizationPosition } from "../action";
import { toast } from "sonner";

export default function OrganizationPositionDelete({
  position,
}: {
  position: OrganizationPosition;
}) {
  const router = useRouter();

  const deleteOrganizationPositionHandle = async (id: number) => {
    try {
      const res = await deleteOrganizationPosition(id);
      if (res.success) {
        toast.success("Successs", {
          description: "Organization Position Deleted!",
          duration: 3000,
        });

        router.refresh();
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error(err.message);
      } else {
        console.error("Unexpected error", err);
      }
    }
  };

  return (
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
            Delete Position?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center text-zinc-700">
            This action cannot be undone. This action will delete the
            organization position. Delete
            <span className="font-extrabold mx-1.5">
              {position.position_name}
            </span>
            position?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="md:justify-center">
          <AlertDialogCancel>
            <CircleX className="size-4" />
            <span className="font-semibold text-zinc-700">Cancel</span>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <button
              className="bg-red-400 hover:bg-red-500"
              onClick={() =>
                deleteOrganizationPositionHandle(Number(position.id_position))
              }
            >
              <Trash2 className="size-4" />
              <span className="font-semibold">Delete</span>
            </button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

"use client";

import type { OrganizationStructure } from "@/types/OrganizationStructure";
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
import { Trash2, X, CircleAlert, CircleX, LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { deleteStructure } from "../actions";
import { toast } from "sonner";
import { useToggle } from "@/hooks/use-toggle";

export default function StructureDelete({
  structure,
}: {
  structure: OrganizationStructure;
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useToggle();

  const deleteStructureHandle = async (id: number) => {
    setIsLoading(true);
    try {
      const res = await deleteStructure(id);
      if (res.success) {
        toast.success("Successs", {
          description: "Position Deleted from Period!",
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
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          className="bg-red-200 text-red-400 hover:bg-red-400 hover:text-white cursor-pointer"
          disabled={isLoading}
        >
          {isLoading ? (
            <LoaderCircle className="animate-spin" />
          ) : (
            <X className="size-4" />
          )}
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
            This action cannot be undone. This action will delete the position
            <span className="font-bold mx-1 text-red-500">
              {structure.name}
            </span>
            at period. Delete position at period?
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
                deleteStructureHandle(
                  Number(structure.id_organization_structure)
                )
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

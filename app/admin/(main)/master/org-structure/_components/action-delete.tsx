"use client";

import type { OrganizationPeriod } from "@/types/OrganizationPeriod";
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
import { Trash2, CircleAlert, CircleX, LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { deleteOrganizationPeriod } from "../actions";
import { toast } from "sonner";
import { useToggle } from "@/hooks/use-toggle";

export default function OrganizationPeriodDelete({
  period,
}: {
  period: OrganizationPeriod;
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useToggle();

  const deleteOrganizationPeriodHandle = async (id: number) => {
    setIsLoading(true);
    try {
      const res = await deleteOrganizationPeriod(id);
      if (res.success) {
        toast.success("Successs", {
          description: "Organization Period Deleted!",
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
          size="sm"
          className="bg-red-400 hover:bg-red-500 cursor-pointer"
          disabled={isLoading}
        >
          {isLoading ? (
            <LoaderCircle className="animate-spin" />
          ) : (
            <Trash2 className="size-4" />
          )}
          <span className="sr-only lg:not-sr-only">Delete</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader className="mb-4">
          <div className="flex justify-center">
            <CircleAlert className="size-14 bg-red-400 p-2 text-white rounded-full" />
          </div>
          <AlertDialogTitle className="text-center text-red-500">
            Delete Period?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center text-zinc-700">
            This action cannot be undone. This action will delete the
            organization period and structure. Delete period and structure?
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
                deleteOrganizationPeriodHandle(
                  Number(period.id_organization_periode)
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

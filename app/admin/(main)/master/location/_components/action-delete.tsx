import { Location } from "@/types/Location";
import { Button } from "@/components/admin/ui/button";
import { Trash2, CircleAlert, CircleX } from "lucide-react";
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
import { deleteLocation } from "../actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function LocationDelete({ location }: { location: Location }) {
  const router = useRouter();

  const deleteLocationHandle = async (id: number) => {
    try {
      const res = await deleteLocation(id);
      if (res.success) {
        toast.success("Successs", {
          description: "Location Deleted!",
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
            Delete Location?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center text-zinc-700">
            This action cannot be undone. This action will delete the location.
            Delete
            <span className="font-extrabold mx-1.5">
              {location.location_name}
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
            <button
              className="bg-red-400 hover:bg-red-500"
              onClick={() => deleteLocationHandle(Number(location.id_location))}
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

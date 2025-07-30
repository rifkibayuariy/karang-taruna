import { Member } from "@/types/Member";
import { Button } from "@/components/admin/ui/button";
import { CircleAlert, CircleX, Trash2 } from "lucide-react";
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
import { DeleteMemberById } from "../actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function DeleteMember({ member }: { member: Member }) {
  const router = useRouter();

  const deleteMemberHandle = async (id: number) => {
    try {
      const res = await DeleteMemberById(id);
      if (res.success) {
        toast.success("Successs", {
          description: "Member Deleted!",
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
            <CircleAlert className="size-14 text-red-400 rounded-full" />
          </div>
          <AlertDialogTitle className="text-center text-red-400">
            Delete Member?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center text-zinc-700">
            This action cannot be undone. This action will delete the member.
            Delete
            <span className="mx-2 font-extrabold">{member.fullname}</span>?
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="md:justify-center">
          <AlertDialogCancel className="hover:bg-zinc-100">
            <CircleX className="size-4" />
            <span className="font-semibold text-zinc-700">Cancel</span>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <button
              className="bg-red-200 text-red-500 hover:bg-red-400 font-semibold hover:text-white cursor-pointer"
              onClick={() => deleteMemberHandle(Number(member.id_member))}
            >
              <Trash2 className="size-4" />
              <span>Delete</span>
            </button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

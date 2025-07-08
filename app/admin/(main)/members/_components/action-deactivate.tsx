import { Member } from "@/types/Member";
import { Button } from "@/components/admin/ui/button";
import { CircleAlert, CircleX, CircleMinus } from "lucide-react";
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
import { setDeactivateMember } from "../actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function DeactivateMember({ member }: { member: Member }) {
  const router = useRouter();

  const deactivateMemberHandle = async (id: number) => {
    try {
      const res = await setDeactivateMember(id);
      if (res.success) {
        toast.success("Successs", {
          description: "Member Deactivated!",
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
          className="bg-red-200 text-red-500 hover:bg-red-400 font-semibold hover:text-white cursor-pointer"
        >
          <CircleMinus />
          Deactivate
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader className="mb-4">
          <div className="flex justify-center">
            <CircleAlert className="size-14 bg-red-400 p-2 text-white rounded-full" />
          </div>
          <AlertDialogTitle className="text-center text-techtona-1">
            Deactivate Member?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center text-zinc-700">
            This action will Deactivate the member. Deactivate
            <span className="font-extrabold mx-1.5">{member.fullname}</span>
            Member?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="md:justify-center">
          <AlertDialogCancel>
            <CircleX className="size-4" />
            <span className="font-semibold text-zinc-700">Cancel</span>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <button
              className="bg-techtona-1 hover:bg-techtona-4"
              onClick={() => deactivateMemberHandle(Number(member.id_member))}
            >
              <span className="font-semibold">Deactivate</span>
            </button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

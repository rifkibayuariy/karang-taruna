import { Member } from "@/types/Member";
import { Button } from "@/components/admin/ui/button";
import { CircleAlert, CircleX, X } from "lucide-react";
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
import { setStatusMember } from "../actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function RejectMember({ member }: { member: Member }) {
  const router = useRouter();

  const rejectMemberHandle = async (id: number) => {
    try {
      const res = await setStatusMember(id, "rejected");
      if (res.success) {
        toast.success("Successs", {
          description: "Member Rejected!",
          duration: 3000,
        });

        router.push("/admin/members?tab=rejected");
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
          className="bg-red-400 hover:bg-red-500 text-white font-semibold cursor-pointer"
        >
          <X />
          Reject
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader className="mb-4">
          <div className="flex justify-center">
            <CircleAlert className="size-14 bg-red-400 p-2 text-white rounded-full" />
          </div>
          <AlertDialogTitle className="text-center text-red-400">
            Reject Member?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center text-zinc-700">
            This action will Reject the member. Reject
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
              className="bg-red-200 text-red-500 hover:bg-red-400 hover:text-white"
              onClick={() => rejectMemberHandle(Number(member.id_member))}
            >
              <span className="font-semibold">Reject</span>
            </button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

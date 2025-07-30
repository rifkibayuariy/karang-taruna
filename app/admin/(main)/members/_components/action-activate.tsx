import { Member } from "@/types/Member";
import { Button } from "@/components/admin/ui/button";
import { CircleAlert, CircleX, Check } from "lucide-react";
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
import { setActivateMember } from "../actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function ActivateMember({ member }: { member: Member }) {
  const router = useRouter();

  const activateMemberHandle = async (id: number) => {
    try {
      const res = await setActivateMember(id);
      if (res.success) {
        toast.success("Successs", {
          description: "Member Activated!",
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
          className="bg-techtona-2 text-techtona-1 font-semibold hover:bg-techtona-5"
        >
          <Check />
          Activate
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader className="mb-4">
          <div className="flex justify-center">
            <CircleAlert className="size-14 bg-techtona-2 p-2 text-techtona-1 rounded-full" />
          </div>
          <AlertDialogTitle className="text-center text-techtona-1">
            Activate Member?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center text-zinc-700">
            This action will Activate the member. Activate
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
              onClick={() => activateMemberHandle(Number(member.id_member))}
            >
              <span className="font-semibold">Activate</span>
            </button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

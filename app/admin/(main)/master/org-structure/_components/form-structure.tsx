"use client";

import { OrganizationStructure } from "@/types/OrganizationStructure";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/admin/ui/select";
import { Member } from "@/types/Member";
import { useToggle } from "@/hooks/use-toggle";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { submitStructureMember } from "../actions";
import StructureDelete from "./action-delete-structure";

export default function FormStructure({
  structure,
  members,
}: {
  structure: OrganizationStructure;
  members: Member[];
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useToggle();

  const submit = async (selectedValue: string) => {
    setIsLoading(true);
    console.log("heheh");
    try {
      const res = await submitStructureMember(
        Number(structure.id_organization_structure),
        Number(selectedValue)
      );
      if (res.success) {
        toast.success("Successs", {
          description: "Member selected!",
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
    <div className="flex flex-row gap-2 items-end">
      <div className="flex-auto flex flex-col lg:flex-row gap-2">
        <span className="font-semibold text-sm lg:w-80">{structure.name}</span>
        <Select
          value={structure.id_member ? `${structure.id_member}` : undefined}
          onValueChange={submit}
          disabled={isLoading}
        >
          <SelectTrigger className="bg-none border-zinc-200 w-full shadow-none text-sm">
            <SelectValue placeholder="Select a Member" />
          </SelectTrigger>
          <SelectContent className="text-sm">
            {members.map((m) => {
              return (
                <SelectItem key={m.id_member} value={`${m.id_member}`}>
                  {m.fullname}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>
      <StructureDelete structure={structure} />
    </div>
  );
}

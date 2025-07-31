"use client";

import { useToggle } from "@/hooks/use-toggle";
import { Button } from "@/components/admin/ui/button";
import FormPositionPeriod from "./form-position-period";
import { OrganizationPosition } from "@/types/OrganizationPosition";
import { OrganizationStructure } from "@/types/OrganizationStructure";
import FormStructure from "./form-structure";
import { Member } from "@/types/Member";
import { Info } from "lucide-react";

export default function FormPeriodStructure({
  defaultOpen = false,
  idPeriod,
  positions,
  positionsPeriod,
  members,
}: {
  defaultOpen?: boolean;
  idPeriod: number | null;
  positions: OrganizationPosition[];
  positionsPeriod: OrganizationStructure[] | null;
  members: Member[];
}) {
  const [showStructure, setShowStructure] = useToggle(defaultOpen);

  return (
    <div className="mt-6 w-full">
      {showStructure ? (
        <div className="border-t border-zinc-200">
          <div className="mt-4">
            <FormPositionPeriod idPeriod={idPeriod} positions={positions} />
            <div className="border-t mt-4 mb-6 pt-6 border-zinc-200 flex flex-col gap-4">
              {positionsPeriod && positionsPeriod.length > 0 ? (
                positionsPeriod?.map((s) => {
                  return (
                    <FormStructure
                      key={s.id_organization_structure}
                      structure={s}
                      members={members}
                    />
                  );
                })
              ) : (
                <div className="w-full p-4 flex justify-center items-center gap-4">
                  <Info className="size-9" />
                  <span className="font-semibold">No Position Added!</span>
                </div>
              )}
            </div>
          </div>
          <Button
            size="sm"
            variant="outline"
            className="w-full shadow-none border-zinc-200 text-red-400 hover:bg-red-100 hover:border-red-200 cursor-pointer hover:text-red-400"
            onClick={() => setShowStructure(false)}
          >
            Hide Structure
          </Button>
        </div>
      ) : (
        <Button
          size="sm"
          variant="outline"
          className="w-full shadow-none border-zinc-200 text-techtona-1 hover:bg-techtona-2/20 hover:border-techtona-1/15 cursor-pointer hover:text-techtona-4"
          onClick={() => setShowStructure(true)}
        >
          Show Structure
        </Button>
      )}
    </div>
  );
}

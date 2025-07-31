import { getAllOrganizationPeriods } from "@/lib/data/OrganizationPeriod";
import StructureWrapper from "./structure-wrapper";
import { Info } from "lucide-react";

export default async function PeriodWrapper() {
  const periods = await getAllOrganizationPeriods();

  return (
    <div className="mt-8 space-y-6">
      {periods.length > 0 ? (
        periods.map((period, i) => {
          return (
            <StructureWrapper
              key={periods.length - i}
              period={period}
              periodLength={periods.length}
              index={i}
            />
          );
        })
      ) : (
        <div className="w-full p-8 border border-zinc-200 rounded-xl flex justify-center items-center gap-4 text-techtona-1">
          <Info className="size-10 p-1.5 rounded-full bg-techtona-2" />
          <span className="font-semibold">No Period Added!</span>
        </div>
      )}
    </div>
  );
}

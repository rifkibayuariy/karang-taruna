import { getAllOrganizationPeriods } from "@/lib/data/OrganizationPeriod";
import StructureWrapper from "./structure-wrapper";

export default async function PeriodWrapper() {
  const periods = await getAllOrganizationPeriods();

  return (
    <div className="mt-8 space-y-6">
      {periods.map((period, i) => {
        return (
          <StructureWrapper
            key={periods.length - i}
            period={period}
            periodLength={periods.length}
            index={i}
          />
        );
      })}
    </div>
  );
}

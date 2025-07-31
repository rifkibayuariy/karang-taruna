import { OrganizationPeriod } from "@/types/OrganizationPeriod";
import OrganizationPeriodDelete from "./action-delete";
import FormPeriodEditWrapper from "./form-period-edit-wrapper";
import FormPeriodStructure from "./form-period-structure";
import { getOrganizationPositions } from "@/lib/data/OrganizationPosition";
import { getOrganizationPositionsPeriod } from "@/lib/data/OrganizationStructure";
import { getActiveApprovedMembers } from "@/lib/data/Member";

export default async function StructureWrapper({
  period,
  index,
  periodLength,
}: {
  period: OrganizationPeriod;
  index: number;
  periodLength: number;
}) {
  const positions = await getOrganizationPositions();
  const positionsPeriod = await getOrganizationPositionsPeriod(
    Number(period.id_organization_periode)
  );
  const members = await getActiveApprovedMembers();

  return (
    <div className="text-techtona-1 bg-white/50 backdrop-filter backdrop-blur-lg border border-zinc-200 rounded-xl p-6 lg:p-8">
      <div className="w-full flex flex-row items-center justify-between">
        <h1 className="font-bold text-xl flex gap-2 items-center">
          <span>Period</span>
          <span className="bg-techtona-2 rounded-full aspect-square w-7 text-center">
            {periodLength - index}
          </span>
        </h1>
        <OrganizationPeriodDelete period={period} />
      </div>
      <FormPeriodEditWrapper period={period} />
      <FormPeriodStructure
        defaultOpen={index == 0}
        idPeriod={period.id_organization_periode}
        positions={positions}
        positionsPeriod={positionsPeriod}
        members={members}
      />
    </div>
  );
}

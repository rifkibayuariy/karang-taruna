import FormContribution from "./form-contribution";
import { getMemberForMeeting } from "@/lib/data/Member";
import { MonthlyMeeting } from "@/types/MonthlyMeeting";

export default async function ContributionWrapper({
  monthlyMeeting,
}: {
  monthlyMeeting: MonthlyMeeting;
}) {
  const members = await getMemberForMeeting(
    monthlyMeeting.id_monthly_meeting ? monthlyMeeting.id_monthly_meeting : 0
  );

  return (
    <div className="mt-6">
      <FormContribution
        member={members[0]}
        latest={members.length == 1}
        monthlyMeeting={monthlyMeeting}
      />
    </div>
  );
}

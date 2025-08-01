import { Button } from "@/components/admin/ui/button";
import { ChevronsRight, Save } from "lucide-react";
import { Member } from "@/types/Member";
import {
  getNominalBill,
  getNominalPaidByMember,
} from "@/lib/data/MonthlyMeeting";
import { formatCurrency } from "@/lib/utils";
import { MonthlyMeeting } from "@/types/MonthlyMeeting";

export default async function FormContribution({
  latest,
  member,
  monthlyMeeting,
}: {
  latest: boolean;
  member: Member;
  monthlyMeeting: MonthlyMeeting;
}) {
  const nominal_bill = await getNominalBill();
  const member_paid = await getNominalPaidByMember(
    Number(member.id_member),
    Number(monthlyMeeting.id_monthly_meeting)
  );

  const nominal_gap =
    nominal_bill > member_paid
      ? nominal_bill - member_paid
      : member_paid - nominal_bill;

  const minus = nominal_bill > member_paid;
  const how_many_times = nominal_gap / Number(monthlyMeeting.nominal);

  return (
    <>
      <div className="p-4 lg:p-6 rounded-xl border border-zinc-200 text-techtona-1">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
          <div className="flex flex-col gap-0.5">
            <span className="font-semibold">{member.fullname}</span>
            <div className="flex flex-row gap-2">
              <div
                className={`flex flex-row gap-2 px-2 py-0.5 rounded-lg text-sm font-bold ${
                  minus
                    ? "bg-red-100 text-red-400"
                    : "bg-techtona-2 text-techtona-1"
                }`}
              >
                {minus ? <span>-</span> : <span>+</span>}
                <span>
                  <span className="mr-1 text-xs">Rp</span>
                  {formatCurrency(nominal_gap)}
                </span>
              </div>
              <span
                className={`px-2 py-0.5 rounded-lg text-sm font-bold ${
                  minus ? "bg-red-400 text-white" : "bg-techtona-1 text-white"
                }`}
              >
                {how_many_times}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 flex justify-center">
        {latest ? (
          <Button className="w-full lg:w-fit bg-techtona-1 text-white hover:bg-techtona-4 cursor-pointer">
            <Save />
            <span>Finish Meeting</span>
          </Button>
        ) : (
          <Button className="w-full lg:w-fit bg-techtona-1 text-white hover:bg-techtona-4 cursor-pointer">
            <ChevronsRight className="size-5" />
            <span>Next Member</span>
          </Button>
        )}
      </div>
    </>
  );
}

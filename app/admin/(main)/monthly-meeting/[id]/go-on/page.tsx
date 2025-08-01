import Breadcrumb from "@/components/admin/ui/breadcrumb";
import { getMonthlyMeetingById } from "@/lib/data/MonthlyMeeting";
import { notFound } from "next/navigation";
import { CirclePlay } from "lucide-react";
import { getMemberById } from "@/lib/data/Member";
import { formatCurrency } from "@/lib/utils";
import ContributionWrapper from "../../_components/contribution-wrapper";

export default async function EditMemberPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const monthlyMeeting = await getMonthlyMeetingById(Number(id));

  if (!monthlyMeeting) notFound();
  if (monthlyMeeting.is_finish) {
    return (
      <main className="pb-8 md:pt-8">
        <div>Meeting telah berakhir</div>
      </main>
    );
  }

  const host = await getMemberById(monthlyMeeting.host);

  return (
    <main className="pb-8 md:pt-8">
      <div className="w-full pb-6 md:pb-10">
        <h1 className="hidden md:block text-xl text-nowrap md:text-2xl font-bold mb-3 text-techtona-1">
          Monthly Meeting -{" "}
          <span className="bg-techtona-2 px-2 py-0.5 rounded-lg">Started</span>
        </h1>
        <Breadcrumb />
      </div>
      <div className="p-6 lg:p-8 rounded-xl border border-zinc-200 text-techtona-1">
        <h1 className="font-bold flex gap-4 items-center justify-start">
          <CirclePlay className="bg-techtona-2 size-10 p-1 rounded-full" />
          <span className="text-xl">Monthly Meeting</span>
        </h1>
        <div className="flex flex-col gap-1.5 mt-6">
          <div className="flex flex-row gap-2">
            <div className="w-40">Hostname</div>
            <div className="flex-auto font-semibold">{host.fullname}</div>
          </div>
          <div className="flex flex-row gap-2">
            <div className="w-40">Location</div>
            <div className="flex-auto font-bold">
              <span className="px-2 py-1 rounded-lg bg-techtona-2 text-sm">
                {host.location_name}
              </span>
            </div>
          </div>
          <div className="flex flex-row gap-2">
            <div className="w-40">Contrib. Money</div>
            <div className="flex-auto font-semibold">
              <span className="mr-1 text-xs">Rp</span>
              <span>{formatCurrency(monthlyMeeting.nominal)}</span>
            </div>
          </div>
        </div>
      </div>
      <ContributionWrapper monthlyMeeting={monthlyMeeting} />
    </main>
  );
}

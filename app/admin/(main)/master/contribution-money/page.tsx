import { Suspense } from "react";
import Breadcrumb from "@/components/admin/ui/breadcrumb";
import FormEditContributionMoneyWrapper from "./_components/form-wrapper";
import TableContributionMoney from "./_components/table";
import { BasicLoading } from "@/components/admin/ui/loading";
import { History, CircleDollarSign } from "lucide-react";

export default function ContributionMoneyPage() {
  return (
    <main className="pb-8 md:pt-8">
      <div className="w-full flex flex-col gap-6 md:gap-3 mb-6 md:mb-10">
        <div className="w-full md:order-2">
          <Breadcrumb />
        </div>
        <h1 className="text-xl text-nowrap md:text-2xl font-bold text-center md:text-left text-techtona-1">
          Contribution Money
        </h1>
      </div>
      <div className="mt-8 md:max-w-148 text-techtona-1 bg-white/50 backdrop-filter backdrop-blur-lg border border-zinc-200 rounded-xl p-6">
        <h2 className="font-bold mb-6 flex items-center">
          <CircleDollarSign className="size-7 inline-block mr-3 bg-techtona-2 p-1.25 rounded-full" />
          Contribution
        </h2>

        <Suspense fallback={<BasicLoading />}>
          <FormEditContributionMoneyWrapper />
        </Suspense>
      </div>
      <div className="mt-8 md:max-w-148 text-techtona-1 bg-white/50 backdrop-filter backdrop-blur-lg border border-zinc-200 rounded-xl p-6">
        <h2 className="font-bold mb-6 flex items-center">
          <History className="size-7 inline-block mr-3 bg-techtona-2 p-1.25 rounded-full" />
          History Contribution Money
        </h2>

        <Suspense fallback={<BasicLoading />}>
          <TableContributionMoney />
        </Suspense>
      </div>
    </main>
  );
}

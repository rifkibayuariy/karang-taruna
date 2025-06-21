import Breadcrumb from "@/components/admin/ui/breadcrumb";
import FormEditContributionMoney from "./_components/form";
import TableContributionMoney from "./_components/table";
import { History } from "lucide-react";

import { getCurrentContributionMoney } from "@/lib/data/ContributionMoney";

export default async function ContributionMoney() {
  const current = await getCurrentContributionMoney();

  return (
    <main className="pb-8 md:pt-8">
      <div className="w-full flex flex-col gap-6 md:gap-3">
        <div className="w-full md:order-2">
          <Breadcrumb />
        </div>
        <h1 className="text-xl text-nowrap md:text-2xl font-bold text-center md:text-left text-techtona-1">
          Contribution Money
        </h1>
      </div>
      <FormEditContributionMoney currentNominal={current?.nominal} />
      <div className="pt-8 md:max-w-148 text-techtona-1">
        <h2 className="font-semibold pb-3 flex items-center">
          <History className="size-7 inline-block mr-3 bg-techtona-2 p-1.25 rounded-full" />
          History Contribution Money
        </h2>
        <TableContributionMoney />
      </div>
    </main>
  );
}

import Breadcrumb from "@/components/admin/breadcrumb";
import FormEditContributionMoney from "@/components/admin/master/contribution-money/form";
import TableContributionMoney from "@/components/admin/master/contribution-money/table";

import { History } from "lucide-react";

export default async function ContributionMoney() {
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
      <FormEditContributionMoney />
      <div className="pt-8 md:max-w-148 text-techtona-1">
        <h2 className="font-bold pb-3">
          <History className="size-7 inline-block mr-3 bg-techtona-2 p-1.25 rounded-full" />
          History Contribution Money
        </h2>
        <TableContributionMoney />
      </div>
    </main>
  );
}

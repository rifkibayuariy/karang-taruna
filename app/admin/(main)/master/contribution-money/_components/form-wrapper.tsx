import FormEditContributionMoney from "./form";

import { ContributionMoney } from "@/types/ContributionMoney";
import { getCurrentContributionMoney } from "@/lib/data/ContributionMoney";

export default async function FormEditContributionMoneyWrapper() {
  const current: ContributionMoney | null = await getCurrentContributionMoney();

  return <FormEditContributionMoney currentNominal={current?.nominal} />;
}

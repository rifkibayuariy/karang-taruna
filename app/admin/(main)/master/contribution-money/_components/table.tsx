import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/admin/ui/table";

import { ContributionMoney } from "@/types/ContributionMoney";
import { getContributionMoney } from "@/lib/data/ContributionMoney";
import { formatCurrency } from "@/lib/utils";

export default async function TableContributionMoney() {
  const contribution_money: ContributionMoney[] = await getContributionMoney();

  return (
    <div className="md:block overflow-x-auto">
      <Table>
        <TableHeader className="bg-techtona-3">
          <TableRow>
            <TableHead>
              <div className="flex gap-1 items-center text-techtona-1 px-3">
                Contribution Money
              </div>
            </TableHead>
            <TableHead>
              <div className="flex gap-1 items-center text-techtona-1 px-3">
                Date
              </div>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="text-techtona-1">
          {contribution_money.map((contrib) => {
            return (
              <TableRow
                key={contrib.id_monthly_contribution}
                className="hover:bg-zinc-100"
              >
                <TableCell className="py-3">
                  <span className="px-3">
                    <span className="text-xs">Rp. </span>
                    {formatCurrency(contrib.nominal)}
                  </span>
                </TableCell>
                <TableCell className="py-3">
                  <span className="px-3">
                    {contrib.creation_date.toLocaleDateString("id-ID", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    })}
                  </span>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/admin/ui/table";
import { CalendarDays } from "lucide-react";
import { BanknotesIcon } from "@heroicons/react/24/outline";

import { getContributionMoney } from "@/lib/data/ContributionMoney";
import { formatCurrency } from "@/lib/utils";

export default async function TableContributionMoney() {
  const contribution_money = await getContributionMoney();

  return (
    <div className="md:block overflow-x-auto border border-zinc-200 rounded-xl">
      <Table className="rounded-md bg-techtona-3">
        <TableHeader>
          <TableRow>
            <TableHead>
              <div className="flex gap-1 items-center text-techtona-1 px-4">
                <BanknotesIcon className="size-4" />
                Contribution Money
              </div>
            </TableHead>
            <TableHead>
              <div className="flex gap-1 items-center text-techtona-1 px-4">
                <CalendarDays className="size-4" />
                Date
              </div>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="bg-zinc-50 text-techtona-1">
          {contribution_money.map((contrib) => {
            return (
              <TableRow
                key={contrib.id_monthly_contribution}
                className="hover:bg-zinc-100"
              >
                <TableCell className="py-3">
                  <span className="px-4">
                    <span className="text-xs">Rp. </span>
                    {formatCurrency(contrib.nominal)}
                  </span>
                </TableCell>
                <TableCell className="py-3">
                  <span className="px-4">
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

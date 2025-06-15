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

const contribution_money = [
  { contribution_money: "Rp. 5.000", updated_date: "2018-07-15" },
  { contribution_money: "Rp. 2.000", updated_date: "-" },
];

export default function TableContributionMoney() {
  return (
    <div className="md:block overflow-x-auto border border-zinc-300 rounded-xl p-2">
      <Table className="rounded-md bg-techtona-3">
        <TableHeader>
          <TableRow>
            <TableHead>
              <div className="flex gap-1 items-center text-techtona-1">
                <BanknotesIcon className="size-4" />
                Contribution Money
              </div>
            </TableHead>
            <TableHead>
              <div className="flex gap-1 items-center text-techtona-1">
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
                key={contrib.contribution_money + contrib.updated_date}
                className="hover:bg-zinc-100"
              >
                <TableCell>{contrib.contribution_money}</TableCell>
                <TableCell>{contrib.updated_date}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

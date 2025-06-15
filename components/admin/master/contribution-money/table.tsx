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
    <div className="md:block overflow-x-auto bg-white rounded-xl shadow-sm md:pb-4 p-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <div className="flex gap-1 items-center">
                <BanknotesIcon className="size-4" />
                Contribution Money
              </div>
            </TableHead>
            <TableHead>
              <div className="flex gap-1 items-center">
                <CalendarDays className="size-4" />
                Date
              </div>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {contribution_money.map((contrib) => {
            return (
              <TableRow key={contrib.contribution_money + contrib.updated_date}>
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

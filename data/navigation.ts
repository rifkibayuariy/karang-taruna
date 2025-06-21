import {
  BanknotesIcon,
  MapPinIcon,
  HandRaisedIcon,
} from "@heroicons/react/24/outline";
import { Home, Users, SquareLibrary, CircleDollarSign } from "lucide-react";

export interface NavItem {
  name: string;
  href: string;
  icon: React.ElementType;
  child?: NavItem[];
}

export const menuItems: NavItem[] = [
  { name: "Dashboard", href: "/admin/dashboard", icon: Home },
  { name: "Members", href: "/admin/members", icon: Users },
  {
    name: "Monthly Meeting",
    href: "/admin/monthly-meeting",
    icon: HandRaisedIcon,
  },
  { name: "Cash", href: "/admin/cash", icon: BanknotesIcon },
  {
    name: "Master",
    href: "/admin/master",
    icon: SquareLibrary,
    child: [
      { name: "Location", href: "/admin/master/location", icon: MapPinIcon },
      {
        name: "Contribution Money",
        href: "/admin/master/contribution-money",
        icon: CircleDollarSign,
      },
    ],
  },
];

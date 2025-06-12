import {
  HomeIcon,
  UsersIcon,
  BookOpenIcon,
  BanknotesIcon,
  MapPinIcon,
  CurrencyDollarIcon,
  HandRaisedIcon,
} from "@heroicons/react/24/outline";

export const menuItems = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: HomeIcon },
  { name: 'Members', href: '/admin/members', icon: UsersIcon },
  { name: 'Monthly Meeting', href: '/admin/monthly-meeting', icon: HandRaisedIcon },
  { name: 'Cash', href: '/admin/cash', icon: BanknotesIcon },
  { name: 'Master', href: '/admin/master', icon: BookOpenIcon, child:[
    { name: 'Location', href: '/admin/master/location', icon: MapPinIcon },
    { name: 'Contribution Money', href: '/admin/master/contribution-money', icon: CurrencyDollarIcon },
  ]}
];
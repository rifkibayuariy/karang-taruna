'use client';

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import {
    HomeIcon,
    UsersIcon,
    BookOpenIcon,
    BanknotesIcon,
    MapPinIcon
} from "@heroicons/react/24/outline";
import MenuItem from "@/components/admin/menuitem";

const links = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: HomeIcon },
    { name: 'Members', href: '/admin/members', icon: UsersIcon },
    { name: 'Master', href: '/admin/master', icon: BookOpenIcon, child:[
        { name: 'Location', href: '/admin/master/location', icon: MapPinIcon },
        { name: 'Contribution Money', href: '/admin/master/contribution-money', icon: BanknotesIcon },
    ] }
];

export default function SideNavMenu({
    isExpand,
    setMenuName,
    closeSideNavOpen 
}: {
    isExpand: boolean,
    setMenuName: (menuName: string) => void,
    closeSideNavOpen: () => void
}){
    const pathname = usePathname();
    useEffect(() => {
        const activeLink = links.find(link => pathname.startsWith(link.href));
        if (activeLink) {
            setMenuName(activeLink.name);
        }
    }, [pathname, setMenuName]);

    return (
        <ul className="-mx-3 overflow-x-hidden w-100">
            {links.map((link) => {
                return (
                    <li className="mb-1" key={link.name}>
                        <MenuItem
                            isExpand={isExpand}
                            link={link}
                            closeSideNavOpen={closeSideNavOpen}
                        />
                    </li>
                );
            })}
        </ul>
    );
};

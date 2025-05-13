'use client';

import { HomeIcon, UsersIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const links = [
    { name: 'Dashboard', href: '/admin', icon: HomeIcon },
    { name: 'Members', href: '/admin/members', icon: UsersIcon }
];

export default function SideNavMenu() {
    const pathname = usePathname();
    return (
        <ul className="-mx-3 overflow-x-hidden w-100">
            {links.map((link) => {
                const LinkIcon = link.icon;
                return (
                    <li className="mb-1" key={link.name}>
                        <Link
                            key={link.name}
                            href={link.href}
                            className={clsx(
                                "flex items-center gap-4 py-2.75 px-3 rounded-xl hover:bg-gray-100", {
                                    'bg-gray-900 hover:bg-gray-800 text-white font-bold': pathname === link.href
                                }
                            )}
                        >
                            <div className="w-8 min-w-8 flex items-center justify-center">
                                <LinkIcon className="size-6"></LinkIcon>
                            </div>
                            <span className="flex-auto">{link.name}</span>
                        </Link>
                    </li>
                );
            })}
        </ul>
    );
};

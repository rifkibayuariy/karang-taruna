'use client';

import {
    ChevronLeftIcon,
    ChevronDownIcon
} from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";
import Link from "next/link";
import clsx from "clsx";
import { useState } from "react";

interface LinkType {
    name: string;
    href: string;
    icon: React.ElementType;
    child?: LinkType[];
}

export default function MenuItem({
    isExpand,
    link,
    closeSideNavOpen
}: {
    isExpand: boolean,
    link: LinkType,
    closeSideNavOpen: () => void 
}) {
    const pathname = usePathname();
    const Icon = link.icon;
    const [isOpen, setIsOpen] = useState(false);
    const toggleChildMenu = () => setIsOpen((prev) => !prev);

    return (
        <>
            {link.child ? (
                <button
                onClick={toggleChildMenu}
                    className={clsx(
                        `flex w-full items-center gap-4 py-2.75 px-3 rounded-xl hover:bg-gray-100 ${isOpen && ('border border-gray-300')}`, {
                            'border-gray-300': pathname.startsWith(link.href)
                        }
                    )}
                >
                    <div className="w-8 min-w-8 flex items-center justify-center">
                        <Icon className="size-6"></Icon>
                    </div>
                    <span className="flex-auto text-left">{link.name}</span>
                    {isOpen ? (
                        <ChevronDownIcon className="size-4"/>
                    ) : (
                        <ChevronLeftIcon className="size-4"/>
                    )}
                </button>
            ) : (
                <Link
                    key={link.name}
                    href={link.href}
                    className={clsx(
                        "flex items-center gap-4 py-2.75 px-3 rounded-xl hover:bg-gray-100", {
                            'bg-gray-900 hover:bg-gray-800 text-white font-bold': pathname === link.href
                        }
                    )}
                    onClick={closeSideNavOpen}
                >
                    <div className="w-8 min-w-8 flex items-center justify-center">
                        <Icon className="size-6"></Icon>
                    </div>
                    <span className="flex-auto text-nowrap">{link.name}</span>
                </Link>
            )}

            {link.child && isOpen && (
                <div className={`ml-7 ${!isExpand && ('md:ml-0')} mt-1 max-h-fit overflow-hidden transition-all duration-500`}>
                    <ul className="py-1.5 px-1.5 rounded-xl bg-gray-100">
                        {link.child.map((child) => {
                            const IconChild = child.icon;
                            return (
                                <li key={child.name}>
                                    <Link
                                        key={child.name}
                                        href={child.href}
                                        className={clsx(
                                            "flex items-center gap-5 py-2.5 px-3 rounded-xl hover:bg-gray-100", {
                                                'bg-gray-900 hover:bg-gray-800 text-white font-bold': pathname === child.href
                                            }
                                        )}
                                        onClick={closeSideNavOpen}
                                    >
                                        <div className="w-5 min-w-5 flex items-center justify-center">
                                            <IconChild className="size-5"></IconChild>
                                        </div>
                                        <span className="flex-auto text-nowrap">{child.name}</span>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            )}
        </>
    );
};

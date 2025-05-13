'use client';

import { useState } from "react";
import Link from "next/link";
import {
    Bars3Icon,
    XMarkIcon,
    ChevronUpIcon
} from "@heroicons/react/24/solid";
import SideNavMenu from "@/components/admin/sidenavmenu";
import Image from "next/image";

type SideNavProps = {
    isOpen: boolean;
    toggleSideNavOpen: () => void;
    closeSideNavOpen: () => void;
    isExpand: boolean;
    toggleSideNavExpand: () => void;
};

export default function SideNav({
    isOpen,
    toggleSideNavOpen,
    closeSideNavOpen,
    isExpand,
    toggleSideNavExpand
}: SideNavProps) {
    const [menuName, setMenuName] = useState("");

    return (
        <div className={`${isOpen ? 'fixed left-0 top-0 z-40 w-92 h-200 pr-0 max-h-8/10' : 'w-screen h-24'} ${isExpand ? 'md:w-100' : 'md:w-40'} md:max-h-240 md:fixed md:top-0 md-left-0 md:h-screen md:pb-8 px-8 pt-8 md:pr-8 transition-all duration-500`}>
            <div className="h-full flex flex-col bg-white rounded-xl shadow-sm px-8 overflow-hidden">
                {!isOpen && (
                    <div className="h-full flex items-center md:hidden">
                        <button onClick={toggleSideNavOpen}>
                            <Bars3Icon className="size-7"/>
                        </button>
                        <span className="flex-auto text-right font-bold text-xl">{ menuName }</span>
                    </div>
                )}
                <div className={`md:flex py-8 ${isOpen ? 'flex' : 'hidden'}`}>
                    <button className="hidden md:inline-flex flex-none" onClick={toggleSideNavExpand}>
                        <Bars3Icon className="size-8"/>
                    </button>
                    <Link
                        href="/admin/dashboard"
                        className={`flex-auto flex md:justify-center ${!isExpand && ('md:hidden')}`}
                        onClick={closeSideNavOpen}
                    >
                        <Image
                            className="mr-2"
                            width={32}
                            height={32}
                            src="/images/logo.png"
                            alt="Logo"
                        />
                        <h1 className="font-bold text-2xl">Techtona</h1>
                    </Link>
                    {isOpen && (
                        <button className="inline-flex md:hidden" onClick={closeSideNavOpen}>
                            <XMarkIcon className="size-7"/>
                        </button>
                    )}
                </div>
                <div className={`md:flex grow ${isOpen ? 'flex' : 'hidden'}`}>
                    <SideNavMenu isExpand={isExpand} setMenuName={setMenuName} closeSideNavOpen={closeSideNavOpen} />
                </div>
                <div className={`md:flex grow-0 pt-2 ${isOpen ? 'flex' : 'hidden'}`}>
                    <div className="flex w-full items-center border-t pt-6 pb-8 border-gray-200 overflow-hidden">
                        <button className="w-full flex items-center" >
                            <Image
                                className="rounded-full mr-4 flex-none"
                                width={32}
                                height={32}
                                src="/images/profile.png"
                                alt="Profile"
                            />
                            <span className="text-left text-nowrap flex-auto">Rifki Bayu Ariyanto</span>
                            <ChevronUpIcon className="size-5 flex-none"/>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

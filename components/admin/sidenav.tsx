'use client';

import { useState } from "react";
import Link from "next/link";
import {
    Bars3Icon,
    XMarkIcon
} from "@heroicons/react/24/solid";
import SideNavMenu from "@/components/admin/sidenavmenu";
import Profile from "@/components/admin/profile";
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
        <div className={`${isOpen ? 'fixed left-0 w-92 h-200 pr-0 max-h-164' : 'w-screen h-24 sticky'} ${isExpand ? 'md:w-100' : 'md:w-40'} md:max-h-240 md:fixed top-0 md:left-0 md:h-screen md:pb-8 px-8 pt-8 md:pr-8 transition-all duration-500 z-40`}>
            <div className="h-full flex flex-col bg-white rounded-xl shadow-sm px-8 relative overflow-hidden md:overflow-visible">
                {!isOpen && (
                    <div className="h-full flex items-center md:hidden">
                        <button onClick={toggleSideNavOpen} aria-label="Toggle SideNav Mobile">
                            <Bars3Icon className="size-7"/>
                        </button>
                        <span className="flex-auto text-right font-bold text-xl">{ menuName }</span>
                    </div>
                )}
                <div className={`md:flex py-8 ${isOpen ? 'flex' : 'hidden'}`}>
                    <button className="hidden md:inline-flex flex-none cursor-pointer" onClick={toggleSideNavExpand} aria-label="Toggle Sidebar">
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
                        <button className="inline-flex md:hidden" onClick={closeSideNavOpen} aria-label="Toggle SideNav Close Mobile">
                            <XMarkIcon className="size-7"/>
                        </button>
                    )}
                </div>
                <div className={`md:flex grow ${isOpen ? 'flex' : 'hidden'}`}>
                    <SideNavMenu isExpand={isExpand} setMenuName={setMenuName} closeSideNavOpen={closeSideNavOpen} />
                </div>
                <div className={`md:flex grow-0 pt-2 ${isOpen ? 'flex' : 'hidden'}`}>
                    <Profile />
                </div>
            </div>
        </div>
    );
};

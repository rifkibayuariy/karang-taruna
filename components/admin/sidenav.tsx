import Link from "next/link";
import { Bars3Icon, XMarkIcon, Squares2X2Icon } from "@heroicons/react/24/solid";
import SideNavMenu from "@/components/admin/sidenavmenu";

type SideNavProps = {
    isOpen: boolean;
    toggleSideNavOpen: () => void;
};

export default function SideNav({ isOpen, toggleSideNavOpen }: SideNavProps) {

    return (
        <div className={`${isOpen ? 'fixed left-0 top-0 z-40 w-92 h-200 pr-0 max-h-8/10' : 'w-screen h-24'} px-8 pt-8 transition-all duration-500`}>
            <div className="h-full flex flex-col bg-white rounded-xl shadow-sm px-8 overflow-hidden">
                {!isOpen && (
                    <div className="h-full flex items-center">
                        <button onClick={toggleSideNavOpen}>
                            <Bars3Icon className="size-7"/>
                        </button>
                        <span className="flex-auto text-right font-bold text-xl">Dashboard</span>
                    </div>
                )}
                <div className={`md:flex py-8 ${isOpen ? 'flex' : 'hidden'}`}>
                    <Link
                        href="/admin"
                        className="flex-auto flex"
                    >
                        <Squares2X2Icon className="size-8 h-8 mr-2"/>
                        <h1 className="font-bold text-2xl">Techtona</h1>
                    </Link>
                    {isOpen && (
                        <button className="inline-flex" onClick={toggleSideNavOpen}>
                            <XMarkIcon className="size-7"/>
                        </button>
                    )}
                </div>
                <div className={`md:flex grow ${isOpen ? 'flex' : 'hidden'}`}>
                    <SideNavMenu/>
                </div>
                <div className="grow-0 pt-2 hidden">
                </div>
            </div>
        </div>
    );
};

'use client';

import { useState } from "react";
import SideNav from "@/components/admin/sidenav";
import Overlay from "@/components/admin/overlay";

export default function SideNavLayout({ children }: { children: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);
    const toggleSideNavOpen = () => setIsOpen((prev) => !prev);
    const closeSideNavOpen = () => {
        if (isOpen) setIsOpen(false);
    };

    const [isExpand, setIsExpand] = useState(true);
    const toggleSideNavExpand = () => setIsExpand((prev) => !prev);

    return (
        <>
            <div>
                <SideNav
                    isOpen={isOpen}
                    toggleSideNavOpen={toggleSideNavOpen}
                    closeSideNavOpen={closeSideNavOpen}
                    isExpand={isExpand}
                    toggleSideNavExpand={toggleSideNavExpand}
                />
            </div>
            <div>
                { children }
            </div>

            {/* Overlay */}
            {isOpen && <Overlay mobile={true} onClick={toggleSideNavOpen} />}
        </>
    );
};

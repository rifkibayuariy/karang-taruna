'use client';

import { useState } from "react";
import SideNav from "@/components/admin/sidenav";
import Overlay from "@/components/admin/overlay";

export default function SideNavLayout({ children }: { children: React.ReactNode}) {
    const [isOpen, setIsOpen] = useState(false);
    const toggleSideNavOpen = () => setIsOpen((prev) => !prev);

    return (
        <>
            <div>
                <SideNav isOpen={isOpen} toggleSideNavOpen={toggleSideNavOpen}/>
            </div>
            <div>
                { children }
            </div>

            {/* Overlay */}
            {isOpen && <Overlay onClick={toggleSideNavOpen}/>}
        </>
    );
};

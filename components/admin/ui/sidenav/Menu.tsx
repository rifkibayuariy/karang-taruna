"use client";

import * as React from "react";
import { useSideNav } from "./context";
import SideNavMenuItem from "./MenuItem";
import type { NavItem } from "@/data/navigation";

export function SideNavMenu({ menuItems }: { menuItems: NavItem[] }) {
  const { openMobile } = useSideNav();

  return (
    <div
      className={`w-full md:flex grow px-8 h-20 ${
        openMobile ? "flex" : "hidden"
      }`}
    >
      <ul className="-mx-3 overflow-x-hidden w-100 text-sm text-zinc-800">
        {menuItems.map((item) => {
          return (
            <li className="mb-1" key={item.name}>
              <SideNavMenuItem menuItem={item} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

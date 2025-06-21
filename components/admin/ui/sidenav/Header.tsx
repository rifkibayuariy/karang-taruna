"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import { useSideNav } from "./context";
import { useActivePath } from "@/hooks/use-active-path";
import { menuItems } from "@/data/navigation";

export function SideNavHeader() {
  const { open, toggleOpen, openMobile, toggleOpenMobile, setOpenMobile } =
    useSideNav();
  const { pathname } = useActivePath();

  const activeMenuName = useMemo(() => {
    const activeItem = menuItems.find((item) => pathname.startsWith(item.href));
    return activeItem ? activeItem.name : "Techtona";
  }, [pathname]);

  return (
    <div className="w-full h-24 px-8 flex">
      {!openMobile && (
        <div className="h-full w-full flex items-center md:hidden">
          <button onClick={toggleOpenMobile} aria-label="Toggle SideNav Mobile">
            <Bars3Icon className="size-7" />
          </button>
          <span className="flex-auto text-right font-bold text-lg">
            {activeMenuName}
          </span>
        </div>
      )}
      <div className={`md:flex w-full py-8 ${openMobile ? "flex" : "hidden"}`}>
        <button
          className="hidden md:inline-flex flex-none cursor-pointer focus-visible:outline-0"
          onClick={toggleOpen}
          aria-label="Toggle Sidebar"
        >
          <Bars3Icon className="size-8" />
        </button>
        <Link
          href="/admin/dashboard"
          className={`flex-auto flex md:justify-center ${!open && "md:hidden"}`}
          onClick={() => setOpenMobile(false)}
        >
          <Image
            className="mr-2"
            width={32}
            height={32}
            src="/images/logo.png"
            alt="Logo"
          />
          <h1 className="font-bold text-2xl text-techtona-1">Techtona</h1>
        </Link>
        {openMobile && (
          <button
            className="inline-flex md:hidden"
            onClick={() => setOpenMobile(false)}
            aria-label="Toggle SideNav Close Mobile"
          >
            <XMarkIcon className="size-7" />
          </button>
        )}
      </div>
    </div>
  );
}

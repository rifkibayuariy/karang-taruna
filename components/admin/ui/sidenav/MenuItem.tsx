"use client";

import clsx from "clsx";
import Link from "next/link";
import { useSideNav } from "./context";
import { useToggle } from "@/hooks/use-toggle";
import { useActivePath } from "@/hooks/use-active-path";
import { ChevronLeftIcon, ChevronDownIcon } from "@heroicons/react/24/outline";

import type { NavItem } from "@/data/navigation";

export default function SideNavMenuItem({ menuItem }: { menuItem: NavItem }) {
  const { open, setOpenMobile } = useSideNav();
  const Icon = menuItem.icon;
  const [isOpen, , toggleChildMenu] = useToggle(false);

  const { pathname, isActive } = useActivePath();
  const isLinkActive = isActive(menuItem.href);

  return (
    <>
      {menuItem.child ? (
        <button
          onClick={toggleChildMenu}
          className={clsx(
            `flex w-full items-center gap-4 py-2 px-3 rounded-xl hover:bg-techtona-7 cursor-pointer ${
              isOpen && "bg-techtona-7"
            }`,
            {
              "bg-techtona-7": isLinkActive,
            }
          )}
        >
          <div className="w-8 min-w-8 flex items-center justify-center">
            <Icon className="size-6 text-zinc-500"></Icon>
          </div>
          <span className="flex-auto text-left">{menuItem.name}</span>
          {isOpen ? (
            <ChevronDownIcon className="size-4" />
          ) : (
            <ChevronLeftIcon className="size-4" />
          )}
        </button>
      ) : (
        <Link
          key={menuItem.name}
          href={menuItem.href}
          className={clsx(
            "flex items-center gap-4 py-2 px-3 rounded-xl hover:bg-techtona-7",
            {
              "bg-techtona-2 hover:bg-techtona-5 text-techtona-1 font-bold":
                isLinkActive,
            }
          )}
          onClick={() => setOpenMobile(false)}
        >
          <div className="w-8 min-w-8 flex items-center justify-center">
            <Icon
              className={`size-6 ${
                isLinkActive ? "text-techtona-1" : "text-zinc-500"
              }`}
            ></Icon>
          </div>
          <span className="flex-auto text-nowrap">{menuItem.name}</span>
        </Link>
      )}

      {menuItem.child && (isOpen || isLinkActive) && (
        <div
          className={`ml-7 ${
            !open && "md:ml-0"
          } mt-1 max-h-fit overflow-hidden transition-all duration-500`}
        >
          <ul className="py-1.5 px-1.5 space-y-1 rounded-2xl bg-techtona-7">
            {menuItem.child.map((child) => {
              const IconChild = child.icon;
              return (
                <li key={child.name}>
                  <Link
                    key={child.name}
                    href={child.href}
                    className={clsx(
                      "flex items-center gap-5 py-2 px-3 rounded-xl hover:bg-techtona-3",
                      {
                        "bg-techtona-2 hover:bg-gray-800 text-techtona-1 font-bold":
                          pathname.startsWith(child.href),
                      }
                    )}
                    onClick={() => setOpenMobile(false)}
                  >
                    <div className="w-5 min-w-5 flex items-center justify-center">
                      <IconChild
                        className={`size-5 ${
                          pathname.startsWith(child.href)
                            ? "text-techtona-1"
                            : "text-zinc-500"
                        }`}
                      ></IconChild>
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
}

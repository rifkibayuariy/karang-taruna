"use client";

import { useSideNav } from "./context";

export function SideNav({ children }: { children: React.ReactNode }) {
  const { open, openMobile } = useSideNav();

  return (
    <div
      className={`${
        openMobile
          ? "fixed left-0 w-80 h-200 pr-0 max-h-142"
          : "w-full h-22 sticky"
      } ${
        open ? "md:w-100" : "md:w-40"
      } md:max-h-240 md:fixed top-0 md:left-0 md:h-screen md:pb-8 px-8 pt-8 md:pr-8 transition-all duration-500 z-40`}
    >
      <div
        className={`h-full flex flex-col ${
          openMobile == false ? "bg-techtona-1 text-white" : "bg-techtona-3"
        } md:bg-techtona-3 md:text-techtona-1 rounded-xl shadow-sm relative overflow-hidden md:overflow-visible justify-between`}
      >
        {children}
      </div>
    </div>
  );
}

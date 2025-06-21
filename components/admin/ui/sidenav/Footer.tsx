"use client";

import { useSideNav } from "./context";

export function SideNavFooter({ children }: { children?: React.ReactNode }) {
  const { openMobile } = useSideNav();

  return (
    <div
      className={`w-full md:flex grow-0 px-8 h-20 ${
        openMobile ? "flex" : "hidden"
      }`}
    >
      <div className="w-full">{children}</div>
    </div>
  );
}

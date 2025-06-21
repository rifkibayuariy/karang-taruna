"use client";

import { useSideNav } from "./context";

export function SideNavContent({ children }: { children: React.ReactNode }) {
  const { open } = useSideNav();

  return (
    <main
      className={`${
        open ? "md:ml-92" : "md:ml-32"
      } h-full px-8 pt-8 transition-all duration-500`}
    >
      {children}
    </main>
  );
}

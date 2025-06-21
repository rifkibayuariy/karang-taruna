"use client";

import { createContext, useContext, useMemo } from "react";
import { useToggle } from "@/hooks/use-toggle";
import Overlay from "@/components/admin/ui/overlay";

type SideNavContextProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  toggleOpen: () => void;
  openMobile: boolean;
  setOpenMobile: (open: boolean) => void;
  toggleOpenMobile: () => void;
};

const SideNavContext = createContext<SideNavContextProps | null>(null);

export function useSideNav() {
  const context = useContext(SideNavContext);
  if (!context) {
    throw new Error("useSidenav must be used within a SidenavProvider.");
  }
  return context;
}

export function SideNavProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen, toggleOpen] = useToggle(true);
  const [openMobile, setOpenMobile, toggleOpenMobile] = useToggle(false);

  const contextValue = useMemo(
    () => ({
      open,
      setOpen,
      toggleOpen,
      openMobile,
      setOpenMobile,
      toggleOpenMobile,
    }),
    [open, openMobile]
  );

  return (
    <SideNavContext.Provider value={contextValue}>
      {children}
      {openMobile && (
        <Overlay
          mobile={true}
          onClick={toggleOpenMobile}
          opacity="opacity-50"
        />
      )}
    </SideNavContext.Provider>
  );
}

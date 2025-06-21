"use client";

import {
  SideNavProvider,
  SideNav,
  SideNavHeader,
  SideNavMenu,
  SideNavContent,
  SideNavFooter,
  SideNavProfile,
} from "@/components/admin/ui/sidenav";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/admin/ui/avatar";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { menuItems } from "@/data/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-zinc-50 min-h-screen">
      <SideNavProvider>
        <SideNav>
          <SideNavHeader />
          <SideNavMenu menuItems={menuItems} />
          <SideNavFooter>
            <SideNavProfile>
              <Avatar className="mr-3 flex-none rounded-md">
                <AvatarImage src="/images/profile.png" />
                <AvatarFallback>
                  <UserCircleIcon className="size-8" />
                </AvatarFallback>
              </Avatar>
              <div className="flex-auto flex flex-col">
                <span className="text-left text-nowrap">
                  Rifki Bayu Ariyanto
                </span>
                <span className="text-left font-light text-nowrap text-[11px]">
                  Secretary
                </span>
              </div>
            </SideNavProfile>
          </SideNavFooter>
        </SideNav>

        <SideNavContent>{children}</SideNavContent>
      </SideNavProvider>
    </div>
  );
}

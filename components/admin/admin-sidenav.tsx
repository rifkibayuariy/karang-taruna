import {
  SideNav,
  SideNavContent,
  SideNavFooter,
  SideNavHeader,
  SideNavMenu,
  SideNavProfile,
  SideNavProvider,
} from "@/components/admin/ui/sidenav";
import Image from "next/image";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/admin/ui/avatar";
import { UserCircleIcon } from "@heroicons/react/24/solid";

export default function AdminSideNav({
  children,
}: {
  children: React.ReactNode;
}) {
  const iconImage = (
    <Image
      className="mr-2"
      width={32}
      height={32}
      src="/images/logo.png"
      alt="Logo"
    />
  );

  return (
    <SideNavProvider>
      <SideNav>
        <SideNavHeader title="Techtona" iconImage={iconImage} />
        <SideNavMenu></SideNavMenu>
        <SideNavFooter>
          <SideNavProfile>
            <Avatar className="mr-4 flex-none rounded-md">
              <AvatarImage src="/images/profile.png" />
              <AvatarFallback>
                <UserCircleIcon className="size-8" />
              </AvatarFallback>
            </Avatar>
            <div className="flex-auto flex flex-col">
              <span className="text-left text-nowrap">Rifki Bayu Ariyanto</span>
              <span className="text-left font-light text-nowrap text-[11px]">
                Secretary
              </span>
            </div>
          </SideNavProfile>
        </SideNavFooter>
      </SideNav>
      <SideNavContent>{children}</SideNavContent>
    </SideNavProvider>
  );
}

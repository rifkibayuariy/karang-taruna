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
            <Image
              className="rounded-full mr-4 flex-none"
              width={32}
              height={32}
              src="/images/profile.png"
              alt="Profile"
            />
            <span className="text-left text-nowrap flex-auto">
              Rifki Bayu Ariyanto
            </span>
          </SideNavProfile>
        </SideNavFooter>
      </SideNav>
      <SideNavContent>{children}</SideNavContent>
    </SideNavProvider>
  );
}

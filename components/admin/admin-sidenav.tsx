import {
  SideNav,
  SideNavContent,
  SideNavFooter,
  SideNavHeader,
  SideNavMenu,
  SideNavProvider
} from "@/components/admin/ui/sidenav";
import Image from "next/image";

export default function AdminSideNav({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <SideNavProvider>
      <SideNav>
        <SideNavHeader
          title='Techtona'
          iconImage=
            <Image
              className="mr-2"
              width={32}
              height={32}
              src="/images/logo.png"
              alt="Logo"
            />
        />
        <SideNavMenu>
        </SideNavMenu>
        <SideNavFooter></SideNavFooter>
      </SideNav>
      <SideNavContent>
        { children }
      </SideNavContent>
    </SideNavProvider>
  )
};

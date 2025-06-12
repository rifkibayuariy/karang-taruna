'use client'

import * as React from "react"
import Image from "next/image";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import Link from "next/link";
import {
  Bars3Icon,
  XMarkIcon
} from "@heroicons/react/24/solid";
import {
    ChevronLeftIcon,
    ChevronDownIcon
} from "@heroicons/react/24/outline";
import Overlay from "@/components/admin/ui/overlay";

import { menuItems } from "@/components/admin/data/menu-items";

type SideNavContextProps = {
  open: boolean
  setOpen: (open: boolean) => void
  toggleOpen: () => void
  openMobile: boolean
  setOpenMobile: (open: boolean) => void
  toggleOpenMobile: () => void
  menuName: string
  setMenuName: (menuName: string) => void
}

interface SideNavHeaderProps {
  title?: string;
  iconImage?: React.ReactNode;
}

interface SideNavMenuItemProps {
    name: string;
    href: string;
    icon: React.ElementType;
    child?: SideNavMenuItemProps[];
}

const SideNavContext = React.createContext<SideNavContextProps | null>(null)

function useSideNav() {
  const context = React.useContext(SideNavContext)
  if (!context) {
    throw new Error("useSidenav must be used within a SidenavProvider.")
  }
  return context
}

function SideNavProvider({
  children
}: {
  children: React.ReactNode
}) {
  const [open, setOpen] = React.useState(true)
  const [openMobile, setOpenMobile] = React.useState(false)
  const [menuName, setMenuName] = React.useState('Techtona')

  const toggleOpen = () => setOpen((prev) => !prev)
  const toggleOpenMobile = () => setOpenMobile((prev) => !prev)

  const contextValue = React.useMemo<SideNavContextProps>(
    () => ({
      open,
      setOpen,
      toggleOpen,
      openMobile,
      setOpenMobile,
      toggleOpenMobile,
      menuName,
      setMenuName
    }),
    [open, setOpen, toggleOpen, openMobile, setOpenMobile, toggleOpenMobile, menuName, setMenuName]
  )

  return (
    <SideNavContext.Provider value={contextValue}>
      { children }
      
      {/* Overlay */}
      {openMobile && <Overlay mobile={true} onClick={toggleOpenMobile} opacity="opacity-50"/>}
    </SideNavContext.Provider>
  )
}

function SideNav({
  children
}: {
  children: React.ReactNode
}) {
  const { open, openMobile, toggleOpenMobile, setMenuName } = useSideNav()

  const pathname = usePathname();
    React.useEffect(() => {
        const activeLink = menuItems.find(menuItems => pathname.startsWith(menuItems.href));
        if (activeLink) {
          setMenuName(activeLink.name);
        }
    }, [pathname, setMenuName]);

  return (
    <div
      className={`${openMobile ? 'fixed left-0 w-92 h-200 pr-0 max-h-164' : 'w-full h-22 sticky'} ${open ? 'md:w-100' : 'md:w-40'} md:max-h-240 md:fixed top-0 md:left-0 md:h-screen md:pb-8 px-8 pt-8 md:pr-8 transition-all duration-500 z-40`}>
      <div className="h-full flex flex-col bg-white rounded-xl shadow-sm relative overflow-hidden md:overflow-visible justify-between">
        { children }
      </div>
    </div>
  )
}

function SideNavHeader({
  title ='Techtona',
  iconImage = (
    <Image
      className="mr-2"
      width={32}
      height={32}
      src="/images/logo.png"
      alt="Logo"
    />
  )
}: SideNavHeaderProps) {
  const {
    open,
    openMobile,
    toggleOpen,
    toggleOpenMobile,
    setOpenMobile,
    menuName
  } = useSideNav()

  return (
    <div
      className="w-full h-24 px-8 flex">
        {!openMobile && (
          <div className="h-full w-full flex items-center md:hidden">
            <button onClick={toggleOpenMobile} aria-label="Toggle SideNav Mobile">
                <Bars3Icon className="size-7"/>
            </button>
            <span className="flex-auto text-right font-bold text-xl">{ menuName }</span>
          </div>
        )}
        <div className={`md:flex w-full py-8 ${openMobile ? 'flex' : 'hidden'}`}>
          <button
            className="hidden md:inline-flex flex-none cursor-pointer"
            onClick={toggleOpen}
            aria-label="Toggle Sidebar">
              <Bars3Icon className="size-8"/>
          </button>
          <Link
            href="/admin/dashboard"
            className={`flex-auto flex md:justify-center ${!open && ('md:hidden')}`}
            onClick={() => setOpenMobile(false)}>
              { iconImage }
              <h1 className="font-bold text-2xl">{ title }</h1>
          </Link>
          {openMobile && (
            <button
              className="inline-flex md:hidden"
              onClick={() => setOpenMobile(false)}
              aria-label="Toggle SideNav Close Mobile">
                <XMarkIcon className="size-7"/>
            </button>
          )}
      </div>
    </div>
  )
}

function SideNavMenu() {
  const { openMobile } = useSideNav()

  return (
    <div
      className={`w-full md:flex grow px-8 h-20 ${openMobile ? 'flex' : 'hidden'}`}>
        <ul className="-mx-3 overflow-x-hidden w-100 text-sm">
          {menuItems.map((item) => {
            return (
              <li className="mb-1" key={item.name}>
                <SideNavMenuItem menuItem={item}/>
              </li>
            );
          })}
        </ul>
    </div>
  )
}

function SideNavMenuItem({
  menuItem
}: {
  menuItem: SideNavMenuItemProps
}) {
  const pathname = usePathname();
  const Icon = menuItem.icon;
  const [isOpen, setIsOpen] = React.useState(false);
  const toggleChildMenu = () => setIsOpen((prev) => !prev);

  const {
    open,
    setOpenMobile,
    menuName
  } = useSideNav()

  return (
    <>
      {menuItem.child ? (
        <button
          onClick={toggleChildMenu}
            className={clsx(
              `flex w-full items-center gap-4 py-2 px-3 rounded-xl hover:bg-gray-100 cursor-pointer ${isOpen && ('border border-gray-200')}`, {
                'border border-gray-200': pathname.startsWith(menuItem.href)
              }
            )}
        >
          <div className="w-8 min-w-8 flex items-center justify-center">
            <Icon className="size-6"></Icon>
          </div>
          <span className="flex-auto text-left">{menuItem.name}</span>
          {isOpen ? (
            <ChevronDownIcon className="size-4"/>
          ) : (
            <ChevronLeftIcon className="size-4"/>
          )}
        </button>
      ) : (
        <Link
          key={menuItem.name}
          href={menuItem.href}
          className={clsx(
            "flex items-center gap-4 py-2 px-3 rounded-xl hover:bg-gray-100", {
              'bg-gray-900 hover:bg-gray-800 text-white font-bold': pathname === menuItem.href
            }
          )}
          onClick={() => setOpenMobile(false)}
        >
          <div className="w-8 min-w-8 flex items-center justify-center">
            <Icon className="size-6"></Icon>
          </div>
          <span className="flex-auto text-nowrap">{menuItem.name}</span>
        </Link>
      )}

      {menuItem.child && (isOpen || pathname.startsWith(menuItem.href)) && (
        <div
          className={`ml-7 ${!open && ('md:ml-0')} mt-1 max-h-fit overflow-hidden transition-all duration-500`}>
            <ul className="py-1.5 px-1.5 rounded-2xl bg-gray-100">
              {menuItem.child.map((child) => {
                const IconChild = child.icon;
                return (
                  <li key={child.name}>
                    <Link
                      key={child.name}
                      href={child.href}
                      className={clsx(
                          "flex items-center gap-5 py-2 px-3 rounded-xl hover:bg-gray-100", {
                            'bg-gray-900 hover:bg-gray-800 text-white font-bold': pathname === child.href
                          }
                      )}
                      onClick={() => setOpenMobile(false)}
                    >
                      <div className="w-5 min-w-5 flex items-center justify-center">
                          <IconChild className="size-5"></IconChild>
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
  )
}

function SideNavFooter({
  children
}: {
  children?: React.ReactNode
}) {
  const { openMobile } = useSideNav()

  return (
    <div
      className={`w-full md:flex grow-0 px-8 h-20 ${openMobile ? 'flex' : 'hidden'}`}>
        <div className="w-full border-t border-gray-200 bg-white">
          { children }
        </div>
    </div>
  )
}

function SideNavContent({
  children
}: {
  children: React.ReactNode
}) {
  const { open } = useSideNav()

  return (
    <main
      className={`${open ? 'md:ml-92' : 'md:ml-32'} h-full px-8 pt-8 transition-all duration-500`}>
        { children }
    </main>
  )
}

export {
  SideNav,
  SideNavContent,
  SideNavFooter,
  SideNavHeader,
  SideNavMenu,
  SideNavMenuItem,
  SideNavProvider,
  useSideNav
}
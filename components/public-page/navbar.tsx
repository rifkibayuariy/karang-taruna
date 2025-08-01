"use client";

import React, { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useToggle } from "@/hooks/use-toggle";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/admin/ui/button";

const NavLink = ({
  href,
  children,
  hasScrolled,
  isHomePage,
}: {
  href: string;
  children: React.ReactNode;
  hasScrolled: boolean;
  isHomePage: boolean;
}) => (
  <Link
    href={href}
    className={`transition-colors duration-300 px-3 py-2 rounded-md font-medium ${
      hasScrolled || !isHomePage
        ? "text-techtona-1"
        : "text-white hover:text-techtona-1"
    }`}
  >
    {children}
  </Link>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useToggle();
  const [hasScrolled, setHasScrolled] = useToggle();

  const pathname = usePathname();
  const isHomePage = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setHasScrolled(true);
      } else {
        setHasScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [setHasScrolled]);

  const navItems = [
    { href: "/", label: "Home" },
    { href: "#aboutUs", label: "About Us" },
    { href: "#activity", label: "Activity" },
    { href: "#gallery", label: "Gallery" },
    { href: "#contact", label: "Contact" },
    { href: "/about-team", label: "About Teams" },
  ];

  return (
    <nav
      className={`fixed w-full top-0 left-0 z-50 transition-all duration-300 ${
        hasScrolled || !isHomePage
          ? "bg-white/90 shadow-md backdrop-blur-sm text-techtona-1"
          : "bg-transparent text-white"
      }`}
    >
      <div className="container mx-auto px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0 ">
            <Link href="/" className="transition-colors">
              <div className="flex flex-row gap-4 items-center">
                <div className="">
                  <Image
                    src="/images/logo.png"
                    alt="Logo"
                    width={32}
                    height={32}
                  />
                </div>
                <h1 className="font-semibold text-2xl">M3</h1>
              </div>
            </Link>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <NavLink
                  key={item.href}
                  href={item.href}
                  hasScrolled={hasScrolled}
                  isHomePage={isHomePage}
                >
                  <span
                    className={`${
                      item.label == "About Teams" && "animate-pulse"
                    }`}
                  >
                    {item.label}
                  </span>
                </NavLink>
              ))}
            </div>
          </div>

          <div className="hidden md:block">
            <Link href="#gabung" className="transition-colors">
              <Button
                className={`font-black cursor-pointer shadow-none ${
                  hasScrolled || !isHomePage
                    ? "bg-techtona-1 shadow-md text-white hover:bg-techtona-4"
                    : "bg-white text-techtona-1 hover:bg-techtona-2 hover:text-techtona-1"
                }`}
              >
                Join Us !
              </Button>
            </Link>
          </div>

          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              aria-controls="mobile-menu"
              className=" focus:ring-0 focus:border-none p-0 cursor-pointer"
              aria-expanded="false"
            >
              <span className="sr-only">Open Menu</span>
              {isOpen ? <X className="size-7" /> : <Menu className="size-7" />}
            </button>
          </div>
        </div>
      </div>

      {/* Menu Mobile */}
      {isOpen && (
        <div className="md:hidden px-6" id="mobile-menu">
          <div
            className={`px-6 pb-8 space-y-0.5  rounded-xl ${
              hasScrolled || !isHomePage
                ? "bg-transparent"
                : "bg-white/20 backdrop-blur-sm pt-8"
            }`}
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  hasScrolled || !isHomePage
                    ? "text-techtona-1"
                    : "text-white hover:bg-white/20"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-3">
              <Link href="#gabung" className="transition-colors w-full">
                <Button
                  className={`font-black cursor-pointer shadow-none w-full ${
                    hasScrolled || !isHomePage
                      ? "bg-techtona-1 shadow-md text-white hover:bg-techtona-4"
                      : "bg-white text-gray-800 hover:bg-white/60 hover:backdrop-blur-sm"
                  }`}
                >
                  Join Us !
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

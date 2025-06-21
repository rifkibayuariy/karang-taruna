"use client";

import { useSideNav } from "./context";
import { useToggle } from "@/hooks/use-toggle";
import { EllipsisVertical, LogOut } from "lucide-react";
import Overlay from "@/components/admin/ui/overlay";
import Link from "next/link";

export function SideNavProfile({ children }: { children?: React.ReactNode }) {
  const { setOpenMobile } = useSideNav();
  const [modalOpen, setModalOpen, toggleModal] = useToggle(false);

  return (
    <div className="relative text-sm -mx-3 h-full">
      <div className="w-full h-full flex items-center justify-center pb-6">
        <button
          className={`w-full flex items-center cursor-pointer bg-techtona-1 rounded-xl px-3 py-2 overflow-hidden text-white`}
          onClick={() => setModalOpen(true)}
          aria-label="Profile"
        >
          {children}
          <EllipsisVertical className="size-4 flex-none text-white" />
        </button>
      </div>

      {modalOpen && (
        <>
          <div className="absolute flex flex-col w-64 p-3 gap-1 bg-white rounded-xl shadow-lg bottom-full mb-2 z-50">
            <Link
              href="/admin/profile"
              onClick={() => {
                setModalOpen(false);
                setOpenMobile(false);
              }}
              className="w-full flex items-center hover:bg-techtona-7 px-3 py-2 rounded-xl cursor-pointer text-techtona-1 font-semibold"
            >
              {children}
            </Link>

            <button className="w-full flex items-center text-red-500 bg-red-200 hover:bg-red-300 hover:text-white px-3 py-2 rounded-xl cursor-pointer">
              <div className="w-8 h-8 flex items-center justify-center mr-4 bg-red-400 text-white rounded-lg">
                <LogOut className="size-5" />
              </div>
              <span className="text-left text-nowrap flex-auto font-semibold">
                Logout
              </span>
            </button>
          </div>

          <Overlay
            mobile={false}
            onClick={toggleModal}
            opacity="opacity-25 md:opacity-10"
          />
        </>
      )}
    </div>
  );
}

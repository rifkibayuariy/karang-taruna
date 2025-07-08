"use client";

import { useSideNav } from "./context";
import { useToggle } from "@/hooks/use-toggle";
import { EllipsisVertical, LogOut, CircleAlert, CircleX } from "lucide-react";
import Overlay from "@/components/admin/ui/overlay";
import Link from "next/link";
import { logoutAction } from "./form-logout";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/admin/ui/alert-dialog";
import { Button } from "@/components/admin/ui/button";

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
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  size="lg"
                  className="w-full flex items-center text-red-500 bg-red-200 hover:bg-red-300 hover:text-white px-3 rounded-lg cursor-pointer"
                >
                  <div className="w-7 h-7 flex items-center justify-center mr-2 bg-red-400 text-white rounded-md">
                    <LogOut className="size-4" />
                  </div>
                  <span className="text-left text-nowrap flex-auto font-semibold">
                    Logout
                  </span>
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader className="mb-4">
                  <div className="flex justify-center">
                    <CircleAlert className="size-14 bg-red-400 p-2 text-white rounded-full" />
                  </div>
                  <AlertDialogTitle className="text-center text-red-500">
                    Logout?
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text-center text-zinc-700">
                    Exit this application?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="md:justify-center">
                  <AlertDialogCancel asChild>
                    <button onClick={() => setModalOpen(false)}>
                      <CircleX className="size-4" />
                      <span className="font-semibold text-zinc-700">
                        Cancel
                      </span>
                    </button>
                  </AlertDialogCancel>
                  <AlertDialogAction asChild>
                    <button
                      className="bg-red-400 hover:bg-red-500"
                      onClick={logoutAction}
                    >
                      <LogOut className="size-4" />
                      <span className="font-semibold">Logout</span>
                    </button>
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
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

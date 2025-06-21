"use client";

import { UserGroupIcon } from "@heroicons/react/24/solid";
import { CircleAlert, CircleX } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

export default function Tabs({ tab }: { tab: string }) {
  const pathname = usePathname();
  const { replace } = useRouter();

  function changeTab(tab: string) {
    const params = new URLSearchParams();
    if (tab) {
      params.set("tab", tab);
    }
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="flex flex-row bg-techtona-3 rounded-xl text-sm font-bold">
      <button
        onClick={() => {
          changeTab("all");
        }}
        className={`py-2.5 px-4 flex flex-auto rounded-lg justify-center items-center ${
          tab == "all" ? "bg-techtona-1 text-white" : "text-techtona-1"
        } cursor-pointer`}
        aria-label="All Member"
      >
        <UserGroupIcon className="size-5"></UserGroupIcon>
      </button>
      <button
        onClick={() => {
          changeTab("pending");
        }}
        className={`py-2.5 px-4 flex flex-auto rounded-lg justify-center items-center ${
          tab == "pending" ? "bg-techtona-1 text-white" : "text-techtona-1"
        } cursor-pointer`}
      >
        <CircleAlert className="size-5 mr-2"></CircleAlert>
        <span>Pending</span>
      </button>
      <button
        onClick={() => {
          changeTab("rejected");
        }}
        className={`py-2.5 px-4 flex flex-auto rounded-lg justify-center items-center ${
          tab == "rejected" ? "bg-techtona-1 text-white" : "text-techtona-1"
        } cursor-pointer`}
      >
        <CircleX className="size-5 mr-2"></CircleX>
        <span>Rejected</span>
      </button>
    </div>
  );
}

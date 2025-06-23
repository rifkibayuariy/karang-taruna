"use client";

import { usePathname, useRouter } from "next/navigation";
import { UserGroupIcon } from "@heroicons/react/24/solid";
import { CircleAlert, CircleX } from "lucide-react";

export default function MemberTabs({ tab }: { tab: string }) {
  const pathname = usePathname();
  const { replace } = useRouter();

  const changeTab = (tab: string) => {
    const params = new URLSearchParams();
    if (tab) params.set("tab", tab);
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex flex-row bg-techtona-3 rounded-xl text-sm font-bold">
      <button
        className={`py-2.5 px-4 flex flex-auto rounded-lg justify-center items-center ${
          tab == "all" ? "bg-techtona-1 text-white" : "text-techtona-1"
        } cursor-pointer`}
        onClick={() => changeTab("all")}
        aria-label="All Member"
      >
        <UserGroupIcon className="size-5"></UserGroupIcon>
      </button>
      <button
        className={`py-2.5 px-4 flex flex-auto rounded-lg justify-center items-center ${
          tab == "pending" ? "bg-techtona-1 text-white" : "text-techtona-1"
        } cursor-pointer`}
        onClick={() => changeTab("pending")}
        aria-label="Pending Member"
      >
        <CircleAlert className="size-5 mr-2"></CircleAlert>
        <span>Pending</span>
      </button>
      <button
        className={`py-2.5 px-4 flex flex-auto rounded-lg justify-center items-center ${
          tab == "rejected" ? "bg-techtona-1 text-white" : "text-techtona-1"
        } cursor-pointer`}
        onClick={() => changeTab("rejected")}
        aria-label="Rejected Member"
      >
        <CircleX className="size-5 mr-2"></CircleX>
        <span>Rejected</span>
      </button>
    </div>
  );
}

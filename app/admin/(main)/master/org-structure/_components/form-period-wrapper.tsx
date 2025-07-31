"use client";

import FormPeriod from "./form-period";
import { useToggle } from "@/hooks/use-toggle";
import { Button } from "@/components/admin/ui/button";
import { ChevronUp, Plus } from "lucide-react";

export default function FormPeriodWrapper() {
  const [isCollapse, setIsCollapse] = useToggle();

  return (
    <div
      className={`mt-8 text-techtona-1 bg-white/50 backdrop-filter backdrop-blur-lg border border-zinc-200 rounded-xl ${
        isCollapse ? "lg:w-160" : "lg:w-fit"
      } h-fit`}
    >
      {isCollapse ? (
        <div className="p-6 lg:p-8 relative">
          <FormPeriod mode="new" onSuccess={() => setIsCollapse(false)} />
          <Button
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 -mb-5 bg-transparent shadow-none text-techtona-1 hover:bg-transparent cursor-pointer"
            onClick={() => setIsCollapse(false)}
          >
            <ChevronUp className="size-7 lg:size-8 p-1 bg-techtona-2 text-techtona-1 rounded-full" />
          </Button>
        </div>
      ) : (
        <Button
          variant="outline"
          className="w-full h-full border-none bg-techtona-1 hover:bg-techtona-4 text-white hover:text-techtona-2 cursor-pointer shadow-none"
          onClick={() => setIsCollapse(true)}
        >
          <Plus className="size-6 rounded-full" />
          <span className="font-semibold">New Period</span>
        </Button>
      )}
    </div>
  );
}

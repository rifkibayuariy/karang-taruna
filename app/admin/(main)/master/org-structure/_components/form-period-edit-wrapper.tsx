"use client";

import { OrganizationPeriod } from "@/types/OrganizationPeriod";
import FormPeriod from "./form-period";
import { Button } from "@/components/admin/ui/button";
import { SquarePen, X } from "lucide-react";
import { useToggle } from "@/hooks/use-toggle";

export default function FormPeriodEditWrapper({
  period,
}: {
  period: OrganizationPeriod;
}) {
  const [isCollapse, setIsCollapse] = useToggle();

  return (
    <>
      {isCollapse ? (
        <div className="mt-6 p-4 border border-zinc-200 rounded-xl lg:w-160 relative">
          <FormPeriod
            mode="edit"
            orgPeriod={period}
            onSuccess={() => setIsCollapse(false)}
          />
          <Button
            size="sm"
            className="absolute bottom-0 -mb-4 rounded-full left-1/2 transform -translate-x-1/2 w-8 h-8 bg-red-200 text-red-500 hover:bg-red-400 hover:text-white cursor-pointer"
            onClick={() => setIsCollapse(false)}
          >
            <X />
            <span className="sr-only">Cancel</span>
          </Button>
        </div>
      ) : (
        <>
          <div className="mt-4 flex flex-row items-center text-sm gap-4">
            <div className="my-auto">
              <Button
                variant="outline"
                className="h-full shadow-none text-techtona-1 border-zinc-200 hover:bg-techtona-2/20 hover:border-techtona-1/20 cursor-pointer"
                onClick={() => setIsCollapse(true)}
              >
                <SquarePen />
              </Button>
            </div>
            <div className="flex-auto flex flex-col gap-0.5">
              <div>
                <span>Period:&ensp;</span>
                <span className="font-bold text-xs">
                  {new Intl.DateTimeFormat("en-GB").format(
                    new Date(period.start_periode)
                  )}
                </span>
                <span>&ensp;-&ensp;</span>
                <span className="font-bold text-xs">
                  {new Intl.DateTimeFormat("en-GB").format(
                    new Date(period.end_periode)
                  )}
                </span>
              </div>
              <div>
                <span>Description:&ensp;</span>
                <span>{period.description ? period.description : "-"}</span>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

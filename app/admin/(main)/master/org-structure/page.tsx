import Breadcrumb from "@/components/admin/ui/breadcrumb";
import { LayoutList } from "lucide-react";

export default function OrganizationStructurePage() {
  return (
    <main className="pb-8 md:pt-8">
      <div className="w-full flex flex-col gap-8 md:gap-4">
        <div className="w-full md:order-2">
          <Breadcrumb />
        </div>
        <h1 className="flex justify-center md:justify-start items-center gap-4 text-xl text-nowrap md:text-2xl font-bold text-techtona-1">
          <LayoutList className="p-1.5 rounded-md bg-techtona-2 size-8" />
          Organization Structure
        </h1>
      </div>
    </main>
  );
}

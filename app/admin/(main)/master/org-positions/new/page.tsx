import { Suspense } from "react";
import Breadcrumb from "@/components/admin/ui/breadcrumb";
import { Plus } from "lucide-react";
import FormOrganizationPositionSkeleton from "../_components/form-skeleton";
import FormOrganizationPositionWrapper from "../_components/form-wrapper";

export default async function NewOrganizationPositions() {
  return (
    <main className="pb-8 md:pt-8">
      <div className="w-full flex flex-col gap-6 md:gap-3 pb-6 md:pb-8">
        <div className="w-full md:order-2">
          <Breadcrumb />
        </div>
      </div>
      <div className="md:max-w-140 border-1 rounded-xl p-8 bg-white/50 backdrop-filter backdrop-blur-lg border-zinc-200">
        <h1 className="text-xl text-nowrap md:text-2xl font-bold flex justify-center md:justify-start items-center gap-2 text-techtona-1 mb-10">
          <Plus className="p-1.5 bg-techtona-2 rounded-full size-7" />
          New Position
        </h1>
        <Suspense fallback={<FormOrganizationPositionSkeleton />}>
          <FormOrganizationPositionWrapper mode="new" />
        </Suspense>
      </div>
    </main>
  );
}

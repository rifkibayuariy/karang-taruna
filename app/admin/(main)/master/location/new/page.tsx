import { Suspense } from "react";
import Breadcrumb from "@/components/admin/ui/breadcrumb";
import FormLocationWrapper from "../_components/form-wrapper";
import FormLocationSkeleton from "../_components/form-skeleton";

export default function NewLocationPage() {
  return (
    <main className="pb-8 md:pt-8">
      <div className="w-full flex flex-col gap-6 md:gap-3 pb-6 md:pb-8">
        <div className="w-full md:order-2">
          <Breadcrumb />
        </div>
      </div>
      <div className="md:max-w-140 border-1 rounded-xl p-8 md:border-zinc-200">
        <h1 className="text-xl text-nowrap md:text-2xl font-bold text-center md:text-left text-techtona-1 mb-6 md:mb-10">
          New Location
        </h1>
        <Suspense fallback={<FormLocationSkeleton />}>
          <FormLocationWrapper mode="new" />
        </Suspense>
      </div>
    </main>
  );
}

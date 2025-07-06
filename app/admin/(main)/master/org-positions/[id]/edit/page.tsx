import Breadcrumb from "@/components/admin/ui/breadcrumb";
import { SquarePen } from "lucide-react";
import FormOrganizationPositionSkeleton from "../../_components/form-skeleton";

export default async function EditOrganizationPositions({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <main className="pb-8 md:pt-8">
      <div className="w-full flex flex-col gap-6 md:gap-3 pb-6 md:pb-8">
        <div className="w-full md:order-2">
          <Breadcrumb />
        </div>
      </div>
      <div className="md:max-w-140 border-1 rounded-xl p-8 bg-white/50 backdrop-filter backdrop-blur-lg border-zinc-200">
        <h1 className="text-xl text-nowrap md:text-2xl font-bold flex justify-center md:justify-start items-center gap-2 text-techtona-1 mb-10">
          <SquarePen className="p-1 bg-techtona-2 rounded-md size-7" />
          Edit Position
        </h1>
        <FormOrganizationPositionSkeleton />
      </div>
    </main>
  );
}

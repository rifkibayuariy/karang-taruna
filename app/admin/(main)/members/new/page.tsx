import Breadcrumb from "@/components/admin/ui/breadcrumb";
import FormMember from "../_components/form";

import { getAllLocation } from "@/lib/data/Location";

export default async function NewLocationPage() {
  const locations = await getAllLocation();

  return (
    <main className="pb-8 md:pt-8">
      <div className="w-full flex flex-col gap-6 md:gap-3 pb-6 md:pb-8">
        <div className="w-full md:order-2">
          <Breadcrumb />
        </div>
      </div>
      <div className="md:max-w-164 border-1 rounded-xl p-8 md:border-zinc-200">
        <h1 className="text-xl text-nowrap md:text-2xl font-bold text-center md:text-left text-techtona-1 mb-6 md:mb-10">
          New Member
        </h1>
        <FormMember mode="new" locations={locations} />
      </div>
    </main>
  );
}

import Breadcrumb from "@/components/admin/ui/breadcrumb";
import FormLocationDialog from "./_components/form";
import { PlusIcon } from "@heroicons/react/24/solid";
import { Button } from "@/components/admin/ui/button";
import {
  DataTableSearch,
  DataTablePagination,
} from "@/components/admin/ui/data-table";
import LocationTable from "./_components/data-table";

import { getLocationDataTable } from "@/lib/data/Location";

export default async function LocationPage(props: {
  searchParams?: Promise<{
    search?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;

  const search = searchParams?.search || "";
  const currentPage = Number(searchParams?.page) || 1;

  const locations = await getLocationDataTable({
    page: currentPage,
    search: search,
  });

  return (
    <main className="pb-8 md:pt-8">
      <div className="w-full flex flex-col gap-6 md:gap-3 pb-6 md:pb-8">
        <div className="w-full md:order-2">
          <Breadcrumb />
        </div>
        <h1 className="text-xl text-nowrap md:text-2xl font-bold text-center md:text-left text-techtona-1">
          Location
        </h1>
      </div>
      <div className="flex flex-row gap-2 w-full">
        <div className="flex flex-auto md:items-center">
          <FormLocationDialog mode="new">
            <Button className="bg-techtona-1 hover:bg-techtona-4 text-white cursor-pointer">
              <PlusIcon className="size-4" />
              <span className="font-semibold">
                New <span className="hidden lg:inline-block">Location</span>
              </span>
            </Button>
          </FormLocationDialog>
        </div>
        <div className="w-full md:w-100 flex justify-end">
          <DataTableSearch className="focus-visible:ring-techtona-3 border-zinc-200 shadow-none" />
        </div>
      </div>
      <div className="pt-4">
        <div className="border border-zinc-200 rounded-lg">
          <LocationTable
            data={locations.data}
            currentPage={locations.meta.page}
            perPage={locations.meta.per_page}
          />
        </div>
      </div>
      <DataTablePagination
        totalPages={locations.meta.total_page}
        currentPage={locations.meta.page}
      />
    </main>
  );
}

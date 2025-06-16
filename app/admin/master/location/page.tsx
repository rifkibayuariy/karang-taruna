import Breadcrumb from "@/components/admin/breadcrumb";
import { columns, Location } from "@/components/admin/master/location/columns";
import { Button } from "@/components/admin/ui/button";
import {
  DataTable,
  DataTableSearch,
  DataTablePagination,
} from "@/components/admin/data-table";

import { PlusIcon } from "@heroicons/react/24/solid";

async function getLocations(): Promise<Location[]> {
  return [
    {
      id: 1,
      name: "RT 21",
      description: "RT Kidul",
    },
    {
      id: 2,
      name: "RT 22",
      description: "RT Tengah",
    },
    {
      id: 3,
      name: "RT 23",
      description: "RT Lor",
    },
    {
      id: 4,
      name: "RT 24",
      description: "RT Kidul",
    },
    {
      id: 5,
      name: "RT 25",
      description: "RT Tengah",
    },
    {
      id: 6,
      name: "RT 26",
      description: "RT Lor",
    },
    {
      id: 7,
      name: "RT 27",
      description: "RT Kidul",
    },
    {
      id: 8,
      name: "RT 28",
      description: "RT Tengah",
    },
    {
      id: 9,
      name: "RT 29",
      description: "RT Lor",
    },
    {
      id: 10,
      name: "RT 30",
      description: "RT Kidul",
    },
    {
      id: 11,
      name: "RT 31",
      description: "RT Tengah",
    },
    {
      id: 12,
      name: "RT 32",
      description: "RT Lor",
    },
    {
      id: 13,
      name: "RT 33",
      description: "RT Kidul",
    },
    {
      id: 14,
      name: "RT 34",
      description: "RT Tengah",
    },
    {
      id: 15,
      name: "RT 35",
      description: "RT Lor",
    },
  ];
}

export default async function LocationPage(props: {
  searchParams?: Promise<{
    search?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;

  const search = searchParams?.search || "";
  const currentPage = Number(searchParams?.page) || 1;

  const locations = await getLocations();

  const filtered = locations.filter(
    (loc) =>
      loc.name.toLowerCase().includes(search.toLocaleLowerCase()) ||
      loc.description.toLowerCase().includes(search.toLocaleLowerCase())
  );

  const itemsPerPage = 10;
  const paginated = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const totalPages = Math.ceil(filtered.length / itemsPerPage);

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
          <Button className="bg-techtona-1 hover:bg-techtona-4 text-white">
            <PlusIcon className="size-4" />
            <span className="font-semibold">
              New <span className="hidden lg:inline-block">Location</span>
            </span>
          </Button>
        </div>
        <div className="w-full md:w-100 flex justify-end">
          <DataTableSearch className="focus-visible:ring-0 border-zinc-200 shadow-none" />
        </div>
      </div>
      <div className="pt-4">
        <div className="border border-zinc-200 rounded-lg">
          <DataTable columns={columns} data={paginated} />
        </div>
      </div>
      <DataTablePagination totalPages={totalPages} currentPage={currentPage} />
    </main>
  );
}

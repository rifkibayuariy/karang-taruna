import Breadcrumb from "@/components/admin/ui/breadcrumb";
import Link from "next/link";
import { Plus, IdCardLanyard } from "lucide-react";
import {
  DataTableSearch,
  DataTablePagination,
} from "@/components/admin/ui/data-table";
import OrganizationPositionsTable from "./_components/data-table";

import { getOrganizationPositionDataTable } from "@/lib/data/OrganizationPosition";

export default async function OrganizationPositionsPage(props: {
  searchParams?: Promise<{
    search?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;

  const search = searchParams?.search || "";
  const currentPage = Number(searchParams?.page) || 1;

  const orgPositions = await getOrganizationPositionDataTable({
    page: currentPage,
    search: search,
  });

  return (
    <main className="pb-8 md:pt-8">
      <div className="w-full flex flex-col gap-6 md:gap-3">
        <div className="w-full md:order-2">
          <Breadcrumb />
        </div>
        <h1 className="hidden md:block text-xl text-nowrap md:text-2xl font-bold text-center md:text-left text-techtona-1">
          Organization Positions
        </h1>
      </div>
      <div className="mt-8 text-techtona-1 bg-white/50 backdrop-filter backdrop-blur-lg border border-zinc-200 rounded-xl p-6 lg:p-8">
        <h2 className="flex justify-center items-center gap-2 md:hidden font-bold text-2xl mb-8">
          <IdCardLanyard className="p-1 rounded-md bg-techtona-2 size-7" />
          Org Positions
        </h2>
        <div className="flex flex-row gap-2 w-full">
          <div className="flex flex-auto md:items-center">
            <Link
              href="/admin/master/org-positions/new"
              className="bg-techtona-1 hover:bg-techtona-4 text-white cursor-pointer flex items-center justify-center gap-2 py-2 px-4 rounded-md text-sm"
            >
              <Plus className="size-4" />
              <span className="font-semibold">
                New <span className="hidden lg:inline-block">Position</span>
              </span>
            </Link>
          </div>
          <div className="w-full md:w-100 flex justify-end">
            <DataTableSearch className="focus-visible:ring-techtona-3 border-zinc-200 shadow-none" />
          </div>
        </div>
        <div className="pt-4">
          <OrganizationPositionsTable
            data={orgPositions.data}
            currentPage={orgPositions.meta?.page ?? 1}
            perPage={orgPositions.meta?.per_page ?? 10}
          />
        </div>
        <DataTablePagination
          totalPages={orgPositions.meta?.total_page ?? 0}
          currentPage={orgPositions.meta?.page ?? 1}
        />
      </div>
    </main>
  );
}

import Breadcrumb from "@/components/admin/ui/breadcrumb";
import Tabs from "./_components/tabs";
import { Button } from "@/components/admin/ui/button";
import {
  DataTableSearch,
  DataTablePagination,
} from "@/components/admin/ui/data-table";
import Link from "next/link";
import { Plus } from "lucide-react";
import MembersTable from "./_components/data-table";

import { getMemberDataTable } from "@/lib/data/Member";

export default async function MembersPage(props: {
  searchParams?: Promise<{
    tab?: string;
    search?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;

  const tab = searchParams?.tab || "all";
  const search = searchParams?.search || "";
  const currentPage = Number(searchParams?.page) || 1;

  const status = tab == "all" ? "approved" : tab;

  const members = await getMemberDataTable({
    page: currentPage,
    search: search,
    status: status,
  });

  return (
    <main className="md:pt-8 pb-12">
      <div className="w-full pb-6 md:pb-10">
        <h1 className="hidden md:block text-xl text-nowrap md:text-2xl font-bold mb-3 text-techtona-1">
          {`${
            tab == "all" ? "All" : tab == "pending" ? "Pending" : "Rejected"
          } Member`}
        </h1>
        <Breadcrumb />
      </div>
      <div className="flex flex-col lg:flex-row w-full gap-4 justify-between">
        <div className="w-full lg:w-fit">
          <Tabs tab={tab} />
        </div>
        <Link href="members/new">
          <Button className="bg-techtona-1 hover:bg-techtona-4 w-full lg:w-fit cursor-pointer">
            <Plus />
            Add Member
          </Button>
        </Link>
        <div className="w-full xl:w-100 flex justify-end">
          <DataTableSearch className="focus-visible:ring-techtona-3 border-zinc-200 shadow-none max-w-none" />
        </div>
      </div>
      <div className="pt-4">
        <div className="border border-zinc-200 rounded-lg">
          <MembersTable
            data={members.data}
            currentPage={members.meta?.page ?? 1}
            perPage={members.meta?.per_page ?? 10}
          />
        </div>
      </div>
      <DataTablePagination
        totalPages={members.meta?.total_page ?? 0}
        currentPage={members.meta?.page ?? 1}
      />
    </main>
  );
}

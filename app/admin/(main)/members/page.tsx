import Breadcrumb from "@/components/admin/breadcrumb";
import Tabs from "@/components/admin/members/tabs";
import {
  DataTable,
  DataTableSearch,
  DataTablePagination,
} from "@/components/admin/data-table";
import { columns, Member } from "@/components/admin/members/columns";

async function getMembers(): Promise<Member[]> {
  return [
    {
      id: 1,
      fullname: "Gede Brawidya Puja Dharma",
      nickname: "Brawidya",
      location: "RT 21",
      status: "approved",
      is_active: true,
    },
    {
      id: 2,
      fullname: "Rifki Bayu Ariyanto",
      nickname: "Kiki",
      location: "RT 22",
      status: "approved",
      is_active: true,
    },
    {
      id: 3,
      fullname: "Pingkan Ramadhani",
      nickname: "Pingkan",
      location: "RT 22",
      status: "approved",
      is_active: false,
    },
    {
      id: 4,
      fullname: "Arya Andrean Pratama",
      nickname: "Arya",
      location: "RT 23",
      status: "approved",
      is_active: true,
    },
    {
      id: 5,
      fullname: "Jati Sri Pamungkas",
      nickname: "Jati",
      location: "RT 23",
      status: "approved",
      is_active: true,
    },
    {
      id: 6,
      fullname: "Dinda Dwi Ariyanti",
      nickname: "Dinda",
      location: "RT 22",
      status: "pending",
      is_active: false,
    },
    {
      id: 7,
      fullname: "Budi Arie Setiadi",
      nickname: "Budi",
      location: "RT 23",
      status: "rejected",
      is_active: false,
    },
  ];
}

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

  const members = await getMembers();

  const status = tab == "all" ? "approved" : tab;

  const filtered = members.filter(
    (member) =>
      member.status == status &&
      (member.fullname.toLowerCase().includes(search.toLocaleLowerCase()) ||
        member.nickname.toLowerCase().includes(search.toLocaleLowerCase()) ||
        member.location.toLowerCase().includes(search.toLocaleLowerCase()))
  );

  const itemsPerPage = 10;
  const paginated = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const totalPages = Math.ceil(filtered.length / itemsPerPage);

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
        <div className="w-full xl:w-100 flex justify-end">
          <DataTableSearch className="focus-visible:ring-techtona-3 border-zinc-200 shadow-none max-w-none" />
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

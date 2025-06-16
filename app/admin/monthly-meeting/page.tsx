import Breadcrumb from "@/components/admin/breadcrumb";
import {
  DataTable,
  DataTableSearch,
  DataTablePagination,
} from "@/components/admin/data-table";
import {
  columns,
  MonthlyMeeting,
} from "@/components/admin/monthly-meeting/columns";
import { PlayIcon } from "@heroicons/react/24/solid";

async function getMonthlyMeetings(): Promise<MonthlyMeeting[]> {
  return [
    {
      id: 1,
      date: "2025-06-28",
      host: "Jati Sri Pamungkas",
      location: "RT 23",
      income: 380000,
      expense: 100000,
    },
    {
      id: 2,
      date: "2025-05-24",
      host: "Rifki Bayu Ariyanto",
      location: "RT 22",
      income: 500000,
      expense: 100000,
    },
    {
      id: 3,
      date: "2025-04-05",
      host: "Gede Brawidya Puja Dharma",
      location: "RT 21",
      income: 450000,
      expense: 100000,
    },
    {
      id: 4,
      date: "2025-03-08",
      host: "Arya Andrean Pratama",
      location: "RT 23",
      income: 300000,
      expense: 100000,
    },
  ];
}

export default async function MonthlyMeetingPage(props: {
  searchParams?: Promise<{
    search?: string;
    page?: string;
  }>;
}) {
  const date = new Date();

  const date_formatted = date.toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const searchParams = await props.searchParams;
  const search = searchParams?.search || "";
  const currentPage = Number(searchParams?.page) || 1;

  const monthlyMeetings = await getMonthlyMeetings();

  const filtered = monthlyMeetings.filter(
    (m) =>
      m.date.toLowerCase().includes(search.toLocaleLowerCase()) ||
      m.host.toLowerCase().includes(search.toLocaleLowerCase()) ||
      m.location.toLowerCase().includes(search.toLocaleLowerCase())
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
        <h1 className="hidden md:block text-xl text-nowrap md:text-2xl font-bold mb-3">
          Monthly Meeting
        </h1>
        <Breadcrumb />
      </div>
      <div className="flex justify-start">
        <div className="bg-white shadow rounded-xl py-8 w-full max-w-144 flex flex-col gap-6 px-8">
          <span className="text-center text-lg font-bold">
            {date_formatted}
          </span>
          <div className="relative w-full px-4 rounded-xl text-sm bg-white border border-gray-200">
            <select
              name=""
              id=""
              defaultValue=""
              className="block peer z-0 h-full w-full py-3 focus:outline-none"
              aria-label="Select Host"
            >
              <option value="" disabled>
                Host
              </option>
              <option value="1">Gede Brawidya Puja Dharma</option>
              <option value="2">Rifki Bayu Ariyanto</option>
              <option value="3">Arya Andrean Pratama</option>
              <option value="4">Jati Sri Pamungkas</option>
            </select>
          </div>
          <div className="flex justify-center mt-4">
            <button className="flex items-center gap-3 bg-gray-800 text-white rounded-xl px-6 py-2.75 text-xl font-bold  cursor-pointer">
              <PlayIcon className="size-7" />
              Meeting
            </button>
          </div>
        </div>
      </div>
      <div className="mt-8 flex flex-row gap-2 w-full">
        <div className="w-full md:w-144 flex justify-end">
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

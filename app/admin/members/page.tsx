import Breadcrumb from "@/components/admin/breadcrumb";
import Tabs from "@/components/admin/members/tabs";
import Table from "@/components/admin/members/table";

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default async function Members(props: {
    searchParams?: Promise<{
        tab?: string;
        query?: string;
        page?: string;
    }>;
}) {
    const searchParams = await props.searchParams;
    const tab = searchParams?.tab || 'all';
    // const query = searchParams?.query || '';
    // const currentPage = Number(searchParams?.page) || 1;

    return (
        <main className="md:pt-8 pb-12">
            <div className="w-full pb-6">
                <h1 className="hidden md:block text-xl text-nowrap md:text-2xl font-bold mb-3">
                    {`${tab == 'all' ? 'All' : (tab == 'pending' ? 'Pending' : 'Rejected')} Member`}
                </h1>
                <Breadcrumb/>
            </div>
            <div className="flex flex-col lg:flex-row w-full gap-4 justify-between">
                <div className="w-full lg:w-fit">
                    <Tabs tab={tab}/>
                </div>
                <div className="w-full xl:w-100 flex justify-end">
                    <div className="relative w-full">
                    <input
                        className="block peer z-0 h-full w-full rounded-xl py-3 pl-12 text-sm bg-white shadow-sm placeholder:text-gray-500 focus:outline-none"
                        placeholder="Search"
                    />
                    <MagnifyingGlassIcon className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                    </div>
                </div>
            </div>
            <div className="pt-4 md:pt-8">
                <Table/>
            </div>
        </main>
    );
};

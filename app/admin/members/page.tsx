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
    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;

    return (
        <main>
            <div className="flex flex-col md:flex-row w-full justify-between md:pt-4">
                <div className="hidden md:flex-1/3 md:flex items-center">
                    <h1 className="text-xl md:text-2xl font-bold">{`${tab == 'all' ? 'All' : (tab == 'pending' ? 'Pending' : 'Rejected')} Member`}</h1>
                </div>
                <div>
                    <Tabs tab={tab}/>
                </div>
                <div className="md:flex-1/3 flex justify-end pt-8 md:pt-0">
                    <div className="relative w-full md:w-100">
                    <input
                        className="block peer h-full w-full rounded-xl py-3 pl-12 text-sm bg-white shadow-sm placeholder:text-gray-500 focus:outline-none"
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

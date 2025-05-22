import Breadcrumb from "@/components/admin/breadcrumb";
import Table from "@/components/admin/master/location/table";

import { MagnifyingGlassIcon, PlusIcon } from '@heroicons/react/24/solid';

export default async function Location() {
    return (
        <main className="pb-10 md:pt-8">
            <div className="w-full flex flex-col gap-6 md:gap-3 pb-8 md:pb-10">
                <div className="w-full md:order-2">
                    <Breadcrumb/>
                </div>
                <h1 className="text-xl text-nowrap md:text-2xl font-bold text-center md:text-left">
                    <span className="hidden md:inline-block mr-1">
                        Master -</span>Location
                </h1>
            </div>
            <div className="flex flex-row gap-2 w-full">
                <div className="flex flex-auto md:items-center">
                    <button className="px-3 py-2 bg-gray-800 rounded-xl text-white text-sm flex items-center justify-center gap-2">
                        <PlusIcon className="size-4"/>
                        <span className="font-semibold">New <span className="hidden lg:inline-block">Location</span></span>
                    </button>
                </div>
                <div className="w-full md:w-100 flex justify-end">
                    <div className="relative w-full">
                    <input
                        className="block peer z-0 h-full w-full rounded-xl py-3 pl-12 text-sm bg-white shadow-sm placeholder:text-gray-500 focus:outline-none"
                        placeholder="Search"
                    />
                    <MagnifyingGlassIcon className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                    </div>
                </div>
            </div>
            <div className="pt-4 md:pt-6">
                <Table/>
            </div>
        </main>
    );
};

import Breadcrumb from "@/components/admin/breadcrumb";
import Table from "@/components/admin/cash/table";
import { 
    BanknotesIcon,
    ArrowUpIcon,
    ArrowDownIcon,
    MagnifyingGlassIcon,
    PlusIcon,
    ExclamationCircleIcon
} from '@heroicons/react/24/outline';
import { 
    ArrowUpCircleIcon,
    ArrowDownCircleIcon,
    BanknotesIcon as BanknotesIconSolid
} from '@heroicons/react/24/solid';

export default async function Cash() {
    return (
        <main className="md:pt-8 pb-12">
            <div className="w-full pb-6 md:pb-10">
                <h1 className="hidden md:block text-xl text-nowrap md:text-2xl font-bold mb-3">Cash</h1>
                <Breadcrumb/>
            </div>
            <h2 className="pb-3">
                    <ExclamationCircleIcon className="size-6 inline-block mr-3"/>
                    Recap this month
            </h2>
            <div className="text-sm grid grid-cols-2 md:grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-4">
                <div className="p-5 bg-white shadow-sm rounded-xl">
                    <div className="relative">
                        <span className="block">Income</span>
                        <div className="pt-3 font-bold">
                            <span className="text-sm">Rp. </span>
                            <span className="md:text-xl">500.000</span>
                        </div>
                        <div className="absolute right-0 top-0 md:top-1/2 md:-translate-y-1/2">
                            <BanknotesIcon className='size-6 md:size-10'/>
                            <span className="absolute bottom-0 right-0 p-0.25 rounded-full bg-white">
                                <ArrowUpCircleIcon className='size-3 md:size-5 text-green-500'/>
                            </span>
                        </div>
                    </div>
                </div>
                <div className="p-5 bg-white shadow-sm rounded-xl">
                    <div className="relative">
                        <span className="block">Expense</span>
                        <div className="pt-3 font-bold">
                            <span className="text-sm">Rp. </span>
                            <span className="md:text-xl">100.000</span>
                        </div>
                        <div className="absolute right-0 top-0 md:top-1/2 md:-translate-y-1/2">
                            <BanknotesIcon className='size-6 md:size-10'/>
                            <span className="absolute bottom-0 right-0 p-0.25 rounded-full bg-white">
                                <ArrowDownCircleIcon className='size-3 md:size-5 text-red-500'/>
                            </span>
                        </div>
                    </div>
                </div>
                <div className="p-5 bg-white shadow-sm rounded-xl">
                    <div className="relative">
                        <span className="block">Net Income</span>
                        <div className="pt-3 font-bold">
                            <span className="text-sm">Rp. </span>
                            <span className="md:text-xl">400.000</span>
                        </div>
                        <div className="absolute right-0 top-0 md:top-1/2 md:-translate-y-1/2">
                            <div className="flex">
                                <ArrowUpIcon className='size-3 md:size-5 text-green-500'/>
                                <ArrowDownIcon className='size-3 md:size-5 -ml-1 text-red-500'/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="p-5 bg-gray-800 text-white shadow-sm rounded-xl">
                    <div className="relative">
                        <span className="block">Balance</span>
                        <div className="pt-3 font-bold">
                            <span className="text-sm">Rp. </span>
                            <span className="md:text-xl">5.200.000</span>
                        </div>
                        <div className="absolute right-0 top-0 md:top-1/2 md:-translate-y-1/2">
                            <BanknotesIconSolid className='size-6 md:size-10'/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-8 flex flex-row gap-2 w-full">
                <div className="flex flex-auto md:items-center">
                    <button className="px-3 py-2 bg-gray-800 rounded-xl text-white text-sm flex items-center justify-center gap-2 cursor-pointer">
                        <PlusIcon className="size-4"/>
                        <span className="font-semibold">New <span className="hidden lg:inline-block">Transaction</span></span>
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

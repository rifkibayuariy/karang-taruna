import { 
    MagnifyingGlassIcon,
    BanknotesIcon,
} from '@heroicons/react/24/outline';
import { 
    ArrowUpCircleIcon,
    ArrowDownCircleIcon
} from '@heroicons/react/24/solid';

export default function Dashboard() {
    return (
        <main>
            <div className="flex flex-col lg:flex-row w-full gap-4 justify-between items-center md:pt-4">
                <div className="hidden w-full lg:w-56 md:flex items-center">
                    <h1 className="text-xl text-nowrap md:text-2xl font-bold">Dashboard</h1>
                </div>
                <div className="w-full lg:w-74 xl:w-120 flex justify-end pt-8 md:pt-0">
                    <div className="relative w-full">
                    <input
                        className="block peer z-0 h-full w-full rounded-xl py-3 pl-12 text-sm bg-white shadow-sm placeholder:text-gray-500 focus:outline-none"
                        placeholder="Search"
                    />
                    <MagnifyingGlassIcon className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                    </div>
                </div>
            </div>
            <div className="mt-6 text-sm grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-4">
                <div className="p-5 bg-white shadow-sm rounded-xl">
                    <div className="relative">
                        <span className="block">Income</span>
                        <div className="pt-3 font-bold">
                            <span className="text-sm">Rp. </span>
                            <span className="text-xl">500.000</span>
                        </div>
                        <div className="absolute right-0 top-1/2 -translate-y-1/2">
                            <BanknotesIcon className='size-10'/>
                            <span className="absolute bottom-0 right-0 p-0.25 rounded-full bg-white">
                                <ArrowUpCircleIcon className='size-5 text-green-500'/>
                            </span>
                        </div>
                    </div>
                </div>
                <div className="p-5 bg-white shadow-sm rounded-xl">
                    <div className="relative">
                        <span className="block">Expense</span>
                        <div className="pt-3 font-bold">
                            <span className="text-sm">Rp. </span>
                            <span className="text-xl">100.000</span>
                        </div>
                        <div className="absolute right-0 top-1/2 -translate-y-1/2">
                            <BanknotesIcon className='size-10'/>
                            <span className="absolute bottom-0 right-0 p-0.25 rounded-full bg-white">
                                <ArrowDownCircleIcon className='size-5 text-red-500'/>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

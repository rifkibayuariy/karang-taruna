import { 
    BanknotesIcon,
    ArrowUpIcon,
    ArrowDownIcon
} from '@heroicons/react/24/outline';
import { 
    ArrowUpCircleIcon,
    ArrowDownCircleIcon,
    BanknotesIcon as BanknotesIconSolid
} from '@heroicons/react/24/solid';
import Breadcrumb from "@/components/admin/breadcrumb";
import { IncomeChart } from "@/components/admin/dashboard/income-chart";
import { ExpenseChart } from "@/components/admin/dashboard/expense-chart";

export default function Dashboard() {
    return (
        <main className='md:pt-8 pb-12'>
            <h1 className="hidden md:block text-xl text-nowrap md:text-2xl font-bold">Dashboard</h1>
            <div className="pb-6 md:pt-3">
                <Breadcrumb/>
            </div>
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
                <div className="p-5 bg-white shadow-sm rounded-xl">
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
            <div className="mt-8 text-sm font-semibold grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 2xl:grid-cols-2 gap-4">
                <div className="p-5 bg-white shadow-sm rounded-xl">
                    <span className="block mb-6">Income per month</span>
                    <IncomeChart/>
                </div>
                <div className="p-5 bg-white shadow-sm rounded-xl">
                    <span className="block mb-6">Expense per month</span>
                    <ExpenseChart/>
                </div>
            </div>
        </main>
    );
};

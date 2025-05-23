import Breadcrumb from "@/components/admin/breadcrumb";
import Table from "@/components/admin/master/contribution-money/table";

import {
    BanknotesIcon,
    PencilSquareIcon,
    ClockIcon
} from '@heroicons/react/24/solid';

export default async function ContributionMoney() {
    return (
        <main className="pb-8 md:pt-8">
            <div className="w-full flex flex-col gap-6 md:gap-3">
                <div className="w-full md:order-2">
                    <Breadcrumb/>
                </div>
                <h1 className="text-xl text-nowrap md:text-2xl font-bold text-center md:text-left">
                    <span className="hidden md:inline-block mr-1">
                        Master -</span>Contribution Money
                </h1>
            </div>
            <div className="w-full md:max-w-148 rounded-xl bg-white shadow-sm p-5 mt-8">
                <div className="flex items-center">
                    <BanknotesIcon className="size-6 mr-3"/>
                    <span className="font-semibold">Current</span>
                </div>
                <div className="flex flex-col gap-3.5 justify-center items-center pt-6 pb-6">
                    <span className="text-4xl font-bold">Rp. 5.000</span>
                    <button className="px-4 py-2 bg-gray-800 rounded-xl text-white text-sm flex items-center justify-center gap-2">
                        <PencilSquareIcon className="size-4"/>
                        <span className="font-semibold">Change</span>
                    </button>
                </div>
            </div>
            <div className="pt-4 md:pt-6 md:max-w-148 ">
                <h2 className="font-bold pb-3">
                    <ClockIcon className="size-6 inline-block mr-3"/>
                    History
                </h2>
                <Table/>
            </div>
        </main>
    );
};

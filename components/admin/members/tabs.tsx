'use client';

import {
    UserGroupIcon,
    ExclamationCircleIcon,
    XCircleIcon
} from "@heroicons/react/24/outline";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

export default function Tabs({tab}: {tab: string}) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    function changeTab(tab: string) {
        const params = new URLSearchParams(searchParams);
        if (tab) {
            params.set('tab', tab);
        } else {
            params.delete('tab');
        }
        replace(`${pathname}?${params.toString()}`);
    }

    return (
        <div className="flex flex-row">
            <button
                onClick={() => {changeTab('all')}}
                className={`py-2 px-3 flex flex-auto rounded-xl justify-center align-middle ${tab == 'all' && ('bg-white shadow-sm')}`}>
                <UserGroupIcon className="size-7"></UserGroupIcon>
            </button>
            <button
                onClick={() => {changeTab('pending')}}
                className={`py-2 px-3 flex flex-auto rounded-xl justify-center align-middle text-orange-500 ${tab == 'pending' && ('bg-white shadow-sm')}`}>
                <ExclamationCircleIcon className="size-7 mr-3"></ExclamationCircleIcon>
                <span>Pending</span>
            </button>
            <button
                onClick={() => {changeTab('rejected')}}
                className={`py-2 px-3 flex flex-auto rounded-xl justify-center align-middle text-red-400 ${tab == 'rejected' && ('bg-white shadow-sm')}`}>
                <XCircleIcon className="size-7 mr-3"></XCircleIcon>
                <span>Rejected</span>
            </button>
        </div>
    );
};

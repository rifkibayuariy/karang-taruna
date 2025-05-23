'use client';

import {
    UserGroupIcon
} from "@heroicons/react/24/solid";
import {
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
        <div className="flex flex-row bg-white rounded-xl p-2 shadow-sm text-sm">
            <button
                onClick={() => {changeTab('all')}}
                className={`py-1.5 px-3 flex flex-auto rounded-lg justify-center items-center ${tab == 'all' && ('bg-gray-800 text-white')}`}
                aria-label="All Member"    
            >
                <UserGroupIcon className="size-5"></UserGroupIcon>
            </button>
            <button
                onClick={() => {changeTab('pending')}}
                className={`py-1.5 px-3 flex flex-auto rounded-lg justify-center items-center ${tab == 'pending' && ('bg-gray-800 text-white')}`}>
                <ExclamationCircleIcon className="size-5 mr-2"></ExclamationCircleIcon>
                <span>Pending</span>
            </button>
            <button
                onClick={() => {changeTab('rejected')}}
                className={`py-1.5 px-3 flex flex-auto rounded-lg justify-center items-center ${tab == 'rejected' && ('bg-gray-800 text-white')}`}>
                <XCircleIcon className="size-5 mr-2"></XCircleIcon>
                <span>Rejected</span>
            </button>
        </div>
    );
};

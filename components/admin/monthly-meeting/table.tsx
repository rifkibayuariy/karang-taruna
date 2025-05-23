import {
    PencilSquareIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
} from "@heroicons/react/24/solid";

const monthly_meeting_list = [
    {date: '2025-06-28', host: 'Jati Sri Pamungkas', location: 'RT 23', income: '380.000', expense: '100.000'},
    {date: '2025-05-24', host: 'Rifki Bayu Ariyanto', location: 'RT 22', income: '500.000', expense: '100.000'},
    {date: '2025-04-05', host: 'Gede Brawidya Puja Dharma', location: 'RT 21', income: '450.000', expense: '100.000'},
    {date: '2025-03-08', host: 'Arya Andrean Pratama', location: 'RT 23', income: '300.000', expense: '100.000'},
];

export default function Table() {
    return (
        <>
            <div className="md:hidden flex flex-col gap-4">
                {monthly_meeting_list.map((mm) => {
                    return (
                        <div
                            key={mm.date + mm.host}
                            className="rounded-xl bg-white shadow-sm px-8 py-5">
                            <div className="flex flex-row gap-2 items-center">
                                <div className="flex flex-col flex-auto">
                                    <div className="px-2.5 py-1 w-fit rounded-lg bg-gray-800 text-xs text-white font-bold">
                                        {mm.location}
                                    </div>
                                    <div className="flex flex-row gap-5 mt-4">
                                        <div className="flex flex-col basis-2/5">
                                            <span className="text-sm font-semibold">
                                                {mm.date}
                                            </span>
                                            <span className="text-sm">
                                                {mm.host}
                                            </span>
                                        </div>
                                        <div className="flex flex-col basis-3/5 align-middle">
                                            <span className="text-sm">
                                                Income:&emsp;Rp. {mm.income}
                                            </span>
                                            <span className="text-sm">
                                                Expense:&emsp;Rp. {mm.expense}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <button className="bg-gray-800 rounded-lg p-1.5 text-white">
                                    <PencilSquareIcon className="size-4"/>
                                </button>
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className="hidden md:block overflow-x-auto bg-white rounded-xl shadow-sm md:pb-4">
                <table className="min-w-full table">
                    <thead className="rounded-lg text-left text-sm font-normal">
                        <tr className="border-b border-gray-200">
                            <th scope="col" className="px-4 pl-6 py-5 font-medium">Date</th>
                            <th scope="col" className="px-4 py-5 font-medium">Location</th>
                            <th scope="col" className="px-4 py-5 font-medium">Host</th>
                            <th scope="col" className="px-4 py-5 font-medium">Income</th>
                            <th scope="col" className="px-4 py-5 font-medium">Expense</th>
                            <th scope="col" className="px-4 py-5 font-medium">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {monthly_meeting_list.map((mm) => {
                            return (
                                <tr
                                    key={mm.date + mm.income + mm.expense}
                                    className="w-full border-b border-gray-200 py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                                >
                                    <td className="whitespace-nowrap px-4 pl-6 py-3">{mm.date}</td>
                                    <td className="whitespace-nowrap px-4 py-3">
                                        <span className="rounded-xl bg-gray-800 text-white font-bold px-3 py-1 text-xs">{mm.location}</span>
                                    </td>
                                    <td className="whitespace-nowrap px-4 py-3">{mm.host}</td>
                                    <td className="whitespace-nowrap px-4 py-3">
                                        Rp. {mm.income}</td>
                                    <td className="whitespace-nowrap px-4 py-3">
                                        Rp. {mm.expense}
                                    </td>
                                    <td className="whitespace-nowrap px-4 py-3">
                                        <div className="flex gap-1">
                                            <button className="bg-gray-800 rounded-lg px-3 py-1.5 text-white">
                                                <PencilSquareIcon className="size-4"/>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            <div className="pt-8 flex justify-center">
                <div className="bg-white rounded-xl shadow-sm flex flex-row gap-8 p-2">
                    <button className="flex items-center gap-1 text-xs text-gray-500 p-2">
                        <ChevronLeftIcon className="size-4"/>
                        <span>Previous</span>
                    </button>
                    <div className="flex flex-row gap-1 text-sm justify-center items-center">
                        <button className="w-7 h-7 bg-gray-800 rounded-md font-bold text-white">1</button>
                    </div>
                    <button className="flex items-center gap-1 text-xs text-gray-500 p-2">
                        <span>Next</span>
                        <ChevronRightIcon className="size-4"/>
                    </button>
                </div>
            </div>
        </>
    );
};

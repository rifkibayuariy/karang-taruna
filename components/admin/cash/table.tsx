import {
    PencilSquareIcon,
    TrashIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    EyeIcon
} from "@heroicons/react/24/solid";

const cash_list = [
    {date: '2025-05-25', transaction: 'Uang Penerangan', nominal: '100.000', type: 'expense'},
    {date: '2025-05-25', transaction: 'Iuran Uang Kas', nominal: '500.000', type: 'income'},
    {date: '2025-05-24', transaction: 'Cetak Undangan Kumpulan', nominal: '50.000', type: 'expense'},
    {date: '2025-05-08', transaction: 'Menjenguk si X', nominal: '200.000', type: 'expense'},
];

export default function Table() {
    return (
        <>
            <div className="md:hidden flex flex-col gap-2">
                {cash_list.map((cash) => {
                    return (
                        <div
                            key={cash.date + cash.type + cash.transaction + cash.nominal}
                            className="rounded-xl bg-white shadow-sm px-4 py-4">
                            <div className="flex flex-row gap-2 items-center">
                                <div className="flex flex-col gap-1 pl-2">
                                    <span className={`rounded-xl ${cash.type == 'income' ? 'bg-green-500' : 'bg-red-500'} text-white font-bold px-1.5 py-0.25 text-xs w-fit`}>{cash.type == 'income' ? 'in' : 'out'}</span>
                                    <span className="text-xs font-semibold">
                                        {cash.date}
                                    </span>
                                </div>
                                <div className="flex flex-col gap-0.5 pl-3 flex-auto">
                                    <span className="text-sm font-semibold">
                                        Rp. {cash.nominal}
                                    </span>
                                    <span className="text-xs">
                                        {cash.transaction}
                                    </span>
                                </div>
                                {['Iuran Uang Kas', 'Uang Penerangan'].includes(cash.transaction)  && (
                                    <button className="bg-green-500 rounded-lg p-1.5 text-white">
                                        <EyeIcon className="size-4"/>
                                    </button>
                                )}
                                {!['Iuran Uang Kas', 'Uang Penerangan'].includes(cash.transaction)  && (
                                    <>
                                        <button className="bg-gray-800 rounded-lg p-1.5 text-white">
                                            <PencilSquareIcon className="size-4"/>
                                        </button>
                                        <button className="bg-red-600 rounded-lg p-1.5 text-white">
                                            <TrashIcon className="size-4"/>
                                        </button>
                                    </>
                                )}
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
                            <th scope="col" className="px-4 py-5 font-medium">Type</th>
                            <th scope="col" className="px-4 py-5 font-medium">Transaction</th>
                            <th scope="col" className="px-4 py-5 font-medium">Nominal</th>
                            <th scope="col" className="px-4 py-5 font-medium">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cash_list.map((cash) => {
                            return (
                                <tr
                                    key={cash.date + cash.type + cash.transaction + cash.nominal}
                                    className="w-full border-b border-gray-200 py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                                >
                                    <td className="whitespace-nowrap px-4 pl-6 py-3">{cash.date}</td>
                                    <td className="whitespace-nowrap px-4 py-3">
                                        <span className={`rounded-xl ${cash.type == 'income' ? 'bg-green-500' : 'bg-red-500'} text-white font-bold px-3 py-1 text-xs`}>{cash.type}</span>
                                    </td>
                                    <td className="whitespace-nowrap px-4 py-3">{cash.transaction}</td>
                                    <td className="whitespace-nowrap px-4 py-3">
                                        Rp. {cash.nominal}
                                    </td>
                                    <td className="whitespace-nowrap px-4 py-3">
                                        <div className="flex gap-1">
                                            {!['Iuran Uang Kas', 'Uang Penerangan'].includes(cash.transaction) && (
                                                <>
                                                    <button className="bg-gray-800 rounded-lg px-3 py-1.5 text-white">
                                                        <PencilSquareIcon className="size-4"/>
                                                    </button>
                                                    <button className="bg-red-600 rounded-lg px-3 py-1.5 text-white">
                                                        <TrashIcon className="size-4"/>
                                                    </button>
                                                </>
                                            )}
                                            {['Iuran Uang Kas', 'Uang Penerangan'].includes(cash.transaction) && (
                                                <>
                                                    <button className="bg-green-500 rounded-lg px-3 py-1.5 text-white">
                                                        <EyeIcon className="size-4"/>
                                                    </button>
                                                </>
                                            )}
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

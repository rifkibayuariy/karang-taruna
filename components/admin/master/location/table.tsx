import {
    PencilSquareIcon,
    TrashIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    MapPinIcon
} from "@heroicons/react/24/solid";

const location = [
    {name: 'RT 21', description: 'RT Kidul'},
    {name: 'RT 22', description: 'RT Tengah'},
    {name: 'RT 23', description: 'RT Lor'},
]

export default function Table() {
    return (
        <>
            <div className="md:hidden flex flex-col gap-2">
                {location.map((loc) => {
                    return (
                        <div
                            key={loc.name}
                            className="rounded-xl bg-white shadow-sm px-4 py-4">
                            <div className="flex flex-row gap-2 items-center">
                                <MapPinIcon className="size-5 text-gray-500"/>
                                <div className="flex flex-col gap-0.5 pl-2 flex-auto">
                                    <span className="text-sm font-semibold">
                                        {loc.name}
                                    </span>
                                    <span className="text-xs">
                                        {loc.description}
                                    </span>
                                </div>
                                    <button className="bg-gray-800 rounded-lg p-1.5 text-white cursor-pointer" aria-label="Edit Location">
                                        <PencilSquareIcon className="size-4"/>
                                    </button>
                                    <button className="bg-red-600 rounded-lg p-1.5 text-white cursor-pointer" aria-label="Delete Location">
                                        <TrashIcon className="size-4"/>
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
                            <th scope="col" className="px-4 pl-6 py-5 font-medium">Location Name</th>
                            <th scope="col" className="px-4 py-5 font-medium">Description</th>
                            <th scope="col" className="px-4 py-5 font-medium">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {location.map((loc) => {
                            return (
                                <tr
                                    key={loc.name}
                                    className="w-full border-b border-gray-200 py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                                >
                                    <td className="whitespace-nowrap px-4 pl-6 py-3">{loc.name}</td>
                                    <td className="whitespace-nowrap px-4 py-3">{loc.description}</td>
                                    <td className="whitespace-nowrap px-4 py-3">
                                        <div className="flex gap-1">
                                            <button className="bg-gray-800 rounded-lg px-3 py-1.5 text-white cursor-pointer" aria-label="Edit Location">
                                                <PencilSquareIcon className="size-4"/>
                                            </button>
                                            <button className="bg-red-600 rounded-lg px-3 py-1.5 text-white cursor-pointer" aria-label="Delete Location">
                                                <TrashIcon className="size-4"/>
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
                    <button className="flex items-center gap-1 text-xs text-gray-500 p-2 cursor-pointer">
                        <ChevronLeftIcon className="size-4"/>
                        <span>Previous</span>
                    </button>
                    <div className="flex flex-row gap-1 text-sm justify-center items-center">
                        <button className="w-7 h-7 bg-gray-800 rounded-md font-bold text-white cursor-pointer">1</button>
                    </div>
                    <button className="flex items-center gap-1 text-xs text-gray-500 p-2 cursor-pointer">
                        <span>Next</span>
                        <ChevronRightIcon className="size-4"/>
                    </button>
                </div>
            </div>
        </>
    );
};

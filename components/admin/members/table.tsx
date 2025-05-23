import {
    PencilSquareIcon,
    TrashIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    ArrowUturnLeftIcon
} from "@heroicons/react/24/solid";

const members = [
    {fullname: 'Gede Brawidya Puja Dharma', nickname: 'Brawidya', location: 'RT 21', status: 'active'},
    {fullname: 'Rifki Bayu Ariyanto', nickname: 'Kiki', location: 'RT 22', status: 'active'},
    {fullname: 'Pingkan Ramadhani', nickname: 'Pingkan', location: 'RT 22', status: 'inactive'},
    {fullname: 'Arya Andrean Pratama', nickname: 'Arya', location: 'RT 23', status: 'active'},
    {fullname: 'Jati Sri Pamungkas', nickname: 'Jati', location: 'RT 23', status: 'active'},
]

export default function Table() {
    return (
        <>
            <div className="md:hidden flex flex-col gap-2">
                {members.map((member) => {
                    return (
                        <div
                            key={member.fullname + member.nickname}
                            className="rounded-xl bg-white shadow-sm px-4 py-4">
                            <div className="flex flex-row gap-2 items-center">
                                <div className={`w-2 h-2 rounded-full ${member.status == 'active' ? 'bg-green-600' : 'bg-orange-600'}`}></div>
                                <div className="flex flex-col gap-0.5 pl-2 flex-auto">
                                    <span className="text-sm font-semibold">
                                        {member.fullname}
                                    </span>
                                    <span className="text-xs">
                                        {member.nickname}
                                    </span>
                                </div>
                                {member.status == 'active' && (
                                    <button className="bg-gray-800 rounded-lg p-1.5 text-white" aria-label="Edit Member">
                                        <PencilSquareIcon className="size-4"/>
                                    </button>
                                )}
                                {member.status == 'inactive' && (
                                    <>
                                        <button className="bg-orange-600 rounded-lg p-1.5 text-white" aria-label="Delete Member">
                                            <ArrowUturnLeftIcon className="size-4"/>
                                        </button>
                                        <button className="bg-red-600 rounded-lg p-1.5 text-white" aria-label="Delete Member">
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
                            <th scope="col" className="px-4 pl-6 py-5 font-medium">Full Name</th>
                            <th scope="col" className="px-4 py-5 font-medium">Nickname</th>
                            <th scope="col" className="px-4 py-5 font-medium">Location</th>
                            <th scope="col" className="px-4 py-5 font-medium">Status</th>
                            <th scope="col" className="px-4 py-5 font-medium">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {members.map((member) => {
                            return (
                                <tr
                                    key={member.fullname + member.nickname}
                                    className="w-full border-b border-gray-200 py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                                >
                                    <td className="whitespace-nowrap px-4 pl-6 py-3">{member.fullname}</td>
                                    <td className="whitespace-nowrap px-4 py-3">{member.nickname}</td>
                                    <td className="whitespace-nowrap px-4 py-3">
                                        <span className="rounded-xl border border-gray-400 px-3 py-1 text-xs">{member.location}</span>
                                    </td>
                                    <td className="whitespace-nowrap px-4 py-3">
                                        <span className={`rounded-xl ${member.status == 'active' ? 'bg-green-600' : 'bg-orange-600'} text-white font-bold px-3 py-1 text-xs`}>{member.status}</span>
                                    </td>
                                    <td className="whitespace-nowrap px-4 py-3">
                                        <div className="flex gap-1">
                                            {member.status == 'active' && (
                                                <>
                                                    <button className="bg-gray-800 rounded-lg px-3 py-1.5 text-white" aria-label="Edit Member">
                                                        <PencilSquareIcon className="size-4"/>
                                                    </button>
                                                    <button className="bg-orange-500 rounded-lg px-3 py-1.5 text-white flex items-center" aria-label="Deactivate Member">
                                                        <span className="font-semibold text-xs">Deactivate</span>
                                                    </button>
                                                </>
                                            )}
                                            {member.status == 'inactive' && (
                                                <>
                                                    <button className="bg-red-600 rounded-lg px-3 py-1.5 text-white"  aria-label="Delete Member">
                                                        <TrashIcon className="size-4"/>
                                                    </button>
                                                    <button className="bg-green-600 rounded-lg px-3 py-1.5 text-white flex items-center">
                                                        <span className="font-semibold text-xs">Activate</span>
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

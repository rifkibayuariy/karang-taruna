import Breadcrumb from "@/components/admin/breadcrumb";
import Table from "@/components/admin/monthly-meeting/table";
import { 
    MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';
import { 
    PlayIcon,
} from '@heroicons/react/24/solid';

export default async function MonthlyMeeting() {
    const date = new Date();

    const date_formatted = date.toLocaleDateString('id-ID', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });

    return (
        <main className="md:pt-8 pb-12">
            <div className="w-full pb-6 md:pb-10">
                <h1 className="hidden md:block text-xl text-nowrap md:text-2xl font-bold mb-3">Monthly Meeting</h1>
                <Breadcrumb/>
            </div>
            <div className="flex justify-start">
                <div className="bg-white shadow rounded-xl py-8 w-full max-w-144 flex flex-col gap-6 px-8">
                    <span className="text-center text-lg font-bold">{date_formatted}</span>
                    <div className="relative w-full px-4 rounded-xl text-sm bg-white border border-gray-200">
                        <select name="" id="" defaultValue="" className="block peer z-0 h-full w-full py-3 focus:outline-none" aria-label="Select Host">
                            <option value="" disabled>Host</option>
                            <option value="1">Gede Brawidya Puja Dharma</option>
                            <option value="2">Rifki Bayu Ariyanto</option>
                            <option value="3">Arya Andrean Pratama</option>
                            <option value="4">Jati Sri Pamungkas</option>
                        </select>
                    </div>
                    <div className="flex justify-center mt-4">
                        <button className="flex items-center gap-3 bg-gray-800 text-white rounded-xl px-6 py-2.75 text-xl font-bold  cursor-pointer">
                            <PlayIcon className="size-7"/>
                            Meeting
                        </button>
                    </div>
                </div>
            </div>
            <div className="mt-8 flex flex-row gap-2 w-full">
                <div className="w-full md:w-144 flex justify-end">
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

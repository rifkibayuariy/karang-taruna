'use client';

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
    ChevronUpIcon,
    ArrowRightStartOnRectangleIcon
} from "@heroicons/react/24/solid";
import Overlay from "@/components/admin/overlay";

export default function Profile() {
    const [modalOpen, setModalOpen] = useState(false);
    const toggleModal = () => setModalOpen((prev) => !prev);

    return (
        <div className="w-full relative py-6 border-t border-gray-200 text-sm">
            <div className="w-full overflow-hidden">
                <button
                    className="w-full flex items-center cursor-pointer"
                    onClick={() => setModalOpen(true)}
                    aria-label="Profile"
                >
                    <Image
                        className="rounded-full mr-4 flex-none"
                        width={32}
                        height={32}
                        src="/images/profile.png"
                        alt="Profile"
                    />
                    <span className="text-left text-nowrap flex-auto">Rifki Bayu Ariyanto</span>
                    <ChevronUpIcon className="size-4 flex-none" />
                </button>
            </div>

            {modalOpen && (
                <>
                    <div className="absolute flex flex-col w-64 p-3 gap-1 bg-white rounded-xl shadow-lg bottom-full -mb-4 z-50">
                        <Link
                            href="/admin/profile"
                            onClick={() => setModalOpen(false)}
                            className="w-full flex items-center hover:bg-gray-100 px-3 py-2 rounded-xl cursor-pointer"
                        >
                            <Image
                                className="rounded-full mr-4 flex-none"
                                width={32}
                                height={32}
                                src="/images/profile.png"
                                alt="Profile"
                            />
                            <span className="text-left text-nowrap flex-auto">Profile</span>
                        </Link>

                        <button className="w-full flex items-center text-red-500 bg-red-200 hover:bg-red-500 hover:text-white px-3 py-2 rounded-xl cursor-pointer">
                            <div className="w-8 h-8 flex items-center justify-center mr-4 bg-red-400 text-white rounded-lg">
                                <ArrowRightStartOnRectangleIcon className="size-5" />
                            </div>
                            <span className="text-left text-nowrap flex-auto font-semibold">Logout</span>
                        </button>
                    </div>

                    <Overlay
                        mobile={false}
                        onClick={toggleModal}
                        opacity="opacity-25 md:opacity-10"
                    />
                </>
            )}
        </div>
    );
};

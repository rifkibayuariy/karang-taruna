"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Breadcrumb from "@/components/admin/ui/breadcrumb";
import Tabs from "./_components/tabs";
import { Button } from "@/components/admin/ui/button";
import {
  DataTable,
  DataTableSearch,
  DataTablePagination,
} from "@/components/admin/ui/data-table";
import { columns, Member } from "@/components/admin/members/columns";
import Link from "next/link";

import { Plus } from "lucide-react";


async function getMembers(): Promise<Member[]> {
  const res = await fetch(
    "http://20.2.85.195:4000/api/members?page=1&search=&status=approved",
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch members");
  }

  const json = await res.json();
  const data = json.data; // pastikan respons kamu ada `data`, jika tidak sesuaikan

  return data.map((item: any) => ({
    id: item.id_member ?? 0,
    fullname: item.fullname,
    nickname: item.nickname,
    location: `RT ${item.id_location_detail}`, // ganti kalau ada location_name
    status: item.status,
    is_active: item.is_active,
  }));
}
export default function MembersPage() {
  const searchParams = useSearchParams();

  const tab = searchParams.get("tab") || "all";
  const search = searchParams.get("search") || "";
  const currentPage = Number(searchParams.get("page")) || 1;

  const [members, setMembers] = useState<Member[]>([]);

  useEffect(() => {
    getMembers().then((data) => {
      console.log("Member data loaded:", data);
      setMembers(data);
    });
  }, []);

  const status = tab == "all" ? "approved" : tab;

  const filtered = members.filter(
    (member) =>
      member.status == status &&
      (member.fullname.toLowerCase().includes(search.toLocaleLowerCase()) ||
        member.nickname.toLowerCase().includes(search.toLocaleLowerCase()) ||
        member.location.toLowerCase().includes(search.toLocaleLowerCase()))
  );

  const itemsPerPage = 10;
  const paginated = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  // Handle hapus member
  function handleDelete(id: number) {
    setMembers((prev) => prev.filter((member) => member.id !== id));
  }

  // Handle aktif/nonaktif
  function handleToggleActive(id: number) {
    setMembers((prev) =>
      prev.map((member) =>
        member.id === id ? { ...member, is_active: !member.is_active } : member
      )
    );
  }

  // Handle approve (dari status 'pending')
  function handleApprove(id: number) {
    setMembers((prev) =>
      prev.map((member) =>
        member.id === id
          ? { ...member, status: "approved", is_active: true }
          : member
      )
    );
  }

  // Handle reject (dari status 'pending')
  function handleReject(id: number) {
    setMembers((prev) =>
      prev.map((member) =>
        member.id === id ? { ...member, status: "rejected" } : member
      )
    );
  }

  return (
    <main className="md:pt-8 pb-12">
      <div className="w-full pb-6 md:pb-10">
        <h1 className="hidden md:block text-xl text-nowrap md:text-2xl font-bold mb-3 text-techtona-1">
          {`${
            tab == "all" ? "All" : tab == "pending" ? "Pending" : "Rejected"
          } Member`}
        </h1>
        <Breadcrumb />
      </div>
      <div className="flex flex-col lg:flex-row w-full gap-4 justify-between">
        <div className="w-full lg:w-fit">
          <Tabs tab={tab} />
        </div>
        <Link href="members/new">
          <Button className="bg-techtona-1 hover:bg-techtona-4 w-full lg:w-fit cursor-pointer">
            <Plus />
            Add Member
          </Button>
        </Link>
        <div className="w-full xl:w-100 flex justify-end">
          <DataTableSearch className="focus-visible:ring-techtona-3 border-zinc-200 shadow-none max-w-none" />
        </div>
      </div>
      <div className="pt-4">
        <div className="border border-zinc-200 rounded-lg">
          <DataTable
            columns={columns({
              onDelete: handleDelete,
              onToggleActive: handleToggleActive,
              onApprove: handleApprove,
              onReject: handleReject,
            })}
            data={paginated}
          />
        </div>
      </div>
      <DataTablePagination totalPages={totalPages} currentPage={currentPage} />
    </main>
  );
}

import Breadcrumb from "@/components/admin/ui/breadcrumb";

export default function NewMemberPage() {
  return (
    <main className="md:pt-8 pb-12">
      <div className="w-full pb-6 md:pb-10">
        <h1 className="hidden md:block text-xl text-nowrap md:text-2xl font-bold mb-3 text-techtona-1">
          New Member
        </h1>
        <Breadcrumb />
      </div>
    </main>
  );
}

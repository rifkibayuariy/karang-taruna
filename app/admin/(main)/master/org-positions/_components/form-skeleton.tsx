import { Skeleton } from "@/components/admin/ui/skeleton";

export default function FormOrganizationPositionSkeleton() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <Skeleton className="h-4 w-1/2 bg-zinc-200" />
        <Skeleton className="h-9 w-full bg-zinc-200" />
      </div>
      <div className="flex flex-col gap-2">
        <Skeleton className="h-4 w-1/2 bg-zinc-200" />
        <Skeleton className="h-9 w-full bg-zinc-200" />
      </div>
      <div className="flex flex-col md:flex-row md:justify-end gap-2 mt-4">
        <Skeleton className="h-10 md:w-32 bg-zinc-200" />
        <Skeleton className="h-10 md:w-36 bg-zinc-200" />
      </div>
    </div>
  );
}

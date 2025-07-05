import { LoaderCircle } from "lucide-react";

export function BasicLoading() {
  return (
    <div className="bg-zinc-100 rounded p-4">
      <div className="flex justify-center items-center gap-2">
        <LoaderCircle className="animate-spin text-techtona-1 size-6" />
        <span>Loading ...</span>
      </div>
    </div>
  );
}

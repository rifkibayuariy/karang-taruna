"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { HomeIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

export default function Breadcrumb() {
  const pathname = usePathname();

  const segments = pathname.split("/").filter(Boolean);

  return (
    <div className="text-sm">
      <ul className="flex gap-2 flex-wrap text-techtona-1">
        <li>
          <Link
            href="/admin"
            className="hover:underline"
            aria-label="Go to home"
          >
            <HomeIcon className="size-5" />
          </Link>
        </li>
        {segments.map((segment, index) => {
          const href = "/" + segments.slice(0, index + 1).join("/");
          const isLast = index === segments.length - 1;

          if (segment != "admin") {
            const label = segment
              .replace(/[-_]/g, " ")
              .replace(/\b\w/g, (char) => char.toUpperCase());

            return (
              <li key={href} className="flex items-center gap-2">
                <ChevronRightIcon className="size-4" />
                {isLast ? (
                  <span>{label}</span>
                ) : (
                  <Link href={href} className=" hover:underline">
                    {label}
                  </Link>
                )}
              </li>
            );
          }
        })}
      </ul>
    </div>
  );
}

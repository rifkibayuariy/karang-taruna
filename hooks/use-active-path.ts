import { usePathname } from "next/navigation";
import { useCallback } from "react";

/**
 *
 * @returns { pathname: string, isActive: (href: string) => boolean }
 */
export function useActivePath() {
  const pathname = usePathname();

  const isActive = useCallback(
    (href: string) => {
      if (href === "/admin/dashboard") {
        return pathname === href;
      }
      return pathname.startsWith(href);
    },
    [pathname]
  );

  return { pathname, isActive };
}

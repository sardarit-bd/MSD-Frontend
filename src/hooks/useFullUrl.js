import { usePathname, useSearchParams } from "next/navigation";

export function useFullUrl() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  if (typeof window === "undefined") return "";

  const query = searchParams.toString();
  return `${window.location.origin}${pathname}${query ? `?${query}` : ""}`;
}
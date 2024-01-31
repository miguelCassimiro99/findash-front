"use client";

import { FunnelIcon } from "@heroicons/react/24/outline";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

export default function OpenFilter() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function startFilter() {
    let query = "ammount=5565";
    query += `&states=['TX', 'NV', 'IL']`;
    router.push(`${pathname}?${query}`);
  }

  return (
    <button
      onClick={() => startFilter()}
      className="bg-primary-light p-1 rounded-[8px]"
    >
      <FunnelIcon className="text-gray-200 w-5 h-5" />
    </button>
  );
}

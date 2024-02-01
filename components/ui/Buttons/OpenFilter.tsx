"use client";

import { FunnelIcon } from "@heroicons/react/24/outline";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useStore } from "../../../store/transactions";

export default function OpenFilter() {
  const { setFilterModalOpen } = useStore((store) => store.actions);

  const router = useRouter();
  const pathname = usePathname();

  function startFilter() {
    let query = "ammount=5565";
    query += `&states=['TX', 'NV']`;
    query += `&industries=['Hotels', 'Airlines']`;
    router.push(`${pathname}?${query}`);
  }

  return (
    <button
      onClick={() => setFilterModalOpen(true)}
      className="bg-primary-light p-1 rounded-[8px]"
    >
      <FunnelIcon className="text-gray-200 w-5 h-5" />
    </button>
  );
}

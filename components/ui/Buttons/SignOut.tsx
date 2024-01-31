"use client";

import classnames from "classnames";
import { signOut } from "next-auth/react";
import { ButtonHTMLAttributes, MouseEventHandler } from "react";
import { useRouter } from "next/navigation";
import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/outline";

export default function SignOutButton() {
  const router = useRouter();

  async function logout() {
    await signOut({
      redirect: false,
    });

    router.replace("/");
  }

  return (
    <button onClick={() => logout()} className="bg-danger p-1 rounded-[8px]">
      <ArrowRightStartOnRectangleIcon className="text-gray-200 w-5 h-5" />
    </button>
  );
}

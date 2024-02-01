import { getServerSession } from "next-auth";
import { ReactNode, Suspense } from "react";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import TransactionsFilters from "@/components/ui/Modal/TransactionsFilters";

interface AdminLayoutProps {
  children: ReactNode;
}

export default async function AdminLayout({ children }: AdminLayoutProps) {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/");

  return <>{children}</>;
}

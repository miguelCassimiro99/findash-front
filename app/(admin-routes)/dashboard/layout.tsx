import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import Navbar from "../../../components/ui/Navbar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <main className="w-[100vw] min-h-screen overflow-y-auto overflow-x-hidden bg-dashboard-color flex flex-col-reverse md:flex-col p-2 gap-2 relative">
      <Navbar />
      {children}
    </main>
  );
}

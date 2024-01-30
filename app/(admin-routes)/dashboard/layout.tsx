import { getServerSession } from "next-auth";
import Navbar from "../../../components/ui/Navbar";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <section className="">
      <Navbar />
      <span>Bem vindo {session?.user?.name}</span>
      {children}
    </section>
  );
}

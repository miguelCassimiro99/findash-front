import Login from "@/components/Forms/Login/Login";
import StepsIndicator from "@/components/Forms/StepsIndicators";
import { Suspense } from "react";

export default function Home() {
  return (
    <main className="flex min-h-screen w-[100vw] overflow-hidden min-w-max items-center justify-center bg-slate-900 h-full relative max-w-[100vw]">
      <div className="form-access h-1/4 bg-mobile-hero bg-cover object-center fixed top-0 w-full md:hidden flex justify-center items-start py-8">
        <StepsIndicator />
      </div>

      <section className="absolute h-[70%] w-3/4 p-4 rounded-[8px] shadow-md bg-slate-800 min-w-max flex justify-start items-start gap-10 container md:justify-start md:max-w-4xl">
        <div className="h-full w-1/2 bg-desktop-side bg-bottom bg-cover bg-no-repeat hidden md:flex flex-col justify-start items-center rounded-[8px] py-8 px-2">
          <StepsIndicator />
        </div>

        <Suspense fallback={<span>Loading... </span>}>
          <Login />
        </Suspense>
      </section>
    </main>
  );
}

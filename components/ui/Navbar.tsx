import { Suspense } from "react";
import SignOutButton from "./Buttons/SignOut";

export default function Navbar() {
  return (
    <header className="h-16 fixed z-30 shadow-lg rounded-[8px] w-full md:relative md:shadow-none left-0 bottom-0 md:h-20 bg-dashboard-color flex px-4 py-1 justify-between items-center">
      <h2 className="text-base md:text-lg lg:text-xl text-gray-200">
        Findash APP
      </h2>

      <Suspense>
        <SignOutButton label="Logoff" />
      </Suspense>
    </header>
  );
}

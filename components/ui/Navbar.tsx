import { Suspense } from "react";
import SignOutButton from "./Buttons/SignOut";

export default function Navbar() {
  return (
    <header className="h-[10vh] w-full flex px-3 py-2 justify-between">
      <h2>Findash APP</h2>

      <Suspense>
        <SignOutButton label="Logoff" />
      </Suspense>
    </header>
  );
}

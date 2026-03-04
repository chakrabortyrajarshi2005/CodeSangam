import { currentUserRole } from "@/modules/auth/actions";
import Navbar from "@/modules/home/components/Navbar";
import React from "react";
const RootLayout = async ({ children }) => {
  const userRole = await currentUserRole();
  return (
    <main className="flex flex-col min-h-screen max-h-screen">
      <Navbar userRole={userRole} />
      <div className="flex-1 flex flex-col px-4 pb-4">
        <div
          className="absolute inset-0 -z-10 h-full w-full
        bg-neutral-50 dark:bg-neutral-950
bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.035)_1px,transparent_0)]
dark:bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.06)_1px,transparent_0)]
[background-size:22px_22px]"
        />
        {children}
      </div>
    </main>
  );
};

export default RootLayout;

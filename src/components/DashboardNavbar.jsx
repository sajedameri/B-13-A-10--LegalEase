"use client";

import React from "react";
import { Avatar } from "@heroui/react";
import { useSession } from "@/lib/auth-client";

const DashboardNavbar = () => {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return (
      <div className="h-16 flex items-center justify-end px-6 bg-white border-b">
        <span className="loading loading-ring loading-md"></span>
      </div>
    );
  }

  const user = session?.user;

  return (
    <header className="w-full h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between shadow-sm">
      {/* Left Side */}
      <div>
        <h1 className="text-xl font-bold text-slate-800">
          Dashboard
        </h1>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-3">
        <div className="hidden md:flex flex-col items-end">
          <span className="text-sm font-semibold text-slate-800">
            {user?.name || "Guest"}
          </span>

          <span className="text-xs text-slate-500 capitalize">
            {user?.role || "User"}
          </span>
        </div>

        <Avatar
          src={user?.image || ""}
          name={user?.name || "Guest"}
          className="w-10 h-10 border border-slate-200"
        />
      </div>
    </header>
  )
};

export default DashboardNavbar;
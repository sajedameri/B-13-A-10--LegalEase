"use client";

import { useSession } from "@/lib/auth-client";
import React from "react";

const LawyerDashboardHomePage = () => {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-ring loading-xl"></span>
      </div>
    );
  }

  const user = session?.user;

  console.log("meri lawyer", session);

  return (
    <div>
      <h1 className="text-4xl font-bold">
        Welcome back, {user?.name}
      </h1>

      <p className="mt-4">Lawyer Dashboard Home Page</p>
    </div>
  );
};

export default LawyerDashboardHomePage;
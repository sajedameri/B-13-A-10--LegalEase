'use client';

import { useSession } from '@/lib/auth-client';
import React from 'react';

const ClientDashboardHomePage = () => {
  const { data: session, isPending } = useSession();
  if (isPending) {
    return (
      <div>
        <span className="loading loading-ring loading-xl"></span>
      </div>
    );
  }

  const user = session?.user;
  console.log('meri client', session);
  return (
    <div>
      <h1 className="text-4xl">Welcome back,{user?.name}</h1>
    </div>
  );
};

export default ClientDashboardHomePage;

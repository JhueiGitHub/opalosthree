// src/app/apps/opal/App.tsx
"use client";

import React from "react";
import { userQueryData } from "@/hooks/userQueryData";
import { getCosmos } from "@/actions/cosmos";
import { CosmosProps } from "@/types/index.type";
import { useCosmosNavigation } from "@/hooks/useCosmosNavigation";
import Sidebar from "./components/global/sidebar";
// ... other imports

const OpalApp = () => {
  // Use our custom hook
  const { activeCosmosId, navigateToCosmos } = useCosmosNavigation();

  // Rest of your data fetching
  const { data, isFetched } = userQueryData(["user-cosmos"], getCosmos);

  // Type safety and casting
  if (!isFetched || !data) {
    return <div>Loading...</div>;
  }

  const { data: cosmos } = data as CosmosProps;

  return (
    <div className="w-full h-full flex">
      {/* Main app layout */}
      <Sidebar />
      <div className="flex-1">{/* Cosmos content */}</div>
    </div>
  );
};

export default OpalApp;

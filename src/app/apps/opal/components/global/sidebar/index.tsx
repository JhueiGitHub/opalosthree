// src/app/apps/opal/components/global/sidebar/index.tsx
"use client";

import React from "react";
import { userQueryData } from "@/hooks/userQueryData";
import { getCosmos } from "@/actions/cosmos";
import { CosmosProps } from "@/types/index.type";
import { useCosmosNavigation } from "@/hooks/useCosmosNavigation";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
// ... other imports

const Sidebar = () => {
  // Use our custom hook for cosmos navigation
  const { activeCosmosId, navigateToCosmos } = useCosmosNavigation();

  // Fetch cosmos data with your existing data hook
  const { data, isFetched } = userQueryData(["user-cosmos"], getCosmos);

  // Safety check for data
  if (!isFetched || !data) {
    return (
      <div className="bg-[#111111] flex-none relative p-4 h-full w-[250px]">
        Loading...
      </div>
    );
  }

  // Type cast for cosmos data
  const { data: cosmos } = data as CosmosProps;

  return (
    <div className="bg-[#111111] flex-none relative p-4 h-full w-[250px] flex flex-col gap-4 items-center overflow-hidden">
      {/* Logo and header */}
      <div className="bg-[#111111] p-4 flex gap-2 justify-center items-center mb-4 absolute top-0 left-0 right-0 ">
        <Image src="/opal-logo.svg" height={40} width={40} alt="logo" />
        <p className="text-2xl">Opal</p>
      </div>

      {/* Cosmos selector with our navigation function */}
      <Select defaultValue={activeCosmosId} onValueChange={navigateToCosmos}>
        <SelectTrigger className="mt-16 text-neutral-400 bg-transparent">
          <SelectValue placeholder="Select a cosmos" />
        </SelectTrigger>
        <SelectContent className="bg-[#111111] backdrop-blur-xl">
          <SelectGroup>
            <SelectLabel>Cosmos</SelectLabel>
            <Separator />
            {cosmos.cosmos.map((item) => (
              <SelectItem value={item.id} key={item.id}>
                {item.name}
              </SelectItem>
            ))}
            {/* ... members mapping */}
          </SelectGroup>
        </SelectContent>
      </Select>

      {/* Rest of your sidebar implementation */}
    </div>
  );
};

export default Sidebar;

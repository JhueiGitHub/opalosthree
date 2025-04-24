// src/app/apps/opal/App.tsx
"use client";

import React from "react";
import { useAppSelector } from "@/redux/store";
import { userQueryData } from "@/hooks/userQueryData";
import { getCosmos } from "@/actions/cosmos";
import { getNotifications } from "@/actions/user";
import { CosmosProps, NotificationProps } from "@/types/index.type";
import { usePathname, useRouter } from "next/navigation";
import { MENU_ITEMS } from "@/constants";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { Separator } from "@/components/ui/separator";

const OpalApp = () => {
  const router = useRouter();
  const pathname = usePathname();

  // Get activeCosmosId from Redux instead of props
  const activeCosmosId = useAppSelector(
    (state) => state.activeCosmos.activeCosmosId
  );

  // Early return if we don't have a valid ID yet
  if (!activeCosmosId) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <p>Loading cosmos data...</p>
      </div>
    );
  }

  // Fetch all cosmos data - exactly like in your MenuBar
  const { data, isFetched } = userQueryData(["user-cosmos"], getCosmos);
  const menuItems = MENU_ITEMS(activeCosmosId);

  // Type safety for cosmos data
  if (!isFetched || !data) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <p>Loading cosmos data...</p>
      </div>
    );
  }

  // Get notifications - exactly like in your MenuBar
  const { data: notifications } = userQueryData(
    ["user-notifications"],
    getNotifications
  );

  // Type cast to your types - exactly like in your MenuBar
  const { data: cosmos } = data as CosmosProps;
  const { data: count } = notifications as NotificationProps;

  // Find current cosmos - exactly like in your MenuBar
  const currentCosmos =
    cosmos.cosmos.find((s) => s.id === activeCosmosId) || cosmos.cosmos[0];

  // Handle cosmos change
  const onChangeActiveCosmos = (value: string) => {
    router.push(`/desktop/${value}`);
  };

  return (
    <div className="w-full h-full flex">
      <div className="w-[270px] h-full bg-black bg-opacity-30 rounded-sm p-[6px] flex flex-col">
        {/* Your UI can directly use cosmos.cosmos, cosmos.members, etc. */}
        <Select
          defaultValue={activeCosmosId}
          onValueChange={onChangeActiveCosmos}
        >
          <SelectTrigger className="w-full text-neutral-400 bg-transparent mb-2">
            <SelectValue placeholder="Select a Cosmos" />
          </SelectTrigger>
          <SelectContent className="bg-[#111111] backdrop-blur-xl">
            <SelectGroup>
              <SelectLabel>Cosmos'</SelectLabel>
              <Separator />
              {cosmos.cosmos.map((cosmos) => (
                <SelectItem key={cosmos.id} value={cosmos.id}>
                  {cosmos.name}
                </SelectItem>
              ))}
              {/* Rest of your select items */}
            </SelectGroup>
          </SelectContent>
        </Select>

        {/* Rest of your OpalApp UI, using cosmos directly */}
      </div>
    </div>
  );
};

export default OpalApp;

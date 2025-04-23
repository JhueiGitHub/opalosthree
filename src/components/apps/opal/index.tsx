"use client";

import React from "react";
import { userQueryData } from "@/hooks/userQueryData";
import { getCosmos } from "@/actions/cosmos";
import { getNotifications } from "@/actions/user";
import { CosmosProps, NotificationProps } from "@/types/index.type";
import InfoBar from "@/components/global/info-bar";
import { MENU_ITEMS } from "@/constants";
import MenuBarItem from "@/components/desktop/menu-bar-item";
import { usePathname, useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import Modal from "@/components/modal";
import { PlusCircle } from "lucide-react";
import Search from "@/components/search";
import GlobalCard from "@/components/global/global-card";
import { Button } from "@/components/ui/button";
import Loader from "@/components/global/loader";
import CosmosPlaceholder from "@/components/desktop/cosmos-placeholder";

type OpalAppProps = {
  activeCosmosId: string;
};

const OpalApp = ({ activeCosmosId }: OpalAppProps) => {
  const router = useRouter();
  const pathName = usePathname();

  const { data, isFetched } = userQueryData(["user-cosmos"], getCosmos);
  const menuItems = MENU_ITEMS(activeCosmosId);

  const { data: notifications } = userQueryData(
    ["user-notifications"],
    getNotifications
  );

  const { data: cosmos } = data as CosmosProps;
  const { data: count } = notifications as NotificationProps;

  const onChangeActiveCosmos = (value: string) => {
    router.push(`/desktop/${value}`);
  };

  const currentCosmos = cosmos?.cosmos.find((s) => s.id === activeCosmosId);

  return (
    <div className="flex h-full w-full">
      {/* Sidebar - 270px width */}
      <div className="w-[270px] h-full bg-black bg-opacity-30 rounded-sm p-[6px] flex flex-col">
        <div className="bg-black/60 p-4 flex gap-2 justify-center items-center mb-4">
          <Image src="/system/stallion.png" height={40} width={40} alt="logo" />
          <p className="text-2xl">Opal</p>
        </div>

        <Select
          defaultValue={activeCosmosId}
          onValueChange={onChangeActiveCosmos}
        >
          <SelectTrigger className="text-neutral-400 bg-transparent">
            <SelectValue placeholder="Select a Cosmos">
              {currentCosmos?.name || "Select a Cosmos"}
            </SelectValue>
          </SelectTrigger>
          <SelectContent className="bg-[#111111] backdrop-blur-xl">
            <SelectGroup>
              <SelectLabel>Cosmos'</SelectLabel>
              <Separator />
              {cosmos?.cosmos.map((cosmos) => (
                <SelectItem key={cosmos.id} value={cosmos.id}>
                  {cosmos.name}
                </SelectItem>
              ))}
              {cosmos?.members &&
                cosmos.members.length > 0 &&
                cosmos.members.map(
                  (cosmos) =>
                    cosmos.Cosmos && (
                      <SelectItem
                        key={cosmos.Cosmos.id}
                        value={cosmos.Cosmos.id}
                      >
                        {cosmos.Cosmos.name}
                      </SelectItem>
                    )
                )}
            </SelectGroup>
          </SelectContent>
        </Select>

        {currentCosmos?.type === "PUBLIC" &&
          cosmos?.subscription?.plan === "PRO" && (
            <Modal
              trigger={
                <span className="text-sm pt-[6px] cursor-pointer flex items-center justify-center bg-neutral-800/90 hover:bg-neutral-800/60 w-full rounded-sm p-[5px] gap-2">
                  <PlusCircle
                    size={15}
                    className="text-neutral-800/90 fill-neutral-500"
                  />
                  <span className="text-neutral-400 font-semibold text-xs">
                    Invite To Cosmos
                  </span>
                </span>
              }
              title="Invite To Cosmos"
              description="Invite other users to your cosmos"
            >
              <Search cosmosId={activeCosmosId} />
            </Modal>
          )}

        <p className="w-full text-[#9D9D9D] font-bold mt-4 pl-1">Menu</p>
        <nav className="w-full">
          <ul>
            {menuItems.map((item) => (
              <MenuBarItem
                href={item.href}
                icon={item.icon}
                selected={pathName === item.href}
                title={item.title}
                key={item.title}
                notifications={
                  (item.title === "Notifications" &&
                    count?._count &&
                    count._count.notification) ||
                  0
                }
              />
            ))}
          </ul>
        </nav>

        <Separator className="w-full" />
        <p className="w-full text-[#9D9D9D] font-bold mt-4 pl-1">Cosmos'</p>

        {cosmos?.cosmos.length === 1 && cosmos.members.length === 0 && (
          <div className="w-full mt-[6px] pl-1">
            <p className="text-[#3C3C3C] font-medium text-sm">
              {cosmos.subscription?.plan === "FREE"
                ? "Upgrade to create cosmos"
                : "No Cosmos"}
            </p>
          </div>
        )}

        {/* Scrollable cosmos list */}
        <nav className="w-full flex-1">
          <ul className="h-[150px] overflow-auto overflow-x-hidden fade-layer">
            {cosmos?.cosmos.length > 0 &&
              cosmos.cosmos.map(
                (item) =>
                  item.type !== "PERSONAL" && (
                    <MenuBarItem
                      href={`/desktop/${item.id}`}
                      selected={pathName === `/desktop/${item.id}`}
                      title={item.name}
                      notifications={0}
                      key={item.name}
                      icon={
                        <CosmosPlaceholder>
                          {item.name.charAt(0)}
                        </CosmosPlaceholder>
                      }
                    />
                  )
              )}
            {cosmos?.members &&
              cosmos.members.length > 0 &&
              cosmos.members.map((item) => (
                <MenuBarItem
                  href={`/desktop/${item.Cosmos.id}`}
                  selected={pathName === `/desktop/${item.Cosmos.id}`}
                  title={item.Cosmos.name}
                  notifications={0}
                  key={item.Cosmos.name}
                  icon={
                    <CosmosPlaceholder>
                      {item.Cosmos.name.charAt(0)}
                    </CosmosPlaceholder>
                  }
                />
              ))}
          </ul>
        </nav>

        {/* Upgrade card at the bottom */}
        <div className="relative w-full mt-auto">
          {cosmos?.subscription?.plan === "FREE" && (
            <GlobalCard
              title="Upgrade to Pro"
              description="Unlock AI features like transcription, AI summary, and more."
              footer={
                <Button className="text-sm w-full mt-2 bg-[#4C4F69]">
                  <Loader state={false}>Upgrade</Loader>
                </Button>
              }
            ></GlobalCard>
          )}
        </div>
      </div>

      {/* Main content area */}
      <div className="flex-1 overflow-hidden relative">
        <InfoBar />

        <div className="pt-20 p-6 h-full overflow-y-auto">
          {/* This is where the page content would go */}
          <h1 className="text-3xl font-bold text-white mb-4">My Library</h1>
          <p className="text-[#9D9D9D]">
            Your Opal workspace content will appear here.
          </p>
        </div>
      </div>
    </div>
  );
};

export default OpalApp;

"use client";

import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { usePathname, useRouter } from "next/navigation";
import "../../app/globals.css";
import { Separator } from "../ui/separator";
import { userQueryData } from "@/hooks/userQueryData";
import { getCosmos } from "@/actions/cosmos";
import { CosmosProps, NotificationProps } from "@/types/index.type";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Modal from "../modal";
import { PlusCircle } from "lucide-react";
import Search from "../search";
import { MENU_ITEMS } from "@/constants";
import MenuBarItem from "./menu-bar-item";
import { getNotifications } from "@/actions/user";
import CosmosPlaceholder from "./cosmos-placeholder";
import GlobalCard from "../global/global-card";
import { Button } from "../ui/button";
import Loader from "../global/loader";
import InfoBar from "../global/info-bar";

type Props = {
  activeCosmosId: string;
};

const IconButton: React.FC<{ src: string; onClick?: () => void }> = ({
  src,
  onClick,
}) => {
  return (
    <motion.button
      className="relative p-2 rounded-md flex items-center justify-center hover:bg-white/5"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
    >
      <motion.img
        src={src}
        alt="System Icon"
        className="w-4 h-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      />
    </motion.button>
  );
};

const MenuBar = ({ activeCosmosId }: Props) => {
  //WIP: Wire up Upgrade button
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

  const currentCosmos = cosmos.cosmos.find((s) => s.id === activeCosmosId);

  console.log(activeCosmosId);
  return (
    <div className="w-full h-[32px] flex items-start bg-black/60 backdrop-blur-xl">
      <Select
        defaultValue={activeCosmosId}
        onValueChange={onChangeActiveCosmos}
      >
        <SelectTrigger className="text-neutral-400 w-[39px] h-[32px]">
          <SelectValue placeholder="Select a Cosmos">
            <Image
              src="/icns/system/_dopa.png"
              alt="hmm"
              width="16"
              height="16"
            />
          </SelectValue>
        </SelectTrigger>
        <SelectContent className="backdrop-blur-xl w-[99vw] h-[99vh] flex">
          <div className="w-full h-full flex">
            <div className="w-[270px] bg-black bg-opacity-30 rounded-sm p-[6px]">
              <SelectGroup>
                <SelectLabel>Cosmos'</SelectLabel>
              </SelectGroup>
              <Separator />
              {cosmos.cosmos.map((cosmos) => (
                <SelectItem key={cosmos.id} value={cosmos.id}>
                  {cosmos.name}
                </SelectItem>
              ))}
              {cosmos.members.length > 0 &&
                cosmos.members.map(
                  (cosmos) =>
                    cosmos.Cosmos && (
                      <SelectItem
                        key="cosmos.Cosmos.id"
                        value="cosmos.Cosmos.id"
                      >
                        {cosmos.Cosmos.name}
                      </SelectItem>
                    )
                )}
              {currentCosmos?.type === "PUBLIC" &&
                cosmos.subscription?.plan == "PRO" && (
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
                          count._count &&
                          count._count.notification) ||
                        0
                      }
                    />
                  ))}
                </ul>
              </nav>
              <Separator className="w-full" />
              <p className="w-full text-[#9D9D9D] font-bold mt-4 pl-1">
                Cosmos'
              </p>

              {cosmos.cosmos.length === 1 && cosmos.members.length === 0 && (
                <div className="w-full mt-[6px] pl-1">
                  <p className="text-[#3C3C3C] font-medium text-sm">
                    {cosmos.subscription?.plan === "FREE"
                      ? "Upgrade to create cosmos"
                      : "No Cosmos"}
                  </p>
                </div>
              )}

              <nav className="w-full">
                <ul className="h-[150px] overflow-auto overflow-x-hidden fade-layer">
                  {cosmos.cosmos.length > 0 &&
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
                  {cosmos.members.length > 0 &&
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
              <div className="fixed bottom-0 w-[170px]">
                {cosmos.subscription?.plan === "FREE" && (
                  <GlobalCard
                    title="Upgrade to Pro"
                    description="Unlock AI features like transcription, AI summary, and more."
                    footer={
                      <Button className="text-sm w-full mt-2 bg-[#4C4F69]">
                        <Loader>Upgrade</Loader>
                      </Button>
                    }
                  ></GlobalCard>
                )}
              </div>
            </div>
            <div className="h-full w-[1569px] flex flex-col">
              <InfoBar />
            </div>
          </div>
        </SelectContent>
      </Select>
    </div>
  );
};

export default MenuBar;

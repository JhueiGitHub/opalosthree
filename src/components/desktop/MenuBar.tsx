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
import { useRouter } from "next/navigation";
import "../../app/globals.css";
import { Separator } from "../ui/separator";
import { userQueryData } from "@/hooks/userQueryData";
import { getCosmos } from "@/actions/cosmos";
import { CosmosProps } from "@/types/index.type";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

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
  const router = useRouter();

  const { data, isFetched } = userQueryData(["user-cosmos"], getCosmos);

  const { data: cosmos } = data as CosmosProps;

  const onChangeActiveCosmos = (value: string) => {
    router.push(`/desktop/${value}`);
  };

  console.log(activeCosmosId);
  return (
    <div className="w-full h-[32px] flex items-start bg-black/60">
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
        <SelectContent className="backdrop-blur-xl">
          <SelectGroup>
            <SelectLabel>Cosmos'</SelectLabel>
          </SelectGroup>
          <Separator />
          {cosmos.cosmos.map((cosmos) => (
            <SelectItem key={cosmos.id} value={cosmos.id}>
              {cosmos.name}
            </SelectItem>
          ))}
          {cosmos.cosmosmembers.length > 0 &&
            cosmos.cosmosmembers.map(
              (cosmos) =>
                cosmos.Cosmos && (
                  <SelectItem key="cosmos.Cosmos.id" value="cosmos.Cosmos.id">
                    {cosmos.Cosmos.name}
                  </SelectItem>
                )
            )}
        </SelectContent>
      </Select>
    </div>
  );
};

export default MenuBar;

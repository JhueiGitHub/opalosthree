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
import { CosmosProps } from "@/types/index.types";

type Props = {
  activeCosmosId: string;
};

const MenuBar = ({ activeCosmosId }: Props) => {
  const router = useRouter();

  const { data, isFetched } = userQueryData(["user-cosmos"], getCosmos);

  const { data: cosmos } = data as CosmosProps;

  const onChangeActiveCosmos = (value: string) => {
    router.push(`/desktop/${value}`);
  };

  return (
    <div className="w-full h-[200px] flex items-start">
      <Select
        defaultValue={activeCosmosId}
        onValueChange={onChangeActiveCosmos}
      >
        <SelectTrigger className="text-black w-[180px]">
          <SelectValue>Select a Cosmos</SelectValue>
        </SelectTrigger>
        <SelectContent className="backdrop-blur-xl">
          <SelectGroup>
            <SelectLabel></SelectLabel>
          </SelectGroup>
          <Separator />
          {cosmos.cosmos.map((cosmos) => (
            <SelectItem key={cosmos.id} value={cosmos.id}>
              {cosmos.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default MenuBar;

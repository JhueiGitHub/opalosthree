"use client";

import React from "react";
import MenuBar from "./MenuBar";

type Props = {
  activeCosmosId: string;
};

const Desktop = ({ activeCosmosId }: Props) => {
  return (
    <div className="w-full h-full flex flex-col">
      <MenuBar activeCosmosId={activeCosmosId} />
    </div>
  );
};

export default Desktop;

import { Search } from "lucide-react";
import React from "react";

type Props = {};

const InfoBar = (props: Props) => {
  return (
    <header className="pl-6 fixed p-[18px] flex w-[1569px] items-start justify-between gap-4">
      <div className="flex gap-4 justify-center items-center border-2 rounded-full px-4 w-full">
        <Search size={25} className="text-[#707070]" />
      </div>
    </header>
  );
};

export default InfoBar;

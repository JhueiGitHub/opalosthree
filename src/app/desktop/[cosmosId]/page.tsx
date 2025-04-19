import React from "react";

type Props = {
  params: {
    cosmosId: string; // Must exactly match the folder name [cosmosId]
  };
};

const Page = ({ params }: Props) => {
  return (
    <div className="w-full h-full flex justify-center items-center text-[#4C4F69]">
      Current Cosmos ID: {params.cosmosId}
    </div>
  );
};

export default Page;

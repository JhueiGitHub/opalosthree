import { verifyAccessToCosmos } from "@/actions/cosmos";
import { onAuthenticateUser } from "@/actions/user";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  params: {
    cosmosId: string; // Must exactly match the folder name [cosmosId]
  };
  children: React.ReactNode;
};

const CosmosLayout = async ({ params: { cosmosId }, children }: Props) => {
  // You can now use params.cosmosId directly
  const auth = await onAuthenticateUser();
  if (!auth.user?.cosmos) redirect("/auth/sign-in");
  if (!auth.user.cosmos.length) redirect("/auth/sign-in");
  const hasAccess = await verifyAccessToCosmos(cosmosId);
  return <div className="h-screen w-screen overfl">{children}</div>;
};

export default CosmosLayout;

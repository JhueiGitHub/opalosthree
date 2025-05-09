import {
  getAllUserVideos,
  getCosmos,
  getFolders,
  verifyAccessToCosmos,
} from "@/actions/cosmos";
import { getNotifications, onAuthenticateUser } from "@/actions/user";
import { redirect } from "next/navigation";
import React, { useEffect } from "react";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
// Import directly from the Desktop.tsx file to avoid any potential issues
import Desktop from "@/components/desktop/Desktop";
import { ReduxProvider } from "@/redux/provider";
import { setActiveCosmosId } from "@/redux/slices/activeCosmos";
import { useAppDispatch } from "@/redux/store";
import CosmosStateInitializer from "@/components/cosmos/CosmosStateInitializer";

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

  if (hasAccess.status !== 200) {
    redirect(`/desktop/${auth.user?.cosmos[0].id}`);
  }
  if (!hasAccess.data?.cosmos) return null;

  const query = new QueryClient();

  await query.prefetchQuery({
    queryKey: ["cosmos-folders"],
    queryFn: () => getFolders(cosmosId),
  });
  await query.prefetchQuery({
    queryKey: ["user-videos"],
    queryFn: () => getAllUserVideos(cosmosId),
  });
  await query.prefetchQuery({
    queryKey: ["user-cosmos"],
    queryFn: () => getCosmos(),
  });
  await query.prefetchQuery({
    queryKey: ["user-notifications"],
    queryFn: () => getNotifications(),
  });

  return (
    <HydrationBoundary state={dehydrate(query)}>
      <ReduxProvider>
        <CosmosStateInitializer cosmosId={cosmosId} />

        <div className="fixed inset-0 overflow-hidden bg-black">
          <Desktop activeCosmosId={cosmosId} />
          {children}
        </div>
      </ReduxProvider>
    </HydrationBoundary>
  );
};

export default CosmosLayout;

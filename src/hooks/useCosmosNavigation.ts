// src/hooks/useCosmosNavigation.ts
"use client";

import { useAppDispatch, useAppSelector } from "@/redux/store";
import { setActiveCosmosId } from "@/redux/slices/activeCosmos";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export const useCosmosNavigation = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const activeCosmosId = useAppSelector(
    (state) => state.activeCosmos.activeCosmosId
  );

  // Extract cosmosId from URL if it exists
  useEffect(() => {
    const match = pathname.match(/\/desktop\/([^\/]+)/);
    if (match && match[1] && match[1] !== activeCosmosId) {
      dispatch(setActiveCosmosId(match[1]));
    }
  }, [pathname, dispatch, activeCosmosId]);

  // Function to navigate between cosmos
  const navigateToCosmos = (cosmosId: string) => {
    // Update Redux
    dispatch(setActiveCosmosId(cosmosId));

    // Determine if we need to update URL
    // If we're in a window context, we don't change the URL
    const isInWindowContext = pathname.includes("/apps/opal");

    if (!isInWindowContext) {
      // Only update URL if we're not in a window context
      router.push(`/desktop/${cosmosId}`);
    }
  };

  return { activeCosmosId, navigateToCosmos };
};

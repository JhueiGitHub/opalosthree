// src/components/cosmos/CosmosStateInitializer.tsx
"use client";

import { useEffect } from "react";
import { useAppDispatch } from "@/redux/store";
import { setActiveCosmosId } from "@/redux/slices/activeCosmos";

interface CosmosStateInitializerProps {
  cosmosId: string;
}

const CosmosStateInitializer = ({ cosmosId }: CosmosStateInitializerProps) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (cosmosId) {
      // Make sure cosmosId exists before dispatching
      dispatch(setActiveCosmosId(cosmosId));
    }
  }, [cosmosId, dispatch]);

  return null;
};

export default CosmosStateInitializer;

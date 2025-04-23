"use client";

import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/redux/store";
import { usePathname } from "next/navigation";
import { logEvent } from "@/redux/slices/debug";

const OpalApp = () => {
  const dispatch = useAppDispatch();
  const pathname = usePathname();

  // Extract cosmosId from the pathname
  // The pathname format is "/desktop/[cosmosId]"
  const activeCosmosId = pathname.split("/")[2];

  // Access the workspaces from Redux to get more info about this cosmos
  const workspaces = useAppSelector((state) => state.workspaces.workspaces);

  // Find the current cosmos in workspaces
  const currentCosmos = workspaces.find(
    (workspace) => workspace.id === activeCosmosId
  );

  useEffect(() => {
    // Log that the Opal app is displaying a specific cosmos
    dispatch(
      logEvent({
        message: `Opal app displaying cosmos: ${activeCosmosId}`,
        data: {
          cosmosId: activeCosmosId,
          cosmosName: currentCosmos?.name || "Unknown",
          timestamp: new Date().toISOString(),
        },
      })
    );
  }, [activeCosmosId, currentCosmos, dispatch]);

  return (
    <div className="w-full h-full p-6 overflow-auto">
      <div className="p-6">
        <h2 className="text-xl font-bold text-white mb-4">
          Cosmos Information
        </h2>

        <div className="space-y-4">
          <div className="flex flex-col space-y-1">
            <span className="text-sm text-white/50">Cosmos ID:</span>
            <code className="bg-black/40 p-2 rounded text-green-400 font-mono text-sm">
              {activeCosmosId}
            </code>
          </div>

          {currentCosmos && (
            <>
              <div className="flex flex-col space-y-1">
                <span className="text-sm text-white/50">Name:</span>
                <p className="text-white">{currentCosmos.name}</p>
              </div>

              <div className="flex flex-col space-y-1">
                <span className="text-sm text-white/50">Type:</span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-500/20 text-purple-200">
                  {currentCosmos.type}
                </span>
              </div>
            </>
          )}

          {!currentCosmos && (
            <p className="text-yellow-400">
              No additional information available for this cosmos.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default OpalApp;

"use client";

import React, { useEffect } from "react";
import { useAppDispatch } from "@/redux/store";
import { logEvent } from "@/redux/slices/debug";
import { redirect } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Search from "@/components/search";
import { userQueryData } from "@/hooks/userQueryData";
import { getCosmos } from "@/actions/cosmos";
import { CosmosProps } from "@/types/index.type";
import { MENU_ITEMS } from "@/constants";
import { getNotifications } from "@/actions/user";

/**
 * OpalApp Component
 *
 * This component renders the Opal interface inside a window.
 * It reuses the existing components from the Opal app but adapted to work
 * within a window environment.
 */
const OpalApp = () => {
  const dispatch = useAppDispatch();

  // Fetch cosmos data using the existing hooks
  const { data, isPending } = userQueryData(["user-cosmos"], getCosmos);
  const { data: cosmos } = data as CosmosProps;

  // Get notifications
  const { data: notifications } = userQueryData(
    ["user-notifications"],
    getNotifications
  );

  // Log the app loading
  useEffect(() => {
    dispatch(
      logEvent({
        message: "Opal app loaded",
        data: {
          timestamp: new Date().toISOString(),
        },
      })
    );
  }, [dispatch]);

  // Loading state
  if (isPending) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  // If no cosmos data, show error
  if (!cosmos) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center p-6">
        <h2 className="text-xl font-semibold text-red-400 mb-4">
          Error Loading Cosmos
        </h2>
        <p className="text-white/70 text-center">
          Unable to load cosmos data. Please make sure you are signed in and try
          again.
        </p>
      </div>
    );
  }

  // Get the active cosmos (default to first one)
  const activeCosmosId = cosmos?.cosmos?.[0]?.id;
  const activeItems = MENU_ITEMS(activeCosmosId);

  return (
    <div className="w-full h-full bg-[#171717] overflow-auto">
      {/* Main content area */}
      <div className="w-full h-full p-6">
        <Tabs defaultValue="videos" className="w-full">
          <div className="flex w-full justify-between items-center mb-4">
            <TabsList className="bg-transparent gap-2 pl-0">
              <TabsTrigger
                className="p-[13px] px-6 rounded-full data-[state=active]:bg-[#252525]"
                value="videos"
              >
                Videos
              </TabsTrigger>
              <TabsTrigger
                value="archive"
                className="p-[13px] px-6 rounded-full data-[state=active]:bg-[#252525]"
              >
                Archive
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="videos">
            {/* This would normally contain video content */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
              {/* Placeholder for videos */}
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="bg-black/30 rounded-lg p-4 flex flex-col aspect-video"
                >
                  <div className="w-full h-32 bg-purple-900/20 rounded-lg animate-pulse mb-2"></div>
                  <div className="h-4 w-3/4 bg-white/10 rounded animate-pulse mb-2"></div>
                  <div className="h-3 w-1/2 bg-white/5 rounded animate-pulse"></div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="archive">
            <div className="p-4 text-white/70">No archived content yet.</div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default OpalApp;

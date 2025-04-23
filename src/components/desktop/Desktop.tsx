"use client";

import { useEffect } from "react";
import { useAppDispatch } from "@/redux/store";
import { logEvent } from "@/redux/slices/debug";
import WindowsManager from "./window/WindowsManager";
import Dock from "./dock/Dock";
import DebugPanel from "./debug/DebugPanel";
import MenuBar from "./menu-bar";
import { openWindow } from "@/redux/slices/windows";

interface DesktopProps {
  activeCosmosId: string;
}

const Desktop = ({ activeCosmosId }: DesktopProps) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Log initial desktop setup with current cosmos
    dispatch(
      logEvent({
        message: `Desktop initialized with active Cosmos: ${activeCosmosId}`,
        data: {
          cosmosId: activeCosmosId,
          timestamp: new Date().toISOString(),
        },
      })
    );

    // Open Opal app on startup
    dispatch(
      openWindow({
        id: "opal-main",
        appId: "opal",
        title: "Opal",
        // Centered position
        position: {
          x: Math.max(0, (window.innerWidth - 1000) / 2),
          y: Math.max(0, (window.innerHeight - 700) / 2),
        },
        // Larger size for main app
        size: { width: 1000, height: 700 },
      })
    );
  }, [activeCosmosId, dispatch]);

  return (
    <div className="w-full h-screen overflow-hidden relative">
      {/* Menu Bar */}
      <MenuBar activeCosmosId={activeCosmosId} />

      {/* Windows Manager - handles all windows */}
      <WindowsManager />

      {/* Dock */}
      <Dock />

      {/* Debug Panel */}
      <DebugPanel />
    </div>
  );
};

export default Desktop;

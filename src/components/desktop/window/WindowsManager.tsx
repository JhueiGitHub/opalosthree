"use client";

import { useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import Window from "./Window";
import { useAppSelector, useAppDispatch } from "@/redux/store";
import OpalApp from "@/app/apps/opal/App";
import { logEvent } from "@/redux/slices/debug";

const WindowsManager = () => {
  const dispatch = useAppDispatch();
  const { windows, focusedWindowId } = useAppSelector((state) => state.windows);

  // Create a sorted list of windows based on z-index
  const sortedWindows = Object.values(windows)
    .filter((window) => !window.isMinimized)
    .sort((a, b) => a.zIndex - b.zIndex);

  // Log when windows change
  useEffect(() => {
    dispatch(
      logEvent({
        message: `Windows updated: ${sortedWindows.length} visible windows`,
        data: {
          windowCount: sortedWindows.length,
          windowIds: sortedWindows.map((w) => w.id),
          focusedWindowId,
        },
      })
    );
  }, [sortedWindows.length, focusedWindowId, dispatch]);

  return (
    <div className="fixed inset-0 z-10 pointer-events-none">
      <AnimatePresence>
        {sortedWindows.map((window) => (
          <Window
            key={window.id}
            id={window.id}
            title={window.title}
            position={window.position}
            size={window.size}
            zIndex={window.zIndex}
            isMaximized={window.isMaximized}
            isActive={window.id === focusedWindowId}
            layout={window.layout}
          >
            {window.appId === "opal" && <OpalApp />}
            {/* Add other app components as needed */}
          </Window>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default WindowsManager;

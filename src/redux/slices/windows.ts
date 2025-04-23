// src/redux/slices/windows.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { logEvent } from "./debug";

export interface WindowPosition {
  x: number;
  y: number;
}

export interface WindowSize {
  width: number;
  height: number;
}

export interface WindowData {
  id: string;
  appId: string;
  title: string;
  position: WindowPosition;
  size: WindowSize;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  layout: string; // For snap layouts
}

interface WindowsState {
  windows: Record<string, WindowData>;
  focusedWindowId: string | null;
  nextZIndex: number;
}

// Define layout constants
export const LAYOUTS = {
  FLOATING: "floating",
  MAXIMIZED: "maximized",
  SNAP_LEFT: "snap-left",
  SNAP_RIGHT: "snap-right",
  SNAP_TOP: "snap-top",
  SNAP_BOTTOM: "snap-bottom",
  SNAP_TOP_LEFT: "snap-top-left",
  SNAP_TOP_RIGHT: "snap-top-right",
  SNAP_BOTTOM_LEFT: "snap-bottom-left",
  SNAP_BOTTOM_RIGHT: "snap-bottom-right",
};

const initialState: WindowsState = {
  windows: {},
  focusedWindowId: null,
  nextZIndex: 1,
};

export const windowsSlice = createSlice({
  name: "windows",
  initialState,
  reducers: {
    openWindow: (
      state,
      action: PayloadAction<{
        id: string;
        appId: string;
        title: string;
        position?: WindowPosition;
        size?: WindowSize;
      }>
    ) => {
      const { id, appId, title, position, size } = action.payload;

      // Default position for new windows (centered)
      const defaultPosition = {
        x: Math.max(0, (window.innerWidth - 800) / 2),
        y: Math.max(32, (window.innerHeight - 600) / 2), // Account for menu bar
      };

      // Default size for new windows
      const defaultSize = { width: 800, height: 600 };

      state.windows[id] = {
        id,
        appId,
        title,
        position: position || defaultPosition,
        size: size || defaultSize,
        isMinimized: false,
        isMaximized: false,
        zIndex: state.nextZIndex,
        layout: LAYOUTS.FLOATING,
      };

      state.focusedWindowId = id;
      state.nextZIndex += 1;
    },

    closeWindow: (state, action: PayloadAction<string>) => {
      const windowId = action.payload;
      delete state.windows[windowId];

      // If we closed the focused window, focus another window if available
      if (state.focusedWindowId === windowId) {
        const remainingWindows = Object.values(state.windows);
        if (remainingWindows.length > 0) {
          // Find the window with the highest z-index to focus
          const highestZWindow = remainingWindows.reduce((a, b) =>
            a.zIndex > b.zIndex ? a : b
          );
          state.focusedWindowId = highestZWindow.id;
        } else {
          state.focusedWindowId = null;
        }
      }
    },

    focusWindow: (state, action: PayloadAction<string>) => {
      const windowId = action.payload;
      if (state.windows[windowId] && state.focusedWindowId !== windowId) {
        state.focusedWindowId = windowId;
        state.windows[windowId].zIndex = state.nextZIndex;
        state.nextZIndex += 1;
      }
    },

    moveWindow: (
      state,
      action: PayloadAction<{ id: string; position: WindowPosition }>
    ) => {
      const { id, position } = action.payload;
      if (state.windows[id]) {
        state.windows[id].position = position;

        // If layout was anything other than floating, reset it
        if (state.windows[id].layout !== LAYOUTS.FLOATING) {
          state.windows[id].layout = LAYOUTS.FLOATING;
        }
      }
    },

    resizeWindow: (
      state,
      action: PayloadAction<{ id: string; size: WindowSize }>
    ) => {
      const { id, size } = action.payload;
      if (state.windows[id]) {
        state.windows[id].size = size;

        // If layout was anything other than floating, reset it
        if (state.windows[id].layout !== LAYOUTS.FLOATING) {
          state.windows[id].layout = LAYOUTS.FLOATING;
        }
      }
    },

    minimizeWindow: (state, action: PayloadAction<string>) => {
      const windowId = action.payload;
      if (state.windows[windowId]) {
        state.windows[windowId].isMinimized = true;

        // If we minimized the focused window, focus another non-minimized window
        if (state.focusedWindowId === windowId) {
          const visibleWindows = Object.values(state.windows).filter(
            (w) => !w.isMinimized
          );
          if (visibleWindows.length > 0) {
            const highestZWindow = visibleWindows.reduce((a, b) =>
              a.zIndex > b.zIndex ? a : b
            );
            state.focusedWindowId = highestZWindow.id;
          } else {
            state.focusedWindowId = null;
          }
        }
      }
    },

    maximizeWindow: (state, action: PayloadAction<string>) => {
      const windowId = action.payload;
      if (state.windows[windowId]) {
        state.windows[windowId].isMaximized =
          !state.windows[windowId].isMaximized;
        state.windows[windowId].layout = state.windows[windowId].isMaximized
          ? LAYOUTS.MAXIMIZED
          : LAYOUTS.FLOATING;
      }
    },

    restoreWindow: (state, action: PayloadAction<string>) => {
      const windowId = action.payload;
      if (state.windows[windowId]) {
        state.windows[windowId].isMinimized = false;
        state.windows[windowId].isMaximized = false;
        state.windows[windowId].layout = LAYOUTS.FLOATING;
        state.focusedWindowId = windowId;
        state.windows[windowId].zIndex = state.nextZIndex;
        state.nextZIndex += 1;
      }
    },

    // Window snapping functions
    snapWindowLeft: (state, action: PayloadAction<string>) => {
      const windowId = action.payload;
      if (state.windows[windowId]) {
        const win = state.windows[windowId];
        win.isMaximized = false;
        win.isMinimized = false;
        win.position = { x: 0, y: 32 }; // Account for menu bar
        win.size = {
          width: window.innerWidth / 2,
          height: window.innerHeight - 32, // Subtract menu bar
        };
        win.layout = LAYOUTS.SNAP_LEFT;
        win.zIndex = state.nextZIndex;
        state.nextZIndex += 1;
        state.focusedWindowId = windowId;
      }
    },

    snapWindowRight: (state, action: PayloadAction<string>) => {
      const windowId = action.payload;
      if (state.windows[windowId]) {
        const win = state.windows[windowId];
        win.isMaximized = false;
        win.isMinimized = false;
        win.position = {
          x: window.innerWidth / 2,
          y: 32, // Account for menu bar
        };
        win.size = {
          width: window.innerWidth / 2,
          height: window.innerHeight - 32, // Subtract menu bar
        };
        win.layout = LAYOUTS.SNAP_RIGHT;
        win.zIndex = state.nextZIndex;
        state.nextZIndex += 1;
        state.focusedWindowId = windowId;
      }
    },

    snapWindowTop: (state, action: PayloadAction<string>) => {
      const windowId = action.payload;
      if (state.windows[windowId]) {
        const win = state.windows[windowId];
        win.isMaximized = false;
        win.isMinimized = false;
        win.position = { x: 0, y: 32 }; // Account for menu bar
        win.size = {
          width: window.innerWidth,
          height: (window.innerHeight - 32) / 2, // Adjust for menu bar
        };
        win.layout = LAYOUTS.SNAP_TOP;
        win.zIndex = state.nextZIndex;
        state.nextZIndex += 1;
        state.focusedWindowId = windowId;
      }
    },

    snapWindowBottom: (state, action: PayloadAction<string>) => {
      const windowId = action.payload;
      if (state.windows[windowId]) {
        const win = state.windows[windowId];
        win.isMaximized = false;
        win.isMinimized = false;
        win.position = {
          x: 0,
          y: 32 + (window.innerHeight - 32) / 2, // Half of viewport height + menu bar
        };
        win.size = {
          width: window.innerWidth,
          height: (window.innerHeight - 32) / 2, // Half of viewport height minus menu bar
        };
        win.layout = LAYOUTS.SNAP_BOTTOM;
        win.zIndex = state.nextZIndex;
        state.nextZIndex += 1;
        state.focusedWindowId = windowId;
      }
    },

    snapWindowTopLeft: (state, action: PayloadAction<string>) => {
      const windowId = action.payload;
      if (state.windows[windowId]) {
        const win = state.windows[windowId];
        win.isMaximized = false;
        win.isMinimized = false;
        win.position = { x: 0, y: 32 }; // Account for menu bar
        win.size = {
          width: window.innerWidth / 2,
          height: (window.innerHeight - 32) / 2, // Adjust for menu bar
        };
        win.layout = LAYOUTS.SNAP_TOP_LEFT;
        win.zIndex = state.nextZIndex;
        state.nextZIndex += 1;
        state.focusedWindowId = windowId;
      }
    },

    snapWindowTopRight: (state, action: PayloadAction<string>) => {
      const windowId = action.payload;
      if (state.windows[windowId]) {
        const win = state.windows[windowId];
        win.isMaximized = false;
        win.isMinimized = false;
        win.position = {
          x: window.innerWidth / 2,
          y: 32, // Account for menu bar
        };
        win.size = {
          width: window.innerWidth / 2,
          height: (window.innerHeight - 32) / 2, // Adjust for menu bar
        };
        win.layout = LAYOUTS.SNAP_TOP_RIGHT;
        win.zIndex = state.nextZIndex;
        state.nextZIndex += 1;
        state.focusedWindowId = windowId;
      }
    },

    snapWindowBottomLeft: (state, action: PayloadAction<string>) => {
      const windowId = action.payload;
      if (state.windows[windowId]) {
        const win = state.windows[windowId];
        win.isMaximized = false;
        win.isMinimized = false;
        win.position = {
          x: 0,
          y: 32 + (window.innerHeight - 32) / 2, // Half of viewport height + menu bar
        };
        win.size = {
          width: window.innerWidth / 2,
          height: (window.innerHeight - 32) / 2, // Half of viewport height minus menu bar
        };
        win.layout = LAYOUTS.SNAP_BOTTOM_LEFT;
        win.zIndex = state.nextZIndex;
        state.nextZIndex += 1;
        state.focusedWindowId = windowId;
      }
    },

    snapWindowBottomRight: (state, action: PayloadAction<string>) => {
      const windowId = action.payload;
      if (state.windows[windowId]) {
        const win = state.windows[windowId];
        win.isMaximized = false;
        win.isMinimized = false;
        win.position = {
          x: window.innerWidth / 2,
          y: 32 + (window.innerHeight - 32) / 2, // Half of viewport height + menu bar
        };
        win.size = {
          width: window.innerWidth / 2,
          height: (window.innerHeight - 32) / 2, // Half of viewport height minus menu bar
        };
        win.layout = LAYOUTS.SNAP_BOTTOM_RIGHT;
        win.zIndex = state.nextZIndex;
        state.nextZIndex += 1;
        state.focusedWindowId = windowId;
      }
    },
  },
});

export const {
  openWindow,
  closeWindow,
  focusWindow,
  moveWindow,
  resizeWindow,
  minimizeWindow,
  maximizeWindow,
  restoreWindow,
  snapWindowLeft,
  snapWindowRight,
  snapWindowTop,
  snapWindowBottom,
  snapWindowTopLeft,
  snapWindowTopRight,
  snapWindowBottomLeft,
  snapWindowBottomRight,
} = windowsSlice.actions;

export default windowsSlice.reducer;

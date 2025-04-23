// src/redux/slices/debug.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  openWindow,
  closeWindow,
  focusWindow,
  minimizeWindow,
  maximizeWindow,
  restoreWindow,
} from "./windows";
import { openApp, closeApp } from "./dock";

export interface LogEntry {
  timestamp: string;
  message: string;
  data?: any;
}

interface DebugState {
  isOpen: boolean;
  logs: LogEntry[];
}

const initialState: DebugState = {
  isOpen: true,
  logs: [],
};

export const debugSlice = createSlice({
  name: "debug",
  initialState,
  reducers: {
    toggleDebug: (state) => {
      state.isOpen = !state.isOpen;
    },
    logEvent: (
      state,
      action: PayloadAction<{ message: string; data?: any }>
    ) => {
      const { message, data } = action.payload;
      state.logs.push({
        timestamp: new Date().toISOString(),
        message,
        data,
      });

      // Limit log size to prevent memory issues
      if (state.logs.length > 100) {
        state.logs = state.logs.slice(-100);
      }
    },
    clearLogs: (state) => {
      state.logs = [];
    },
  },
  extraReducers: (builder) => {
    // Log window-related actions
    builder
      .addCase(openWindow, (state, action) => {
        state.logs.push({
          timestamp: new Date().toISOString(),
          message: `Window opened: ${action.payload.title}`,
          data: action.payload,
        });
      })
      .addCase(closeWindow, (state, action) => {
        state.logs.push({
          timestamp: new Date().toISOString(),
          message: `Window closed: ${action.payload}`,
          data: { windowId: action.payload },
        });
      })
      .addCase(focusWindow, (state, action) => {
        state.logs.push({
          timestamp: new Date().toISOString(),
          message: `Window focused: ${action.payload}`,
          data: { windowId: action.payload },
        });
      })
      .addCase(minimizeWindow, (state, action) => {
        state.logs.push({
          timestamp: new Date().toISOString(),
          message: `Window minimized: ${action.payload}`,
          data: { windowId: action.payload },
        });
      })
      .addCase(maximizeWindow, (state, action) => {
        state.logs.push({
          timestamp: new Date().toISOString(),
          message: `Window maximized: ${action.payload}`,
          data: { windowId: action.payload },
        });
      })
      .addCase(restoreWindow, (state, action) => {
        state.logs.push({
          timestamp: new Date().toISOString(),
          message: `Window restored: ${action.payload}`,
          data: { windowId: action.payload },
        });
      })
      // Log dock-related actions
      .addCase(openApp, (state, action) => {
        state.logs.push({
          timestamp: new Date().toISOString(),
          message: `App opened: ${action.payload}`,
          data: { appId: action.payload },
        });
      })
      .addCase(closeApp, (state, action) => {
        state.logs.push({
          timestamp: new Date().toISOString(),
          message: `App closed: ${action.payload}`,
          data: { appId: action.payload },
        });
      });
  },
});

export const { toggleDebug, logEvent, clearLogs } = debugSlice.actions;

export default debugSlice.reducer;

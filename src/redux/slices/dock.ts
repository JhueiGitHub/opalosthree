// src/redux/slices/dock.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { openWindow, closeWindow } from "./windows";

export interface DockApp {
  id: string;
  name: string;
  icon: string; // Path to the app icon
}

interface DockState {
  apps: DockApp[];
  openAppIds: string[];
}

// Initial apps for the dock (we'll only have Opal for now)
const initialState: DockState = {
  apps: [{ id: "opal", name: "Opal", icon: "/icons/opal.png" }],
  openAppIds: [],
};

export const dockSlice = createSlice({
  name: "dock",
  initialState,
  reducers: {
    addApp: (state, action: PayloadAction<DockApp>) => {
      if (!state.apps.some((app) => app.id === action.payload.id)) {
        state.apps.push(action.payload);
      }
    },
    removeApp: (state, action: PayloadAction<string>) => {
      state.apps = state.apps.filter((app) => app.id !== action.payload);
      state.openAppIds = state.openAppIds.filter((id) => id !== action.payload);
    },
    openApp: (state, action: PayloadAction<string>) => {
      const appId = action.payload;
      if (!state.openAppIds.includes(appId)) {
        state.openAppIds.push(appId);
      }
    },
    closeApp: (state, action: PayloadAction<string>) => {
      state.openAppIds = state.openAppIds.filter((id) => id !== action.payload);
    },
  },
  // Track windows opening and closing to update the dock state
  extraReducers: (builder) => {
    builder
      .addCase(openWindow, (state, action) => {
        const appId = action.payload.appId;
        if (!state.openAppIds.includes(appId)) {
          state.openAppIds.push(appId);
        }
      })
      .addCase(closeWindow, (state, action) => {
        // This logic assumes that window IDs match app IDs with a suffix
        // We need to check if this was the last window for this app
        const windowId = action.payload;
        const appId = windowId.split("-")[0]; // Extract the app ID part

        // If there are no more windows for this app, remove it from openAppIds
        state.openAppIds = state.openAppIds.filter((id) => id !== appId);
      });
  },
});

export const { addApp, removeApp, openApp, closeApp } = dockSlice.actions;

export default dockSlice.reducer;

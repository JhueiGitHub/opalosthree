// src/redux/store.ts
import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import windowsReducer from "./slices/windows";
import dockReducer from "./slices/dock";
import debugReducer from "./slices/debug";
import foldersReducer from "./slices/folders";
import workspacesReducer from "./slices/workspaces";
import activeCosmosReducer from "./slices/activeCosmos";

export const store = configureStore({
  reducer: {
    windows: windowsReducer,
    dock: dockReducer,
    debug: debugReducer,
    folders: foldersReducer,
    workspaces: workspacesReducer,
    activeCosmos: activeCosmosReducer, // Add this line
    // Add any other existing reducers here
  },
  // Enable Redux DevTools in development
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Custom hooks for better TypeScript support
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

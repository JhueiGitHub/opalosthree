// src/redux/slices/activeCosmos.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ActiveCosmosState {
  activeCosmosId: string; // Remove the `| null` to make it always a string
}

const initialState: ActiveCosmosState = {
  activeCosmosId: "", // Default to empty string instead of null
};

export const activeCosmosSlice = createSlice({
  name: "activeCosmos",
  initialState,
  reducers: {
    setActiveCosmosId: (state, action: PayloadAction<string>) => {
      state.activeCosmosId = action.payload;
    },
  },
});

export const { setActiveCosmosId } = activeCosmosSlice.actions;
export default activeCosmosSlice.reducer;

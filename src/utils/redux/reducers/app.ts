import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AppState = {
  topic: string,
  side: string,
};

const initialState = {
  topic: "",
  side: "",
} as AppState;

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setTopic: (state, action: PayloadAction<string>) => {
      state.topic = action.payload;
    },
    setSide: (state, action: PayloadAction<string>) => {
      state.side = action.payload
    }
  },
});

export const {
  setSide,
  setTopic
} = appSlice.actions;

export default appSlice;
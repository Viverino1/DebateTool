import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AppState = {
  topics: string[],
  topic: string,
  side: string,
};

const initialState = {
  topics: [],
  topic: "",
  side: "",
} as AppState;

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setTopics: (state, action: PayloadAction<string[]>) => {
      state.topics = action.payload;
    },
    setTopic: (state, action: PayloadAction<string>) => {
      state.topic = action.payload;
    },
    setSide: (state, action: PayloadAction<string>) => {
      state.side = action.payload
    },
  },
});

export const {
  setSide,
  setTopic,
  setTopics,
} = appSlice.actions;

export default appSlice;
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Cards } from "../../types";

type AppState = {
  topic: string,
  side: string,
  cards: Cards,
};

const initialState = {
  topic: "",
  side: "",
  cards: {evidences: [], rebuttals: [], quotes: []}
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
    },
    setCards: (state, action: PayloadAction<Cards>) => {
      state.cards = action.payload;
    }
  },
});

export const {
  setSide,
  setTopic,
  setCards,
} = appSlice.actions;

export default appSlice;
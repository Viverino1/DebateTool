import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Round } from "../../types";

type RoundsState = {
  rounds: Round[];
};

const initialState = {
  rounds: [],
} as RoundsState;

export const roundsSlice = createSlice({
  name: "rounds",
  initialState,
  reducers: {
    setRounds: (state, action: PayloadAction<Round[]>) => {
      state.rounds = action.payload;
    }
  },
});

export const {
  setRounds,
} = roundsSlice.actions;

export default roundsSlice;
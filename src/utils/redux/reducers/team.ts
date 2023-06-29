import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Contention, Team } from "../../types";

const initialState = {
  teamName: "",
  teamID: "",
  contentions: [],
  rounds: [],
} as Team;

export const teamSlice = createSlice({
  name: "team",
  initialState,
  reducers: {
    setTeam: (state, action: PayloadAction<Team>) => {
      state.teamName = action.payload.teamName;
      state.teamID = action.payload.teamID;
      state.contentions = action.payload.contentions;
      state.rounds = action.payload.rounds;
    },
    setContentions: (state, action: PayloadAction<Contention[]>) => {
      state.contentions = action.payload;
    }
  },
});

export const {
  setTeam,
  setContentions
} = teamSlice.actions;

export default teamSlice;
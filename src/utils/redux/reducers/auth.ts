import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../types";

type AuthState = {
  isLoggedIn: boolean,
  user: User,
};

const initialState = {
  user: {},
  isLoggedIn: false,
} as AuthState;

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isLoggedIn = action.payload.uid? true : false;
    }
  },
});

export const {
  setUser,
} = authSlice.actions;

export default authSlice;
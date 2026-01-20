import { createReducer } from "@reduxjs/toolkit";
import { logout, setUser } from "./authActions";

const initialState = {
  user: null,
};

export const authReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setUser, (state, action) => {
      state.user = action.payload;
    })
    .addCase(logout, (state) => {
      state.user = null;
    });
});

import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    user_settings: null,
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
    addUserSettings: (state, action) => {
      state.user_settings = action.payload;
    },
    removeUserSettings: (state, action) => {
      state.user_settings = null;
    },
  },
});

export const { login, logout, addUserSettings, removeUserSettings } =
  userSlice.actions;

export const selectUser = (state) => state.user.user;
export const selectUserSettings = (state) => state.user.user_settings;

export default userSlice.reducer;

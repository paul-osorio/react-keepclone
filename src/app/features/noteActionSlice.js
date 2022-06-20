import { createSlice } from "@reduxjs/toolkit";

export const noteAction = createSlice({
  name: "noteAction",
  initialState: {
    alertName: "",
    actionHistory: "",
    actionID: 0,
    prevUpdatedDate: {},
  },
  reducers: {
    setAlertName: (state, action) => {
      state.alertName = action.payload;
    },
    setActionHistory: (state, action) => {
      state.actionHistory = action.payload;
    },
    setActionID: (state, action) => {
      state.actionID = action.payload;
    },
    setPrevUpdatedDate: (state, action) => {
      state.prevUpdatedDate = action.payload;
    },
  },
});

export const {
  setActionHistory,
  setAlertName,
  setActionID,
  setPrevUpdatedDate,
} = noteAction.actions;

export default noteAction.reducer;

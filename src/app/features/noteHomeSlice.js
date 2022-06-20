import { createSlice } from "@reduxjs/toolkit";

export const noteHome = createSlice({
  name: "noteHome",
  initialState: {
    showOthers: false,
    showPinned: false,
    notes: [],
    pinNotes: [],
  },
  reducers: {
    setShowOthers: (state, action) => {
      state.showOthers = action.payload;
    },
    setShowPinned: (state, action) => {
      state.showPinned = action.payload;
    },
    setNotes: (state, action) => {
      state.notes = action.payload;
    },
    setPinNotes: (state, action) => {
      state.pinNotes = action.payload;
    },
  },
});

export const { setShowOthers, setNotes, setPinNotes, setShowPinned } =
  noteHome.actions;
export default noteHome.reducer;

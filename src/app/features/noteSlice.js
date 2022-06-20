import { createSlice } from "@reduxjs/toolkit";

export const allNote = createSlice({
  name: "allNote",
  initialState: {
    showOthers: false,
    showPinned: false,
    notes: [],
    pinNotes: [],
    trashNotes: [],
    archiveNotes: [],
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
    setTrashNotes: (state, action) => {
      state.trashNotes = action.payload;
    },
    setArchiveNotes: (state, action) => {
      state.archiveNotes = action.payload;
    },
  },
});

export const {
  setShowOthers,
  setNotes,
  setPinNotes,
  setShowPinned,
  setTrashNotes,
  setArchiveNotes,
} = allNote.actions;
export default allNote.reducer;

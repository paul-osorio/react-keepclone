import { createSlice } from "@reduxjs/toolkit";
import { collection, doc, startAfter } from "firebase/firestore";
import { db } from "../../services/firebase.config";

export const noteFormAction = createSlice({
  name: "noteFormAction",
  initialState: {
    showForm: false,
    showPalette: false,
    viewNoteDate: {},
  },
  reducers: {
    setShowForm: (state, action) => {
      state.showForm = action.payload;
    },
    setShowPalette: (state, action) => {
      state.showPalette = action.payload;
    },
    setViewNoteDate: (state, action) => {
      state.viewNoteDate = action.payload;
    },
  },
});

export const { setShowForm, setShowPalette, setViewNoteDate } =
  noteFormAction.actions;
export default noteFormAction.reducer;

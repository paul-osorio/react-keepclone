import { createSlice } from "@reduxjs/toolkit";
import { collection, doc } from "firebase/firestore";
import { db } from "../../services/firebase.config";

export const noteFormAction = createSlice({
  name: "noteFormAction",
  initialState: {
    showForm: false,
    showPalette: false,
  },
  reducers: {
    setShowForm: (state, action) => {
      state.showForm = action.payload;
    },
    setShowPalette: (state, action) => {
      state.showPalette = action.payload;
    },
  },
});

export const { setShowForm, setShowPalette } = noteFormAction.actions;
export default noteFormAction.reducer;

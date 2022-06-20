import { createSlice } from "@reduxjs/toolkit";

export const noteForm = createSlice({
  name: "note",
  initialState: {
    title: "",
    content: "",
    isPinned: false,
    color: "default",
  },
  reducers: {
    setTitle: (state, action) => {
      state.title = action.payload;
    },
    setContent: (state, action) => {
      state.content = action.payload;
    },
    setPinned: (state, action) => {
      state.isPinned = action.payload;
    },
    setColor: (state, action) => {
      state.color = action.payload;
    },
  },
});

export const { setTitle, setContent, setPinned, setColor } = noteForm.actions;

export default noteForm.reducer;

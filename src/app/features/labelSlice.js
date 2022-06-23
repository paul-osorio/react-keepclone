import { createSlice } from "@reduxjs/toolkit";

export const label = createSlice({
  name: "label",
  initialState: {
    currentLabel: "",
    labels: [],
    activeLink: "",
  },
  reducers: {
    setCurrentLabel: (state, action) => {
      state.currentLabel = action.payload;
    },
    setLabels: (state, action) => {
      state.labels = action.payload;
    },
  },
});

export const { setLabels, setCurrentLabel } = label.actions;
export default label.reducer;

import { createSlice } from "@reduxjs/toolkit";

export const label = createSlice({
  name: "label",
  initialState: {
    currentLabel: "",
    labels: [],
    activeLink: "",
    formLabel: [],
  },
  reducers: {
    setCurrentLabel: (state, action) => {
      state.currentLabel = action.payload;
    },
    setLabels: (state, action) => {
      state.labels = action.payload;
    },
    setFormLabel: (state, action) => {
      state.formLabel = action.payload;
    },
  },
});

export const { setLabels, setCurrentLabel, setFormLabel } = label.actions;
export default label.reducer;

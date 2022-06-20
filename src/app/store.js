import { configureStore } from "@reduxjs/toolkit";
import noteReducer from "./features/noteFormSlice";
import noteFormActionReducer from "./features/noteFormActionsSlice";
import allNoteReducer from "./features/noteSlice";
import noteActionReducer from "./features/noteActionSlice";
export default configureStore({
  reducer: {
    note: noteReducer,
    noteFormAction: noteFormActionReducer,
    allNote: allNoteReducer,
    noteAction: noteActionReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

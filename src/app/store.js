import { configureStore } from "@reduxjs/toolkit";
import noteReducer from "./features/noteFormSlice";
import noteFormActionReducer from "./features/noteFormActionsSlice";
import allNoteReducer from "./features/noteSlice";
import noteActionReducer from "./features/noteActionSlice";
import labelReducer from "./features/labelSlice";
import userReducer from "./features/userSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    note: noteReducer,
    noteFormAction: noteFormActionReducer,
    allNote: allNoteReducer,
    noteAction: noteActionReducer,
    labels: labelReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

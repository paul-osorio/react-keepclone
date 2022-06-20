import { configureStore } from "@reduxjs/toolkit";
import noteReducer from "./features/noteFormSlice";
import noteFormActionReducer from "./features/noteFormActionsSlice";
import noteHomeReducer from "./features/noteHomeSlice";
import noteActionReducer from "./features/noteActionSlice";
export default configureStore({
  reducer: {
    note: noteReducer,
    noteFormAction: noteFormActionReducer,
    noteHome: noteHomeReducer,
    noteAction: noteActionReducer,
  },
});

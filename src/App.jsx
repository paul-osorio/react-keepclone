import { Route, Routes } from "react-router-dom";
import Archive from "./pages/Archive";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import Reminders from "./pages/Reminders";
import Trash from "./pages/Trash";
import "./app.css";
import LoginPage from "./pages/LoginPage";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import { useNoteContext } from "./Context/NoteContext";
import { AnimatePresence } from "framer-motion";
import Alert from "./components/Alert/Alert";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "./services/firebase.config";
import { useDispatch, useSelector } from "react-redux";
import {
  setActionHistory,
  setActionID,
  setAlertName,
} from "./app/features/noteActionSlice";

function App() {
  const dispatch = useDispatch();
  const actionHistory = useSelector((state) => state.noteAction.actionHistory);
  const alertName = useSelector((state) => state.noteAction.alertName);
  const actionID = useSelector((state) => state.noteAction.actionID);

  const onClose = () => dispatch(setAlertName(""));

  const nameAlert = () => {
    switch (alertName) {
      case "Trashed":
        return "Note trashed";
      case "UnpinnedAndTrash":
        return "Note unpinned and trashed";
      case "RestoreNote":
        return "Note restored";
      case "ArchivedNote":
        return "Note archived";
      case "UnarchivedNote":
        return "Note unarchived";
      case "UnpinnedAndArchivedNote":
        return "Note unpinned and archived";
      default:
        return "ERROR";
    }
  };

  const undoAction = async () => {
    const docRef = doc(db, "notes", actionID);

    const status =
      actionHistory === "Unarchived" || actionHistory === "ArchivedTrashed"
        ? "archived"
        : actionHistory === "Restored"
        ? "trash"
        : "default";
    const isPinned =
      actionHistory === "UnpinnedAndTrash" ||
      actionHistory === "UnpinnedAndArchived"
        ? true
        : false;

    await updateDoc(docRef, {
      status: status,
      isPinned: isPinned,
    });

    dispatch(setActionID(0));
    dispatch(setActionHistory(""));
    onClose();
  };

  return (
    <>
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/reminders" element={<Reminders />} />
            <Route path="/archive" element={<Archive />} />
            <Route path="/trash" element={<Trash />} />
          </Route>
        </Route>
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<LoginPage />} />
        </Route>
      </Routes>
      <AnimatePresence>
        {alertName && (
          <Alert onUndo={undoAction} onClose={onClose} Title={nameAlert()} />
        )}
      </AnimatePresence>
    </>
  );
}

export default App;

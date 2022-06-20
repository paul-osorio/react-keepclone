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
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "./services/firebase.config";
import { useDispatch, useSelector } from "react-redux";
import {
  setActionHistory,
  setActionID,
  setAlertName,
} from "./app/features/noteActionSlice";
import { useEffect } from "react";
import { useAuthContext } from "./Context/AuthProvider";

function App() {
  const dispatch = useDispatch();
  const actionHistory = useSelector((state) => state.noteAction.actionHistory);
  const alertName = useSelector((state) => state.noteAction.alertName);
  const actionID = useSelector((state) => state.noteAction.actionID);
  const { user } = useAuthContext();
  const prevUpdatedDate = useSelector(
    (state) => state.noteAction.prevUpdatedDate
  );

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

    if (
      actionHistory === "Archived" ||
      actionHistory === "UnpinnedAndArchived"
    ) {
      await updateDoc(docRef, {
        status: status,
        isPinned: isPinned,
        updated_at: prevUpdatedDate,
      });
    } else {
      await updateDoc(docRef, {
        status: status,
        isPinned: isPinned,
      });
    }

    dispatch(setActionID(0));
    dispatch(setActionHistory(""));
    onClose();
  };

  useEffect(() => {
    if (user) {
      const q = query(
        collection(db, "notes"),
        where("uid", "==", user.uid),
        where("status", "==", "trash")
      );

      const unsubscribe = onSnapshot(q, (snapshot) => {
        var currentDate = new Date();
        var sevendaysinmins = 7 * 24 * 60 * 60 * 1000;
        var sevendaysago = new Date().getTime() - sevendaysinmins;

        currentDate.setDate(currentDate.getDate() - 13);

        snapshot.docs.map((val) => {
          var timestamp = val.data().deleted_at;
          var newtime = new Date(timestamp.seconds * 1000);
          console.log(sevendaysago > newtime);
          var noteRef = doc(db, "notes", val.id);
          if (sevendaysago > newtime) {
            deleteDoc(noteRef);
          }
        });
      });
      return () => unsubscribe();
    }
  }, []);

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

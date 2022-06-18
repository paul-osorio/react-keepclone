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

function App() {
  const { alertName, setAlertName } = useNoteContext();
  const onClose = () => setAlertName("");

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
      default:
        return "ERROR";
    }
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
        {alertName && <Alert onClose={onClose} Title={nameAlert()} />}
      </AnimatePresence>
    </>
  );
}

export default App;

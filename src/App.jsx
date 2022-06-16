import { Route, Routes } from "react-router-dom";
import Archive from "./pages/Archive";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import Reminders from "./pages/Reminders";
import Trash from "./pages/Trash";
import "./app.css";
import RequireAuth from "./components/RequireAuth";
import LoginPage from "./pages/LoginPage";
import SignOut from "./pages/Logout";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/logout" element={<SignOut />} />
      <Route path="/" element={<Layout />}>
        <Route element={<RequireAuth />}>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/reminders" element={<Reminders />} />
          <Route path="/archive" element={<Archive />} />
          <Route path="/trash" element={<Trash />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;

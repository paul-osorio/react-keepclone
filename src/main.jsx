import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import AuthProvider from "./Context/AuthProvider";
import FormContextProvider from "./Context/FormContext";
import NoteProvider from "./Context/NoteContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <NoteProvider>
          <App />
        </NoteProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import store from "./app/store";
import { Provider } from "react-redux";
import AuthWrapper from "./AuthWrapper";
import ThemeProvider from "./ThemeProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <AuthWrapper>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </AuthWrapper>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

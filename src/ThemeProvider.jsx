import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUserSettings } from "./app/features/userSlice";

const ThemeProvider = ({ children }) => {
  const settings = useSelector(selectUserSettings);
  useEffect(() => {
    if (settings) {
      if (settings.isDarkMode) {
        document.body.classList.add("dark");
      } else {
        document.body.classList.remove("dark");
      }
    }
  });
  return children;
};

export default ThemeProvider;

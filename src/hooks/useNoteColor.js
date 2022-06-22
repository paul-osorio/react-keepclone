import { useSelector } from "react-redux";
import { selectUserSettings } from "../app/features/userSlice";

export function useNoteColor(color) {
  const settings = useSelector(selectUserSettings);
  const isDarkMode = settings && settings.isDarkMode;

  switch (color) {
    case "red":
      return isDarkMode ? "#5C2B29" : "#F28B82";
    case "orange":
      return isDarkMode ? "#614A19" : "#FBBC04";
    case "yellow":
      return isDarkMode ? "#635D19" : "#FFF475";
    case "green":
      return isDarkMode ? "#345920" : "#CCFF90";
    case "teal":
      return isDarkMode ? "#16504B" : "#A7FFEB";
    case "blue":
      return isDarkMode ? "#2D555E" : "#CBF0F8";
    case "darkblue":
      return isDarkMode ? "#2D555E" : "#AECBFA";
    case "purple":
      return isDarkMode ? "#42275E" : "#D7AEFB";
    case "pink":
      return isDarkMode ? "#5B2245" : "#FDCFE8";
    case "brown":
      return isDarkMode ? "#5B2245" : "#E6C9A8";
    case "gray":
      return isDarkMode ? "#5B2245" : "#E8EAED";
    default:
      return isDarkMode ? "#202124" : "white";
  }
}

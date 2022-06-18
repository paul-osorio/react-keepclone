import { createContext, useContext, useState } from "react";

const NoteContext = createContext();

const NoteProvider = ({ children }) => {
  const [alertName, setAlertName] = useState("");
  const value = {
    alertName,
    setAlertName,
  };
  return <NoteContext.Provider value={value}>{children}</NoteContext.Provider>;
};

export const useNoteContext = () => useContext(NoteContext);

export default NoteProvider;

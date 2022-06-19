import { useState } from "react";
import { useContext } from "react";
import { createContext } from "react";
import AddNote from "../components/AddNote";

export const FormContext = createContext();

const FormProvider = ({ children }) => {
  const [showNoteform, setShowNoteform] = useState(false);
  const [notes, setNotes] = useState("");
  const [noteTitle, setNoteTitle] = useState("");
  const [isPinned, setPinned] = useState(false);
  const [color, setColor] = useState("default");
  const [colorName, setColorName] = useState("default");

  const value = {
    color,
    colorName,
    setColorName,
    setColor,
    showNoteform,
    setShowNoteform,
    isPinned,
    setPinned,
    notes,
    setNotes,
    noteTitle,
    setNoteTitle,
  };

  return (
    <FormContext.Provider value={value}>
      <AddNote />
    </FormContext.Provider>
  );
};
export const useNoteForm = () => useContext(FormContext);

export default FormProvider;

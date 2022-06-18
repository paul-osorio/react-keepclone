import { useEffect } from "react";
import { useNoteContext } from "../Context/NoteContext";

const Reminders = () => {
  const { setAlertName } = useNoteContext();
  useEffect(() => {
    setAlertName("");
  }, []);

  return <h1>Im Reminders</h1>;
};

export default Reminders;

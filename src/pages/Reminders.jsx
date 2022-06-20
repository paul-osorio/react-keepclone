import { useEffect } from "react";
import { setAlertName } from "../app/features/noteActionSlice";
import { useNoteContext } from "../Context/NoteContext";

const Reminders = () => {
  useEffect(() => {
    dispatch(setAlertName(""));
  }, []);

  return <h1>Im Reminders</h1>;
};

export default Reminders;

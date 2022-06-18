import { useNoteContext } from "../Context/NoteContext";

const useCloseAlert = () => {
  const { setAlertName } = useNoteContext();
  setAlertName("");
};
export default useCloseAlert;

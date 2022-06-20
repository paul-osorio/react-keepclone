import { collection, doc, serverTimestamp, setDoc } from "firebase/firestore";
import { useRef } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { useAuthContext } from "../../Context/AuthProvider";
import { useNoteColor } from "../../hooks/useNoteColor";
import { useOnClickOutside } from "../../hooks/useOnClickOutside";
import { db } from "../../services/firebase.config";
import AddNoteButton from "../Buttons/AddNoteButton";
import ColorPicker from "../ColorPicker";
import Icon from "../Icon";
import { useSelector, useDispatch } from "react-redux";
import {
  setColor,
  setContent,
  setPinned,
  setTitle,
} from "../../app/features/noteFormSlice";
import {
  setShowForm,
  setShowPalette,
} from "../../app/features/noteFormActionsSlice";
import Inputs from "./Inputs";
import Settings from "./Settings";

const AddNoteForm = () => {
  const note_title = useSelector((state) => state.note.title);
  const note_content = useSelector((state) => state.note.content);
  const note_color = useSelector((state) => state.note.color);
  const isPinned = useSelector((state) => state.note.isPinned);

  const dispatch = useDispatch();
  const divColor = useNoteColor(note_color);

  const { user } = useAuthContext();

  const submitForm = () => {
    dispatch(setShowForm(false));
    if (note_content.trim() || note_title.trim()) {
      const userRef = doc(collection(db, "notes"));

      setDoc(userRef, {
        uid: user.uid,
        title: note_title,
        content: note_content,
        isPinned: isPinned,
        backgroundColor: note_color,
        status: "default",
        created_at: serverTimestamp(),
        updated_at: serverTimestamp(),
      });
    }
    dispatch(setContent(""));
    dispatch(setTitle(""));
    dispatch(setPinned(false));
    dispatch(setColor("default"));
  };

  return (
    <div
      className="py-2 w-full rounded-lg"
      style={{ backgroundColor: divColor }}
    >
      <Inputs divColor={divColor} />
      <Settings submitForm={submitForm} />
    </div>
  );
};

export default AddNoteForm;

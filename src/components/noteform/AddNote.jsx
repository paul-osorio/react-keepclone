import { collection, doc, serverTimestamp, setDoc } from "firebase/firestore";
import { useRef } from "react";
import { useOnClickOutside } from "../../hooks/useOnClickOutside";
import { db } from "../../services/firebase.config";
import AddNoteForm from "./AddNoteForm";
import AddNoteInitialForm from "./AddNoteInitialForm";
import { useSelector, useDispatch } from "react-redux";
import {
  setColor,
  setContent,
  setPinned,
  setTitle,
} from "../../app/features/noteFormSlice";
import { setShowForm } from "../../app/features/noteFormActionsSlice";
import { selectUser } from "../../app/features/userSlice";

const AddNote = () => {
  const note_title = useSelector((state) => state.note.title);
  const note_content = useSelector((state) => state.note.content);
  const note_color = useSelector((state) => state.note.color);
  const isPinned = useSelector((state) => state.note.isPinned);
  const showForm = useSelector((state) => state.noteFormAction.showForm);

  const dispatch = useDispatch();

  const user = useSelector(selectUser);

  const ref = useRef();

  useOnClickOutside(ref, () => {
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
    dispatch(setShowForm(false));
  });

  return (
    <div
      ref={ref}
      className="flex items-center mx-auto mb-2 mt-10 relative rounded-lg max-w-[600px]"
      style={{
        boxShadow:
          "0 1px 2px 0 rgb(60 64 67 / 30%), 0 2px 6px 2px rgb(60 64 67 / 15%)",
      }}
    >
      {!showForm && <AddNoteInitialForm />}
      {showForm && <AddNoteForm />}
    </div>
  );
};

export default AddNote;

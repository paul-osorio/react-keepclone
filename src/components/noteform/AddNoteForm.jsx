import { collection, doc, serverTimestamp, setDoc } from "firebase/firestore";
import { useNoteColor } from "../../hooks/useNoteColor";
import { db } from "../../services/firebase.config";
import { useSelector, useDispatch } from "react-redux";
import {
  setColor,
  setContent,
  setPinned,
  setTitle,
} from "../../app/features/noteFormSlice";
import { setShowForm } from "../../app/features/noteFormActionsSlice";
import Inputs from "./Inputs";
import Settings from "./Settings";
import { selectUser } from "../../app/features/userSlice";
import Icon from "../Icon";
import { setFormLabel } from "../../app/features/labelSlice";
import LabelBadge from "../Buttons/LabelBadge";

const AddNoteForm = () => {
  const note_title = useSelector((state) => state.note.title);
  const note_content = useSelector((state) => state.note.content);
  const note_color = useSelector((state) => state.note.color);
  const isPinned = useSelector((state) => state.note.isPinned);
  const formLabel = useSelector((state) => state.labels.formLabel);
  const user = useSelector(selectUser);

  const dispatch = useDispatch();
  const divColor = useNoteColor(note_color);

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
      <div className="break-words space-x-2 mx-3">
        {formLabel.map((val, i) => {
          return <LabelBadge name={val} key={i} />;
        })}
      </div>
      <Settings submitForm={submitForm} />
    </div>
  );
};

export default AddNoteForm;

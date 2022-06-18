import { collection, doc, serverTimestamp, setDoc } from "firebase/firestore";
import { useRef, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { useAuthContext } from "../Context/AuthProvider";
import { useNoteForm } from "../Context/FormContext";
import { useOnClickOutside } from "../hooks/useOnClickOutside";
import { db } from "../services/firebase.config";
import AddNoteButton from "./Buttons/AddNoteButton";
import ColorPicker from "./ColorPicker";
import Icon from "./Icon";

const AddNoteForm = () => {
  const [showPalette, setShowPalette] = useState(false);
  const {
    setShowNoteform,
    notes,
    setNotes,
    noteTitle,
    setNoteTitle,
    isPinned,
    setPinned,
    color,
    setColor,
  } = useNoteForm();

  const { user } = useAuthContext();
  const palleteRef = useRef();
  const changeColor = (e) => {
    setColor(e.target.value);
  };

  const submitForm = () => {
    setShowNoteform(false);
    if (notes.trim() || noteTitle.trim()) {
      const userRef = doc(collection(db, "notes"));

      setDoc(userRef, {
        uid: user.uid,
        title: noteTitle,
        content: notes,
        isPinned: isPinned,
        backgroundColor: color,
        status: "default",
        created_at: serverTimestamp(),
        updated_at: serverTimestamp(),
      });
    }
    setNotes("");
    setNoteTitle("");
    setPinned(false);
    setColor("default");
  };

  useOnClickOutside(palleteRef, () => setShowPalette(false));

  return (
    <div
      className="py-2 w-full rounded-lg"
      style={{ backgroundColor: color === "default" ? "white" : "#" + color }}
    >
      <div className="w-full max-h-[600px] overflow-auto">
        <div className="flex w-full px-4">
          <input
            type="text"
            value={noteTitle}
            style={{
              backgroundColor: color === "default" ? "white" : "#" + color,
            }}
            onChange={(e) => setNoteTitle(e.target.value)}
            placeholder="Title"
            className="w-full outline-none placeholder:text-gray-500 font-medium"
          />
          <button
            onClick={() => setPinned(!isPinned)}
            className="group hover:bg-gray-500/10 flex items-center rounded-full p-1"
          >
            <Icon
              variant={isPinned ? "Icon" : ""}
              name="push_pin"
              className="text-gray-600 group-hover:text-black"
            />
          </button>
        </div>
        <div className=" mt-3 px-4">
          <TextareaAutosize
            style={{
              backgroundColor: color === "default" ? "white" : "#" + color,
            }}
            placeholder="Take a note..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full outline-none  resize-none text-sm placeholder:text-gray-600"
            autoFocus
          />
        </div>
      </div>
      <div className="flex items-center justify-between px-4">
        <div className="flex items-center space-x-3">
          <AddNoteButton name="add_alert" />
          <AddNoteButton name="person_add" />
          <div className="relative">
            <AddNoteButton
              name="palette"
              onClick={() => setShowPalette(!showPalette)}
            />
            {showPalette && (
              <div
                ref={palleteRef}
                style={{
                  boxShadow:
                    "0 1px 2px 0 rgb(60 64 67 / 30%), 0 2px 6px 2px rgb(60 64 67 / 15%)",
                }}
                className="absolute flex h-14 rounded-lg items-center space-x-2 bg-white p-2 z-10"
              >
                <ColorPicker
                  color="default"
                  checked={color === "default"}
                  onChange={changeColor}
                />
                <ColorPicker
                  color="F28B82"
                  checked={color === "F28B82"}
                  onChange={changeColor}
                />
                <ColorPicker
                  color="FBBC04"
                  checked={color === "FBBC04"}
                  onChange={changeColor}
                />
                <ColorPicker
                  color="FFF475"
                  checked={color === "FFF475"}
                  onChange={changeColor}
                />
                <ColorPicker
                  color="CCFF90"
                  checked={color === "CCFF90"}
                  onChange={changeColor}
                />
                <ColorPicker
                  color="A7FFEB"
                  checked={color === "A7FFEB"}
                  onChange={changeColor}
                />
                <ColorPicker
                  color="CBF0F8"
                  checked={color === "CBF0F8"}
                  onChange={changeColor}
                />
                <ColorPicker
                  color="AECBFA"
                  checked={color === "AECBFA"}
                  onChange={changeColor}
                />
                <ColorPicker
                  color="D7AEFB"
                  checked={color === "D7AEFB"}
                  onChange={changeColor}
                />
                <ColorPicker
                  color="FDCFE8"
                  checked={color === "FDCFE8"}
                  onChange={changeColor}
                />
                <ColorPicker
                  color="E6C9A8"
                  checked={color === "E6C9A8"}
                  onChange={changeColor}
                />
                <ColorPicker
                  color="E8EAED"
                  checked={color === "E8EAED"}
                  onChange={changeColor}
                />
              </div>
            )}
          </div>
          <AddNoteButton name="image" />
          <AddNoteButton name="archive" />
          <AddNoteButton name="more_vert" variant="Icon" />
          <AddNoteButton name="undo" />
          <AddNoteButton name="redo" />
        </div>
        <div className="">
          <button
            className="hover:bg-gray-500/10 py-1 px-5"
            type="button"
            onClick={submitForm}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddNoteForm;

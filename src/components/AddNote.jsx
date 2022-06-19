import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { useState, useRef } from "react";
import { useAuthContext } from "../Context/AuthProvider";
import FormContextProvider, { useNoteForm } from "../Context/FormContext";
import useAuth from "../hooks/useAuth";
import { useOnClickOutside } from "../hooks/useOnClickOutside";
import { db } from "../services/firebase.config";
import AddNoteForm from "./AddNoteForm";
import AddNoteInitialForm from "./AddNoteInitialForm";

const AddNote = () => {
  const {
    showNoteform,
    setShowNoteform,
    notes,
    setNotes,
    setNoteTitle,
    noteTitle,
    setPinned,
    isPinned,
    setColor,
    color,
  } = useNoteForm();
  const { user } = useAuthContext();

  const ref = useRef();

  useOnClickOutside(ref, () => {
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
    setColor("default");
    setPinned(false);
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
      {!showNoteform && <AddNoteInitialForm />}
      {showNoteform && <AddNoteForm />}
    </div>
  );
};

export default AddNote;

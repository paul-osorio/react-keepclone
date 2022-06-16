import { useState, useRef } from "react";
import { useOnClickOutside } from "../hooks/useOnClickOutside";
import AddNoteForm from "./AddNoteForm";
import AddNoteInitialForm from "./AddNoteInitialForm";

const AddNote = () => {
  const [showNoteform, setShowNoteform] = useState(false);
  const ref = useRef();

  useOnClickOutside(ref, () => setShowNoteform(false));

  return (
    <div
      ref={ref}
      className="flex items-center mx-auto mb-2 mt-10 relative rounded-lg max-w-[600px]"
      style={{
        boxShadow:
          "0 1px 2px 0 rgb(60 64 67 / 30%), 0 2px 6px 2px rgb(60 64 67 / 15%)",
      }}
    >
      {!showNoteform && (
        <AddNoteInitialForm setShowNoteform={setShowNoteform} />
      )}
      {showNoteform && <AddNoteForm setShowNoteform={setShowNoteform} />}
    </div>
  );
};

export default AddNote;

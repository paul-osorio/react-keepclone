import { useNoteForm } from "../Context/FormContext";
import AddNoteInitialButton from "./Buttons/AddNoteInitialButton";
import Icon from "./Icon";

const AddNoteInitialForm = () => {
  const { setShowNoteform } = useNoteForm();
  return (
    <div className="flex items-center w-full">
      <div
        onClick={() => setShowNoteform(true)}
        className="h-[46px] text-gray-600 flex items-center ml-5 w-full cursor-text"
      >
        Take a note...
      </div>
      <div className="flex items-center mr-5">
        <AddNoteInitialButton name="check_box" />
        <AddNoteInitialButton name="brush" />
        <AddNoteInitialButton name="image" />
      </div>
    </div>
  );
};

export default AddNoteInitialForm;

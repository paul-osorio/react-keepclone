import { useDispatch } from "react-redux";
import { setShowForm } from "../../app/features/noteFormActionsSlice";
import AddNoteInitialButton from "../Buttons/AddNoteInitialButton";

const AddNoteInitialForm = () => {
  const dispatch = useDispatch();

  return (
    <div className="flex items-center w-full ">
      <div
        onClick={() => dispatch(setShowForm(true))}
        className="h-[46px] text-gray-600 flex  items-center ml-5 w-full cursor-text dark:text-neutral-400 font-medium"
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

import { useDispatch, useSelector } from "react-redux";
import ReactTextareaAutosize from "react-textarea-autosize";
import {
  setContent,
  setPinned,
  setTitle,
} from "../../app/features/noteFormSlice";
import Icon from "../Icon";

const Inputs = ({ divColor }) => {
  const note_title = useSelector((state) => state.note.title);
  const note_content = useSelector((state) => state.note.content);
  const isPinned = useSelector((state) => state.note.isPinned);

  const dispatch = useDispatch();

  return (
    <div className="w-full max-h-[600px] notescrollbar overflow-auto">
      <div className="flex w-full px-4">
        <input
          type="text"
          value={note_title}
          style={{
            backgroundColor: divColor,
          }}
          onChange={(e) => dispatch(setTitle(e.target.value))}
          placeholder="Title"
          className="w-full outline-none dark:text-white placeholder:text-gray-500 font-medium dark:placeholder:text-neutral-400"
        />
        <button
          onClick={() => dispatch(setPinned(!isPinned))}
          className="group hover:bg-gray-500/10 flex items-center rounded-full p-1"
        >
          <Icon
            variant={isPinned ? "Icon" : ""}
            name="push_pin"
            className="text-gray-600 group-hover:text-black dark:text-neutral-400 dark:group-hover:text-white"
          />
        </button>
      </div>
      <div className=" mt-4 mb-2 px-4">
        <ReactTextareaAutosize
          style={{
            backgroundColor: divColor,
          }}
          placeholder="Take a note..."
          value={note_content}
          onChange={(e) => dispatch(setContent(e.target.value))}
          className="w-full outline-none dark:text-neutral-200 resize-none text-sm placeholder:font-medium placeholder:text-gray-600 dark:placeholder:text-neutral-400"
          autoFocus
        />
      </div>
    </div>
  );
};

export default Inputs;

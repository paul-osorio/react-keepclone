import TextareaAutosize from "react-textarea-autosize";
import AddNoteButton from "./Buttons/AddNoteButton";
import Icon from "./Icon";

const AddNoteForm = ({ setShowNoteform }) => {
  const addNotebuttons = [
    { name: "add_alert" },
    { name: "person_add" },
    { name: "palette" },
    { name: "image" },
    { name: "archive" },
    { name: "more_vert", variant: "Icon" },
    { name: "undo" },
    { name: "redo" },
  ];

  return (
    <div className="py-2 w-full">
      <div className="w-full max-h-[600px] overflow-auto">
        <div className="flex w-full px-4">
          <input
            type="text"
            placeholder="Title"
            className="w-full outline-none placeholder:text-gray-500 font-medium"
          />
          <button className="group hover:bg-gray-100 flex items-center rounded-full p-1">
            <Icon
              variant="Symbols"
              name="push_pin"
              className="text-gray-600 group-hover:text-black"
            />
          </button>
        </div>
        <div className=" mt-3 px-4">
          <TextareaAutosize
            placeholder="Take a note..."
            className="w-full outline-none  resize-none text-sm placeholder:text-gray-600"
            autoFocus
          />
        </div>
      </div>
      <div className="flex items-center justify-between px-4">
        <div className="flex items-center space-x-3">
          {addNotebuttons.map((val) => {
            return <AddNoteButton {...val} />;
          })}
        </div>
        <div className="">
          <button
            className="hover:bg-gray-100 py-1 px-5"
            type="button"
            onClick={() => {
              setShowNoteform(false);
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddNoteForm;

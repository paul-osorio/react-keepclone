import AddNoteButton from "../Buttons/AddNoteButton";
import MoreButton from "./Buttons/MoreButton";
import PaletteButton from "./Buttons/PaletteButton";

const Settings = ({ submitForm }) => {
  return (
    <div className="flex items-center justify-between px-4">
      <div className="flex items-center space-x-3">
        <AddNoteButton name="add_alert" />
        <AddNoteButton name="person_add" />
        <PaletteButton />
        <AddNoteButton name="image" />
        <AddNoteButton name="archive" />
        <MoreButton />
        <AddNoteButton name="undo" />
        <AddNoteButton name="redo" />
      </div>
      <button
        className="hover:bg-gray-500/10 py-1 px-5 dark:text-neutral-300"
        type="button"
        onClick={submitForm}
      >
        Close
      </button>
    </div>
  );
};

export default Settings;

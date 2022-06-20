import AddNoteButton from "../Buttons/AddNoteButton";
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
        <AddNoteButton name="more_vert" variant="Icon" />
        <AddNoteButton name="undo" />
        <AddNoteButton name="redo" />
      </div>
      <button
        className="hover:bg-gray-500/10 py-1 px-5"
        type="button"
        onClick={submitForm}
      >
        Close
      </button>
    </div>
  );
};

export default Settings;

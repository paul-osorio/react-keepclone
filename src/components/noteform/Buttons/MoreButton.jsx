import AddNoteButton from "../../Buttons/AddNoteButton";
import { useState } from "react";
import LabelsDropdown from "./LabelsDropdown";

const MoreButton = () => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [openLabel, setOpenLabel] = useState(false);
  return (
    <div className="relative ">
      <AddNoteButton
        onClick={() => setOpenDropdown(!openDropdown)}
        name="more_vert"
        variant="Icon"
      />
      {openDropdown && (
        <div className="z-50 absolute rounded bg-white w-32  py-2 dark:bg-midnight-900 shadow-card dark:shadow-darkCard">
          <button
            onClick={() => {
              setOpenLabel(true);
              setOpenDropdown(false);
            }}
            className="hover:bg-midnight-500 w-full text-left px-4 dark:text-neutral-200 py-1 text-sm"
          >
            Add label
          </button>
        </div>
      )}
      {openLabel && <LabelsDropdown setOpenLabel={setOpenLabel} />}
    </div>
  );
};

export default MoreButton;

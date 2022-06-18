import Icon from "../Icon";
import Backdrop from "./Backdrop";
import { useState } from "react";
import LabelComp from "../LabelComp";

const EmptyTrashModal = ({ handleClose, onDelete }) => {
  return (
    <Backdrop onClick={handleClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="border bg-white w-[430px]  shadow-lg rounded-lg shadow-gray-400 "
      >
        <div className="px-5 pt-7 pb-3">
          <p className="text-sm">
            Empty trash? All notes in Trash will be permanently deleted.
          </p>
          <div className="flex justify-end mt-5 space-x-5">
            <button
              onClick={handleClose}
              className="text-sm px-4 py-2 font-medium hover:bg-gray-500/10"
            >
              Cancel
            </button>
            <button
              onClick={onDelete}
              className="text-blue-600 px-4 py-2 hover:bg-blue-500/5 rounded text-sm font-medium"
            >
              Empty Trash
            </button>
          </div>
        </div>
      </div>
    </Backdrop>
  );
};

export default EmptyTrashModal;

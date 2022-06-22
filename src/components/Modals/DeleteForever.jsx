import Icon from "../Icon";
import Backdrop from "./Backdrop";
import { useState } from "react";
import LabelComp from "../LabelComp";

const DeleteForeverModal = ({ handleClose, onDelete }) => {
  return (
    <Backdrop onClick={handleClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        className=" bg-white w-[430px] dark:bg-midnight-600 shadow-dark dark:shadow-darkCard rounded-lg  "
      >
        <div className="px-5 pt-7 pb-3">
          <p className="text-sm dark:text-neutral-200">Delete note forever? </p>
          <div className="flex justify-end mt-5 space-x-5">
            <button
              onClick={handleClose}
              className="text-sm px-4 py-2 font-medium hover:bg-gray-500/10 dark:text-neutral-200 dark:hover:text-white"
            >
              Cancel
            </button>
            <button
              onClick={onDelete}
              className="text-blue-600 px-4 py-2 hover:bg-blue-500/5 rounded text-sm font-medium"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </Backdrop>
  );
};

export default DeleteForeverModal;

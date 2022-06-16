import Icon from "../Icon";
import Backdrop from "./Backdrop";
import { useState } from "react";
import LabelComp from "../LabelComp";

const EditLabelsModal = ({ handleClose }) => {
  const [isActiveText, setActiveText] = useState(true);

  return (
    <Backdrop onClick={handleClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="border bg-white  w-[300px] shadow-lg shadow-gray-400 "
      >
        <div className="px-3 py-3 max-h-[392px] overflow-auto notescrollbar">
          <div className="font-medium text-gray-700 mb-2">Edit labels</div>
          <div className="flex items-center w-full">
            <button
              onClick={() => {
                setActiveText(false);
              }}
              className="hover:bg-gray-200 mr-2 group flex items-center flex-shrink-0 rounded-full"
            >
              <Icon
                variant="Symbols"
                name={isActiveText ? "close" : "add"}
                className="p-1 text-[22px] text-gray-500 group-hover:text-black"
              />
            </button>
            <input
              type="text"
              placeholder="Create new label"
              className="text-sm focus:border-b focus:border-gray-300 w-full outline-none py-1 mx-1"
              onFocus={() => {
                setActiveText(true);
              }}
              autoFocus
            />
            {isActiveText && (
              <button className="hover:bg-gray-200 group flex items-center flex-shrink-0 rounded-full">
                <Icon
                  variant="Symbols"
                  name="check"
                  className="p-1 text-[22px] text-gray-500 group-hover:text-black"
                />
              </button>
            )}
          </div>
          <div className="py-2 w-full ">
            <LabelComp setActiveText={setActiveText} />
            <LabelComp setActiveText={setActiveText} />
            <LabelComp setActiveText={setActiveText} />
            <LabelComp setActiveText={setActiveText} />
            <LabelComp setActiveText={setActiveText} />
            <LabelComp setActiveText={setActiveText} />
            <LabelComp setActiveText={setActiveText} />
            <LabelComp setActiveText={setActiveText} />
            <LabelComp setActiveText={setActiveText} />
          </div>
        </div>
        <div className="py-4 border-t flex justify-end px-4">
          <button
            onClick={handleClose}
            className="text-sm text-gray-700 hover:bg-gray-100 py-2 px-5"
          >
            Done
          </button>
        </div>
      </div>
    </Backdrop>
  );
};

export default EditLabelsModal;

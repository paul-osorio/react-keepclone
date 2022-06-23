import { useRef } from "react";
import { useOnClickOutside } from "../../../hooks/useOnClickOutside";
import Icon from "../../Icon";

const LabelsDropdown = ({ setOpenLabel }) => {
  const ref = useRef();
  useOnClickOutside(ref, () => setOpenLabel(false));
  return (
    <div
      className="z-50 w-52 p-3  absolute dark:bg-midnight-600 bg-white shadow-card dark:shadow-darkCard"
      ref={ref}
    >
      <p className="dark:text-neutral-200 text-[15px]">Label note</p>
      <div className="relative w-full flex items-center">
        <input
          type="text"
          className="dark:bg-midnight-600 text-sm font-light w-full py-2 outline-none dark:caret-white dark:text-white"
          placeholder="Enter label name"
        />
        <Icon name="search" className=" text-white/20 text-[14px]" />
      </div>
    </div>
  );
};

export default LabelsDropdown;

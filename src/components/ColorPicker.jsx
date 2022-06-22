import { useNoteColor } from "../hooks/useNoteColor";
import Icon from "./Icon";

const ColorPicker = ({ color, checked, onChange, onClick }) => {
  const divColor = useNoteColor(color);

  return (
    <label className="relative" onClick={onClick}>
      <input
        id={color}
        onChange={onChange}
        type="radio"
        name="palette"
        value={color}
        className="peer hidden"
        checked={checked}
      />

      <div
        className={
          (color === "default" ? "ring-inset ring-2 ring-gray-400/50" : "p-4") +
          " cursor-pointer relative rounded-full flex peer-checked:ring-2 peer-checked:ring-violet-500"
        }
        style={{ backgroundColor: divColor }}
      >
        {color === "default" && (
          <Icon
            variant="Symbols"
            name="format_color_reset"
            className="p-[10px] text-[14px] "
          />
        )}
      </div>
      <div className="bg-white  absolute hidden peer-checked:flex  -top-2 -right-2  items-center rounded-full">
        <Icon
          variant="Icon"
          className=" text-[20px] text-violet-500 m-0 p-0 "
          name="check_circle"
        />
      </div>
    </label>
  );
};

export default ColorPicker;

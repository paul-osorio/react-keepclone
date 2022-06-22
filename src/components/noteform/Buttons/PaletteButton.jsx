import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setShowPalette } from "../../../app/features/noteFormActionsSlice";
import { setColor } from "../../../app/features/noteFormSlice";
import { useOnClickOutside } from "../../../hooks/useOnClickOutside";
import AddNoteButton from "../../Buttons/AddNoteButton";
import ColorPicker from "../../ColorPicker";

const PaletteButton = () => {
  const palleteRef = useRef();
  const showPalette = useSelector((state) => state.noteFormAction.showPalette);
  const note_color = useSelector((state) => state.note.color);

  const dispatch = useDispatch();

  const changeColor = (e) => {
    dispatch(setColor(e.target.value));
  };

  const colorPicker = [
    {
      color: "default",
      checked: note_color === "default",
      onChange: changeColor,
    },
    { color: "red", checked: note_color === "red", onChange: changeColor },
    {
      color: "orange",
      checked: note_color === "orange",
      onChange: changeColor,
    },
    {
      color: "yellow",
      checked: note_color === "yellow",
      onChange: changeColor,
    },
    {
      color: "green",
      checked: note_color === "green",
      onChange: changeColor,
    },
    { color: "teal", checked: note_color === "teal", onChange: changeColor },
    { color: "blue", checked: note_color === "blue", onChange: changeColor },
    {
      color: "darkblue",
      checked: note_color === "darkblue",
      onChange: changeColor,
    },
    {
      color: "purple",
      checked: note_color === "purple",
      onChange: changeColor,
    },
    { color: "pink", checked: note_color === "pink", onChange: changeColor },
    {
      color: "brown",
      checked: note_color === "brown",
      onChange: changeColor,
    },
    { color: "gray", checked: note_color === "gray", onChange: changeColor },
  ];
  useOnClickOutside(palleteRef, () => dispatch(setShowPalette(false)));

  return (
    <div className="relative">
      <AddNoteButton
        name="palette"
        onClick={() => dispatch(setShowPalette(!showPalette))}
      />
      {showPalette && (
        <div
          ref={palleteRef}
          className="absolute shadow-card dark:shadow-darkCard flex h-14 rounded-lg items-center space-x-2 dark:bg-midnight-900  bg-white p-2 z-10"
        >
          {colorPicker.map((val, i) => {
            return <ColorPicker {...val} key={i} />;
          })}
        </div>
      )}
    </div>
  );
};

export default PaletteButton;

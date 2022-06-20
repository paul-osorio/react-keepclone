import { updateDoc } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { useOnClickOutside } from "../../hooks/useOnClickOutside";
import AddNoteButton from "../Buttons/AddNoteButton";
import ColorPicker from "../ColorPicker";

const Palette = ({ data, showPalette, setShowPalette, docRef }) => {
  const [color, setColor] = useState(data.backgroundColor);
  const ref = useRef();
  const colorRef = useRef();

  useOnClickOutside(ref, () => setShowPalette(false));

  const changeColor = async (e) => {
    setColor(e.target.value);

    await updateDoc(docRef, {
      backgroundColor: e.target.value,
    });
  };

  const colorPicker = [
    {
      color: "default",
      checked: color === "default",
      onChange: changeColor,
    },
    { color: "red", checked: color === "red", onChange: changeColor },
    {
      color: "orange",
      checked: color === "orange",
      onChange: changeColor,
    },
    {
      color: "yellow",
      checked: color === "yellow",
      onChange: changeColor,
    },
    {
      color: "green",
      checked: color === "green",
      onChange: changeColor,
    },
    { color: "teal", checked: color === "teal", onChange: changeColor },
    { color: "blue", checked: color === "blue", onChange: changeColor },
    {
      color: "darkblue",
      checked: color === "darkblue",
      onChange: changeColor,
    },
    {
      color: "purple",
      checked: color === "purple",
      onChange: changeColor,
    },
    { color: "pink", checked: color === "pink", onChange: changeColor },
    {
      color: "brown",
      checked: color === "brown",
      onChange: changeColor,
    },
    { color: "gray", checked: color === "gray", onChange: changeColor },
  ];

  return (
    <div ref={ref} className="relative">
      <AddNoteButton
        name="palette"
        onClick={() => setShowPalette(!showPalette)}
      />
      {showPalette && (
        <ul
          style={{
            boxShadow:
              "0 1px 2px 0 rgb(60 64 67 / 30%), 0 2px 6px 2px rgb(60 64 67 / 15%)",
          }}
          className="absolute z-50 -left-32 rounded-lg bg-white flex space-x-2 p-2"
        >
          {colorPicker.map((val, i) => {
            return (
              <li>
                <ColorPicker {...val} key={i} />
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Palette;

import Icon from "./Icon";
import { useState } from "react";
import { useAuthContext } from "../Context/AuthProvider";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../services/firebase.config";

const LabelComp = ({ setActiveText, labelName, docID }) => {
  const [isHovered, setHovered] = useState(false);
  const [isFocus, setFocus] = useState(false);
  const [label, setLabel] = useState(labelName);
  const { user } = useAuthContext();

  const docRef = doc(db, `users/${user.uid}/labels`, docID);

  const onDelete = async () => {
    await deleteDoc(docRef);
  };

  return (
    <div
      className="w-full flex items-center py-1"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="w-10 pr-2 flex items-center justify-center h-10">
        <button
          onClick={onDelete}
          className="hover:bg-gray-200 group flex items-center flex-shrink-0 rounded-full"
        >
          <Icon
            variant="Icon"
            name={isHovered ? "delete" : "label"}
            className="p-2 text-[18px] text-gray-500 group-hover:text-black"
          />
        </button>
      </div>
      <input
        type="text"
        value={label}
        onFocus={() => {
          setFocus(true);
          setActiveText(false);
        }}
        onChange={setLabel}
        className="text-sm w-full focus:border-b focus:border-gray-300 outline-none py-1 mx-1"
      />
      <button
        onClick={() => {
          setFocus(false);
        }}
        className="hover:bg-gray-200 group flex items-center flex-shrink-0 rounded-full"
      >
        <Icon
          variant="Icon"
          name={isFocus ? "check" : "edit"}
          className="p-1 text-[18px] text-gray-500 group-hover:text-black"
        />
      </button>
    </div>
  );
};

export default LabelComp;

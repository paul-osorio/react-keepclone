import Icon from "./Icon";
import { useRef, useState } from "react";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../services/firebase.config";
import { selectUser } from "../app/features/userSlice";
import { useSelector } from "react-redux";
import DeleteLabelModal from "./Modals/DeleteLabel";
import { useEffect } from "react";

const LabelComp = ({ setActiveText, labelName, docID }) => {
  const [isHovered, setHovered] = useState(false);
  const [isFocus, setFocus] = useState(false);
  const [label, setLabel] = useState(labelName);
  const user = useSelector(selectUser);
  const [modalOpen, setModalopen] = useState(false);
  const inputRef = useRef();

  const closeModal = () => setModalopen(false);
  const openModal = () => setModalopen(true);

  const docRef = doc(db, `users/${user.uid}/labels`, docID);

  const onDelete = async () => {
    await deleteDoc(docRef);
  };

  return (
    <>
      <div
        className="w-full flex items-center py-1"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="w-10 pr-2 flex items-center justify-center h-10">
          <button
            onClick={openModal}
            className="hover:bg-gray-200 group flex items-center flex-shrink-0 rounded-full"
          >
            <Icon
              variant="Icon"
              name={isHovered ? "delete" : "label"}
              className="p-2 text-[18px] text-gray-500 group-hover:text-black dark:text-neutral-400"
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
          ref={inputRef}
          onBlur={() => setFocus(false)}
          onChange={(e) => setLabel(e.target.value)}
          className="text-sm w-full dark:bg-midnight-600 dark:text-neutral-200 focus:border-b focus:border-gray-300 outline-none py-1 mx-1"
        />

        <button
          onClick={() => {
            setFocus(!isFocus);
          }}
          className="hover:bg-gray-200 group flex items-center flex-shrink-0 rounded-full"
        >
          <Icon
            variant="Icon"
            name={isFocus ? "check" : "edit"}
            className="p-1 text-[18px] text-gray-500 group-hover:text-black dark:text-neutral-400"
          />
        </button>
      </div>
      {modalOpen && (
        <DeleteLabelModal handleClose={closeModal} onDelete={onDelete} />
      )}
    </>
  );
};

export default LabelComp;

import Icon from "../Icon";
import Backdrop from "./Backdrop";
import { useState, useEffect, useRef } from "react";
import LabelComp from "../LabelComp";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentLabel, setLabels } from "../../app/features/labelSlice";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { db } from "../../services/firebase.config";
import { selectUser } from "../../app/features/userSlice";

const EditLabelsModal = ({ handleClose }) => {
  const [isActiveText, setActiveText] = useState(true);
  const user = useSelector(selectUser);
  const currentLabel = useSelector((state) => state.labels.currentLabel);
  const labels = useSelector((state) => state.labels.labels);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const docCollection = collection(db, `users/${user.uid}/labels`);
  const docRef = doc(docCollection);
  const inputRef = useRef();

  const addLabel = async (event) => {
    event.preventDefault();
    if (currentLabel !== "") {
      if (labels.filter((e) => e.label === currentLabel).length > 0) {
        setError("Label already exists");
      } else {
        await setDoc(docRef, {
          labelName: currentLabel,
          created_at: serverTimestamp(),
        });
        dispatch(setCurrentLabel(""));
        setError("");
      }
    }
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(docCollection, (snapshot) => {
      const data = [];
      snapshot.docs.map((val) => {
        data.push({
          docID: val.id,
          label: val.data().labelName,
          created_at: val.data().created_at,
        });
      });
      dispatch(setLabels(data.sort((a, b) => a.label.localeCompare(b.label))));
    });
    return () => unsubscribe();
  }, []);

  return (
    <Backdrop onClick={handleClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        className=" bg-white dark:bg-midnight-600  w-[300px] shadow-card dark:shadow-darkCard "
      >
        <div className="px-3 py-3 max-h-[392px] overflow-auto notescrollbar">
          <div className="font-medium text-gray-700 mb-2 dark:text-neutral-200">
            Edit labels
          </div>
          <form onSubmit={addLabel}>
            <div className="flex items-center w-full">
              <button
                onClick={() => {
                  setActiveText(false);
                  setError("");
                  dispatch(setCurrentLabel(""));
                  if (!isActiveText) {
                    inputRef.current.focus();
                  }
                }}
                type="button"
                className="hover:bg-gray-200 mr-2 group flex items-center flex-shrink-0 rounded-full"
              >
                <Icon
                  variant="Symbols"
                  name={isActiveText ? "close" : "add"}
                  className="p-1 text-[22px] text-gray-500 group-hover:text-black dark:text-neutral-400"
                />
              </button>
              <input
                type="text"
                value={currentLabel}
                maxLength="50"
                placeholder="Create new label"
                className="text-sm focus:border-b dark:bg-midnight-600 dark:text-neutral-200 focus:border-gray-300 w-full outline-none py-1 mx-1"
                onFocus={() => {
                  setActiveText(true);
                }}
                ref={inputRef}
                onChange={(e) => {
                  if (e.target.value === "") {
                    setError("");
                  }
                  dispatch(setCurrentLabel(e.target.value));
                }}
                autoFocus
              />
              {isActiveText && (
                <button
                  type="submit"
                  className="hover:bg-gray-200 group flex items-center flex-shrink-0 rounded-full"
                >
                  <Icon
                    variant="Symbols"
                    name="check"
                    className="p-1 text-[22px] text-gray-500 group-hover:text-black dark:text-neutral-400"
                  />
                </button>
              )}
            </div>
          </form>
          <div className="pl-10 mt-2 text-red-600 text-xs italic">{error}</div>
          <div className="py-2 w-full ">
            {labels.map((val, i) => {
              return (
                <LabelComp
                  key={val.docID}
                  setActiveText={setActiveText}
                  labelName={val.label}
                  docID={val.docID}
                />
              );
            })}
          </div>
        </div>
        <div className="py-4 border-t flex justify-end px-4">
          <button
            onClick={handleClose}
            className="text-sm text-gray-700 hover:bg-gray-500/10 py-2 px-5 dark:text-neutral-200"
          >
            Done
          </button>
        </div>
      </div>
    </Backdrop>
  );
};

export default EditLabelsModal;

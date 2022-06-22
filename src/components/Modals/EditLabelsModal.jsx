import Icon from "../Icon";
import Backdrop from "./Backdrop";
import { useState, useEffect } from "react";
import LabelComp from "../LabelComp";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentLabel, setLabels } from "../../app/features/labelSlice";
import {
  collection,
  doc,
  onSnapshot,
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

  const addLabel = async (event) => {
    event.preventDefault();
    if (labels.filter((e) => e.label === currentLabel).length > 0) {
      setError("Label already exists");
    } else {
      await setDoc(docRef, {
        labelName: currentLabel,
        created_at: serverTimestamp(),
      });
      dispatch(setCurrentLabel(""));
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
      dispatch(setLabels(data));
    });
    return () => unsubscribe();
  }, []);

  return (
    <Backdrop onClick={handleClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="border bg-white  w-[300px] shadow-lg shadow-gray-400 "
      >
        <div className="px-3 py-3 max-h-[392px] overflow-auto notescrollbar">
          <div className="font-medium text-gray-700 mb-2">Edit labels</div>
          <form onSubmit={addLabel}>
            <div className="flex items-center w-full">
              <button
                onClick={() => {
                  setActiveText(false);
                  setError("");
                  dispatch(setCurrentLabel(""));
                }}
                type="button"
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
                value={currentLabel}
                placeholder="Create new label"
                className="text-sm focus:border-b focus:border-gray-300 w-full outline-none py-1 mx-1"
                onFocus={() => {
                  setActiveText(true);
                }}
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
                    className="p-1 text-[22px] text-gray-500 group-hover:text-black"
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
                  key={i}
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

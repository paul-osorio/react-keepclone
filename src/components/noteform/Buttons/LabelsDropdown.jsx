import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState, useRef } from "react";
import { useOnClickOutside } from "../../../hooks/useOnClickOutside";
import { db } from "../../../services/firebase.config";
import Icon from "../../Icon";
import { useSelector } from "react-redux";

const LabelsDropdown = ({ setOpenLabel }) => {
  const [labels, setLabels] = useState([]);
  const ref = useRef();
  const user = useSelector((state) => state.user.user);
  const docCollection = collection(db, `users/${user.uid}/labels`);

  useOnClickOutside(ref, () => setOpenLabel(false));

  useEffect(() => {
    onSnapshot(docCollection, (snapshot) => {
      const data = [];

      snapshot.docs.map((val) => {
        data.push({
          docID: val.id,
          label: val.data().labelName,
        });
      });

      setLabels(data.sort((a, b) => a.label.localeCompare(b.label)));
    });
  }, []);

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

      <form>
        {labels.map((val, i) => {
          return (
            <div className="flex py-1 items-start" key={i}>
              <input type="checkbox" id={val.docID} className="b" />
              <label
                htmlFor={val.docID}
                className="dark:text-neutral-300 text-[13px] ml-2"
              >
                {val.label}
              </label>
            </div>
          );
        })}
      </form>
    </div>
  );
};

export default LabelsDropdown;

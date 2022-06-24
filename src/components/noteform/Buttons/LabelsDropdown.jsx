import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState, useRef, useId } from "react";
import { useOnClickOutside } from "../../../hooks/useOnClickOutside";
import { db } from "../../../services/firebase.config";
import Icon from "../../Icon";
import { useDispatch, useSelector } from "react-redux";
import { setFormLabel } from "../../../app/features/labelSlice";

const LabelsDropdown = ({ setOpenLabel }) => {
  const labelID = useId();
  const [labels, setLabels] = useState([]);
  const ref = useRef();
  const user = useSelector((state) => state.user.user);
  const labelsArray = useSelector((state) => state.labels.formLabel);
  const dispatch = useDispatch();

  const docCollection = collection(db, `users/${user.uid}/labels`);

  useOnClickOutside(ref, () => setOpenLabel(false));

  const handleCheckLabel = (e) => {
    const isChecked = e.target.checked;
    if (isChecked) {
      dispatch(setFormLabel([...labelsArray, e.target.value]));
    } else {
      dispatch(
        setFormLabel(labelsArray.filter((val) => val !== e.target.value))
      );
    }
    console.log(labelsArray);
  };

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
      className="z-50 w-52 py-3  absolute dark:bg-midnight-600 bg-white shadow-card dark:shadow-darkCard"
      ref={ref}
    >
      <p className="dark:text-neutral-200 text-[15px] px-3">Label note</p>
      <div className="relative w-full flex items-center px-3">
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
            <label
              className="flex py-1 px-3 items-start cursor-pointer hover:bg-gray-500/10"
              key={i}
              htmlFor={labelID + i}
            >
              <input
                type="checkbox"
                value={val.label}
                id={labelID + i}
                onChange={handleCheckLabel}
                className="formCheckbox h-[14px] w-[14px] cursor-pointer"
              />
              <label
                htmlFor={labelID + i}
                className="dark:text-neutral-300 text-[13px] ml-2 cursor-pointer m-0 relative  -top-[2px]"
              >
                {val.label}
              </label>
            </label>
          );
        })}
      </form>
    </div>
  );
};

export default LabelsDropdown;

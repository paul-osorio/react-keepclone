import { useDispatch, useSelector } from "react-redux";
import { setFormLabel } from "../../app/features/labelSlice";
import Icon from "../Icon";

const LabelBadge = ({ name }) => {
  const dispatch = useDispatch();
  const labelsArray = useSelector((state) => state.labels.formLabel);

  const deleteLabel = () => {
    dispatch(setFormLabel(labelsArray.filter((val) => val !== name)));
  };
  return (
    <span className="mb-2 inline-block cursor-pointer transition group whitespace-nowrap text-xs p-1 px-2 rounded-full border border-gray-300 dark:border-neutral-500 bg-gray-300 dark:bg-transparent dark:text-white">
      <div className="flex items-center cursor-pointer transition relative">
        <span className="group-hover:mr-5 transition">{name}</span>
        <span
          onClick={deleteLabel}
          className="hidden absolute -right-1 transition  rounded-full p-1 items-center justify-center group-hover:flex cursor-pointer hover:bg-gray-200/10"
        >
          <Icon name="close" className="text-[13px]" />
        </span>
      </div>
    </span>
  );
};

export default LabelBadge;

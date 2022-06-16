import Icon from "../Icon";

const AddNoteButton = ({ onClick, name, variant = "Symbols" }) => {
  return (
    <button className="flex flex-shrink-0 items-center hover:bg-gray-200 rounded-full">
      <Icon
        variant={variant}
        name={name}
        className="p-1  leading-5 text-xl text-gray-600 hover:text-black"
      />
    </button>
  );
};

export default AddNoteButton;

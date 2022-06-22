import Icon from "../Icon";

const AddNoteButton = ({ onClick, name, variant = "Symbols" }) => {
  return (
    <button
      onClick={onClick}
      className="flex flex-shrink-0 items-center hover:bg-gray-500/10 rounded-full"
    >
      <Icon
        variant={variant}
        name={name}
        className="p-1  leading-5 text-xl text-gray-800/80 hover:text-black dark:text-neutral-400 dark:hover:text-white"
      />
    </button>
  );
};

export default AddNoteButton;

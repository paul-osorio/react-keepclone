import Icon from "../Icon";

const AddNoteInitialButton = ({ name, onClick }) => {
  return (
    <div
      className="flex items-center group  hover:bg-gray-100 rounded-full p-3 dark:hover:bg-midnight-500/20"
      role="button"
      onClick={onClick}
    >
      <Icon
        variant="Symbols"
        name={name}
        className="text-gray-600 dark:text-neutral-500 dark:group-hover:text-white"
      />
    </div>
  );
};

export default AddNoteInitialButton;

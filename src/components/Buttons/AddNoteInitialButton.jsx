import Icon from "../Icon";

const AddNoteInitialButton = ({ name, onClick }) => {
  return (
    <div
      className="flex items-center  hover:bg-gray-100 rounded-full p-3"
      role="button"
      onClick={onClick}
    >
      <Icon variant="Symbols" name={name} className="text-gray-600" />
    </div>
  );
};

export default AddNoteInitialButton;

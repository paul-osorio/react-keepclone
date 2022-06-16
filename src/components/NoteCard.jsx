import AddNoteButton from "./Buttons/AddNoteButton";
import Icon from "./Icon";

const NoteCard = ({ style, content }) => {
  const addNotebuttons = [
    { name: "add_alert" },
    { name: "person_add" },
    { name: "palette" },
    { name: "image" },
    { name: "archive" },
    { name: "more_vert", variant: "Icon" },
  ];
  return (
    <div
      className={
        "group  item border mb-3 rounded-lg p-4 hover:shadow hover:shadow-gray-300 relative"
      }
      style={{ userSelect: "none" }}
    >
      <div className="opacity-0 transition duration-300 group-hover:opacity-100">
        <Icon
          variant="Icon"
          className="absolute -top-3 -left-3"
          name="check_circle"
        />
      </div>
      <div className="flex relative">
        <span className="font-medium text-[16px] leading-6 w-11/12 text-gray-800">
          EXAMPLE TITL ASFFE asfas asfasf
        </span>
        <button className="opacity-0 absolute -right-2 -top-3 hover:bg-gray-100 flex items-center p-2 rounded-full transition duration-300 group-hover:opacity-100">
          <Icon variant="Icon" className="text-slate-600" name="push_pin" />
        </button>
      </div>
      <div className="text-sm whitespace-pre-wrap tracking-[0.2px]">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aut quos
        rerum, atque quo voluptatem at itaque ducimus excepturi dolorem adipisci
        nulla illo officiis! Molestiae impedit dolor, ad vitae alias sunt.
        {content}
      </div>
      <div className="flex py-1 justify-between opacity-0 group-hover:opacity-100 transition duration-300">
        {addNotebuttons.map((val, i) => {
          return <AddNoteButton {...val} key={i} />;
        })}
      </div>
    </div>
  );
};

export default NoteCard;

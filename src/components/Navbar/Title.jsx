import Icon from "../Icon";
import logo from "../../assets/logo.svg";

const Title = ({ setCollapse }) => {
  return (
    <div className="flex items-center space-x-2 box-border flex-grow flex-shrink-0 basis-auto pr-8">
      <button
        className="hover:bg-gray-100 items-center mx-2 flex p-2 rounded-full"
        onClick={setCollapse}
      >
        <Icon
          variant="Symbols"
          name="menu"
          className="text-gray-500 dark:text-white"
        />
      </button>
      <div className="flex items-center space-x-2">
        <img src={logo} style={{ height: 35, width: 35 }} alt="" />
        <span className="productSans text-[22px]  text-gray-600 dark:text-white">
          Keep
        </span>
      </div>
    </div>
  );
};

export default Title;

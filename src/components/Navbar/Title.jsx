import Icon from "../Icon";
import logo from "../../assets/logo.svg";
import { useSearchParams, useLocation } from "react-router-dom";

const Title = ({ setCollapse }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const isLabel = searchParams.get("label");
  const match = location.pathname === "/" || location.pathname === "/home";
  console.log(location);
  const name = location.pathname.replace("/", "");

  return (
    <div className="flex items-center space-x-2 box-border flex-grow flex-shrink-0 basis-auto pr-8 min-w-[232px]">
      <button
        className="hover:bg-gray-500/10 items-center mx-2 flex p-2 rounded-full"
        onClick={setCollapse}
      >
        <Icon
          variant="Symbols"
          name="menu"
          className="text-gray-500 dark:text-white"
        />
      </button>
      <div className="flex items-center space-x-2">
        {match && <img src={logo} style={{ height: 35, width: 35 }} alt="" />}
        <span className="productSans text-[22px]  text-gray-600 dark:text-neutral-300">
          {!isLabel && name.charAt(0).toUpperCase() + name.slice(1)}
          {isLabel && isLabel}
        </span>
      </div>
    </div>
  );
};

export default Title;

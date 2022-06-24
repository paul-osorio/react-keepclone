import Icon from "../Icon";
import { useState, useRef } from "react";
import { useOnClickOutside } from "../../hooks/useOnClickOutside";

const SearchForm = () => {
  const [searchVal, setSearchval] = useState("");
  const [showClose, setShowClose] = useState(false);
  const [isFocus, setFocus] = useState(false);
  const ref = useRef();
  useOnClickOutside(ref, () => setFocus(false));
  return (
    <div className="block flex-auto max-w-full w-full tablet:pr-8 tablet:pl-3 mobile:hidden tablet:block">
      <form
        ref={ref}
        className={
          (isFocus
            ? "bg-white shadow shadow-gray-500"
            : "bg-gray-100 dark:bg-midnight-500") +
          " max-w-[720px] h-12 flex items-center relative rounded-lg"
        }
      >
        <div className="h-full mx-14 p-0 w-full">
          <input
            type="text"
            placeholder="Search"
            value={searchVal}
            onChange={(e) => {
              setSearchval(e.target.value);
            }}
            onFocus={() => {
              setFocus(true);
              setShowClose(true);
            }}
            className={
              (isFocus
                ? "bg-white "
                : "bg-gray-100 dark:bg-midnight-500 placeholder:dark:text-white") +
              " h-full w-full outline-none border-none"
            }
          />
        </div>
        <button
          type="button"
          onClick={() => {
            if (!isFocus || searchVal === "") {
              setFocus(true);
            } else {
              ref.current.submit();
            }
          }}
          className={
            (!isFocus
              ? "dark:hover:bg-neutral-900/20"
              : "hover:bg-gray-500/20") +
            " items-center flex p-2 rounded-full absolute mx-3"
          }
        >
          <Icon
            variant="Symbols"
            name="search"
            className={(!isFocus && "dark:text-white") + " text-gray-500 "}
          />
        </button>
        <button
          type="button"
          onClick={() => {
            setSearchval("");
            setShowClose(false);
          }}
          style={{
            visibility: showClose ? "visible" : "hidden",
          }}
          className={
            (!isFocus
              ? "dark:hover:bg-neutral-900/20"
              : "hover:bg-gray-500/20") +
            "  items-center flex p-2 right-0 rounded-full absolute mx-3"
          }
        >
          <Icon
            variant="Symbols"
            name="close"
            className={(!isFocus && "dark:text-white") + " text-gray-500"}
          />
        </button>
      </form>
    </div>
  );
};

export default SearchForm;

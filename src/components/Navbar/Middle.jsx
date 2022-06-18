import Icon from "../Icon";
import SearchForm from "./SearchForm";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useRef } from "react";
import { useOnClickOutside } from "../../hooks/useOnClickOutside";

const Middle = (props) => {
  const [showSettings, setShowsettings] = useState(false);
  const [isGridView, setGridView] = useState(false);
  const ref = useRef();
  useOnClickOutside(ref, () => setShowsettings(false));
  return (
    <div className="items-center flex basis-full flex-grow flex-shrink justify-start tablet:pl-8">
      <SearchForm />
      <button className="hover:bg-gray-100 mobile:flex tablet:hidden items-center flex p-2 rounded-full">
        <Icon variant="Symbols" name="search" className="text-gray-500" />
      </button>
      <div className="flex items-center">
        <button className="hover:bg-gray-100 group items-center flex p-2 rounded-full">
          <Icon
            variant="Symbols"
            name="refresh"
            className="text-gray-500 group-hover:text-black"
          />
        </button>
        <button
          onClick={() => setGridView(!isGridView)}
          className="hover:bg-gray-100 group items-center tablet:flex mobile:hidden flex p-2 rounded-full"
        >
          <Icon
            variant="Symbols"
            name={isGridView ? "grid_view" : "view_agenda"}
            className="text-gray-500 group-hover:text-black"
          />
        </button>
        <div className="relative" ref={ref}>
          <button
            className="hover:bg-gray-100 group items-center flex p-2 rounded-full"
            onClick={() => setShowsettings(!showSettings)}
          >
            <Icon
              variant="Symbols"
              name="settings"
              className="group-hover:text-black text-gray-500"
            />
          </button>
          <AnimatePresence>
            {showSettings && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.05 }}
                className="bg-white block   text-sm -left-5 w-40 absolute shadow shadow-gray-400 py-2 rounded-lg"
              >
                <button
                  onClick={() => props.setOpenSetting(true)}
                  className="block py-2 hover:bg-gray-200 w-full text-gray-900 text-left px-4"
                >
                  Settings
                </button>
                <button className="block py-2 hover:bg-gray-200 w-full text-gray-900 text-left px-4">
                  Enable dark theme
                </button>
                <button className="block py-2 hover:bg-gray-200 w-full text-gray-900 text-left px-4">
                  Send feedback
                </button>
                <button className="block py-2 hover:bg-gray-200 w-full text-gray-900 text-left px-4">
                  Help
                </button>
                <button className="block py-2 hover:bg-gray-200 w-full text-gray-900 text-left px-4">
                  App downloads
                </button>
                <button className="block py-2 hover:bg-gray-200 w-full text-gray-900 text-left px-4">
                  Keyboard shortcust
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Middle;

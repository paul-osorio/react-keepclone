import Title from "./Navbar/Title";
import Middle from "./Navbar/Middle";
import Profile from "./Navbar/Profile";
import { AnimatePresence } from "framer-motion";
import SettingsModal from "./Modals/SettingsModal";
import { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Navbar = ({ setCollapse }) => {
  const [showModal, setShowModal] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const closeModal = () => setShowModal(false);
  useEffect(() => {
    window.onscroll = function () {
      if (window.scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
  }, []);

  return (
    <>
      <header
        className={
          (scrolled && "shadow-md shadow-gray-300") +
          " flex fixed justify-between items-center p-2 border-b  dark:border-b-neutral-500 w-full z-50 bg-white dark:bg-midnight-900"
        }
      >
        <Title setCollapse={setCollapse} />
        <Middle setOpenSetting={setShowModal} />
        <Profile />
      </header>
      <AnimatePresence>
        {showModal && (
          <SettingsModal modalOpen={showModal} handleClose={closeModal} />
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;

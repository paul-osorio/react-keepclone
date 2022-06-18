import Title from "./Navbar/Title";
import Middle from "./Navbar/Middle";
import Profile from "./Navbar/Profile";
import { AnimatePresence } from "framer-motion";
import SettingsModal from "./Modals/SettingsModal";
import { useState } from "react";

const Navbar = ({ setCollapse }) => {
  const [showModal, setShowModal] = useState(false);
  const closeModal = () => setShowModal(false);

  return (
    <>
      <header className="flex fixed justify-between items-center p-2 border-b w-full z-50 bg-white">
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

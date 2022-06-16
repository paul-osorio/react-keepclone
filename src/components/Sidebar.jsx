import { AnimatePresence, motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  ArchiveIcon,
  EditIcon,
  NotesIcon,
  ReminderIcon,
  TagIcon,
  TrashIcon,
} from "../assets/MaterialSVG";
import SidebarButton from "./Buttons/SidebarButton";
import EditLabelsModal from "./Modals/EditLabelsModal";

const Sidebar = ({ collapse }) => {
  const [modalOpen, setModalopen] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const closeModal = () => setModalopen(false);
  const openModal = () => setModalopen(true);

  return (
    <>
      <div className="block">
        <motion.div
          animate={{
            width: collapse ? 80 : 280,
          }}
          transition={{ type: "tween", duration: 0.15 }}
          className="block relative h-0"
        ></motion.div>
        <motion.div
          animate={{
            width: collapse ? 80 : 280,
          }}
          transition={{ type: "tween", duration: 0.15 }}
          className="bg-white box-border flex flex-col downdiv min-h-0 overflow-hidden pt-2 fixed top-[64px]"
        >
          <div className="block basis-auto flex-grow flex-shrink-0">
            <SidebarButton
              onClick={() => {
                navigate("/home");
              }}
              collapse={collapse}
              Icon={
                <NotesIcon className="flex-shrink-0 overflow-hidden mx-3" />
              }
              Name="Notes"
              isActive={pathname === "/home" || pathname === "/"}
            />
            <SidebarButton
              onClick={() => {
                navigate("/reminders");
              }}
              collapse={collapse}
              Icon={
                <ReminderIcon className="flex-shrink-0 overflow-hidden mx-3" />
              }
              Name="Reminders"
              isActive={pathname === "/reminders"}
            />

            <div className="block relative">
              <SidebarButton
                collapse={collapse}
                Icon={
                  <TagIcon className="flex-shrink-0 overflow-hidden mx-3" />
                }
                Name="ExampleTag"
              />
              <SidebarButton
                onClick={() => (modalOpen ? closeModal() : openModal())}
                collapse={collapse}
                Icon={
                  <EditIcon className="flex-shrink-0 overflow-hidden mx-3" />
                }
                Name="Edit labels"
              />
            </div>
            <SidebarButton
              onClick={() => {
                navigate("/archive");
              }}
              collapse={collapse}
              Icon={
                <ArchiveIcon className="flex-shrink-0 overflow-hidden mx-3" />
              }
              Name="Archive"
              isActive={pathname === "/archive"}
            />
            <SidebarButton
              onClick={() => {
                navigate("/trash");
              }}
              collapse={collapse}
              Icon={
                <TrashIcon className="flex-shrink-0 overflow-hidden mx-3" />
              }
              Name="Trash"
              isActive={pathname === "/trash"}
            />
          </div>
          <div className="block flex-shrink-0 flex-grow-0 basis-auto mb-3 mt-5 pb-[6px] pl-6 pr-0 pt-1">
            {!collapse && (
              <a
                href="https://ssl.gstatic.com/keep/licenses/web_client_licenses.txt"
                target="_blank"
                rel="noreferrer"
                className="px-[5px] text-xs py-[2px] text-gray-500 outline-none"
                tabindex="0"
              >
                Open-source licenses
              </a>
            )}
          </div>
        </motion.div>
      </div>
      <AnimatePresence>
        {modalOpen && (
          <EditLabelsModal modalOpen={modalOpen} handleClose={closeModal} />
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;

import { AnimatePresence, motion } from "framer-motion";
import { useLocation, useNavigate, useParams } from "react-router-dom";
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
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../services/firebase.config";
import { selectUser } from "../app/features/userSlice";
import { useSelector } from "react-redux";
import CustomLink from "./Buttons/CustomLink";
import ParamLink from "./Buttons/ParamLink";

const Sidebar = ({ collapse }) => {
  const [modalOpen, setModalopen] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const user = useSelector(selectUser);
  const docCollection = collection(db, `users/${user.uid}/labels`);
  const [labels, setLabels] = useState([]);

  const closeModal = () => setModalopen(false);
  const openModal = () => setModalopen(true);

  useEffect(() => {
    onSnapshot(docCollection, (snapshot) => {
      const data = [];
      snapshot.docs.map((val) => {
        data.push(val.data().labelName);
      });

      setLabels(data.sort((a, b) => a.localeCompare(b)));
    });
  }, []);

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
          className="bg-white dark:bg-midnight-900 box-border flex flex-col downdiv min-h-0 overflow-hidden pt-2 fixed top-[64px]"
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
            <CustomLink
              to="/reminders"
              Icon={
                <ReminderIcon className="flex-shrink-0 overflow-hidden mx-3" />
              }
              Name="Reminders"
            />

            <div className="block relative">
              {labels.map((val, i) => {
                return (
                  <ParamLink
                    key={i}
                    collapse={collapse}
                    label={val}
                    to={{ pathname: `/labels`, search: `?label=${val}` }}
                    Icon={
                      <TagIcon className="flex-shrink-0 overflow-hidden mx-3" />
                    }
                    Name={val}
                  />
                );
              })}

              <SidebarButton
                onClick={() => (modalOpen ? closeModal() : openModal())}
                collapse={collapse}
                Icon={
                  <EditIcon className="flex-shrink-0 overflow-hidden mx-3" />
                }
                Name="Edit labels"
              />
            </div>
            <CustomLink
              to="/archive"
              collapse={collapse}
              Icon={
                <ArchiveIcon className="flex-shrink-0 overflow-hidden mx-3" />
              }
              Name="Archive"
            />
            <CustomLink
              to="/trash"
              collapse={collapse}
              Icon={
                <TrashIcon className="flex-shrink-0 overflow-hidden mx-3" />
              }
              Name="Trash"
            />
          </div>
          <div className="block flex-shrink-0 flex-grow-0 basis-auto mb-3 mt-5 pb-[6px] pl-6 pr-0 pt-1">
            {!collapse && (
              <a
                href="https://ssl.gstatic.com/keep/licenses/web_client_licenses.txt"
                target="_blank"
                rel="noreferrer"
                className="px-[5px] text-xs py-[2px] text-gray-500 outline-none"
                tabIndex="0"
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

import Icon from "../Icon";
import avatar from "../../assets/avatar.png";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import ProfileDetails from "./ProfileDetails";
import { AnimatePresence } from "framer-motion";
import { useRef } from "react";
import { useOnClickOutside } from "../../hooks/useOnClickOutside";
import { useSelector } from "react-redux";
import { selectUser } from "../../app/features/userSlice";

const Profile = () => {
  const user = useSelector(selectUser);
  const [showDetails, setShowDetails] = useState(false);
  const ref = useRef();
  useOnClickOutside(ref, () => setShowDetails(false));

  return (
    <div className="flex items-center flex-shrink-0 flex-grow-0 basis-auto box-border justify-end tablet:pl-8 pr-1">
      <button className="hover:bg-gray-100 items-center flex p-2 dark:hover:bg-neutral-500/20 group rounded-full">
        <Icon
          variant="Symbols"
          name="apps"
          className="group-hover:text-black text-gray-500 dark:group-hover:text-white dark:text-neutral-400"
        />
      </button>
      <div className="relative" ref={ref}>
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="hover:bg-gray-100 items-center dark:hover:bg-neutral-500/20 flex p-2 rounded-full"
        >
          <img
            src={user.photoURL}
            referrerPolicy="no-referrer"
            className="h-8 w-8 rounded-full"
            alt=""
          />
        </button>
        <AnimatePresence>{showDetails && <ProfileDetails />}</AnimatePresence>
      </div>
    </div>
  );
};

export default Profile;

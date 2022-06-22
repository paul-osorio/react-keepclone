import useAuth from "../../hooks/useAuth";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../services/firebase.config";
import avatar from "../../assets/avatar.png";
import { useDispatch } from "react-redux";
import { logout, removeUserSettings } from "../../app/features/userSlice";

const ProfileDetails = () => {
  const user = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const SignOut = () => {
    dispatch(logout());
    dispatch(removeUserSettings());

    signOut(auth);
    navigate("/login");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.05 }}
      className="bg-white  absolute dark:bg-midnight-900 dark:shadow-darkCard  w-80 right-0 shadow-card rounded-lg"
    >
      <div className="py-3">
        <div className="flex justify-center ">
          <img
            src={!user ? avatar : user.photoURL}
            className="h-20 w-20 rounded-full shadow shadow-gray-400 dark:shadow-none"
            alt=""
          />
        </div>
        <p className="text-center pt-3 font-medium text-gray-700 dark:text-white">
          {user && user.displayName}
        </p>
        <p className="text-sm text-center text-gray-500 dark:text-white">
          {user && user.email}
        </p>
        <div className="flex justify-center py-3">
          <motion.button
            whileTap={{
              boxShadow: "0 0 4px rgba(0,0,0,0.2), 0 1px 1px rgba(0,0,0,0.2)",
            }}
            transition={{ duration: 0.05 }}
            className="py-1 px-5 border rounded-full text-[15px] dark:border-neutral-500 dark:text-neutral-300 dark:hover:bg-midnight-500/20 font-medium text-gray-600 hover:bg-gray-50"
          >
            Manage your Google Account
          </motion.button>
        </div>
      </div>

      <hr />
      <div className="flex justify-center py-3">
        <motion.button
          whileTap={{
            boxShadow: "0 0 4px rgba(0,0,0,0.2), 0 1px 1px rgba(0,0,0,0.2)",
          }}
          transition={{ duration: 0.05 }}
          onClick={SignOut}
          className="py-1 px-5 border rounded hover:bg-gray-50 dark:border-neutral-500 dark:text-neutral-300 dark:hover:bg-midnight-500/20"
        >
          Sign Out
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ProfileDetails;

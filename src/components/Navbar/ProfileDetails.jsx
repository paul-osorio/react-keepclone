import useAuth from "../../hooks/useAuth";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../services/firebase.config";

const ProfileDetails = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const SignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate("/login");
      })
      .catch((error) => {
        // An error happened.
        console.log("Error logout : " + error);
      });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.05 }}
      className="bg-white border absolute  w-80 right-0 shadow-md shadow-gray-300 rounded-lg"
    >
      <div className="py-3">
        <div className="flex justify-center ">
          <img
            src={!user ? avatar : user.photoURL}
            className="h-20 w-20 rounded-full shadow shadow-gray-400"
            alt=""
          />
        </div>
        <p className="text-center pt-3 font-medium text-gray-700">
          {user.displayName}
        </p>
        <p className="text-sm text-center text-gray-500">{user.email}</p>
        <div className="flex justify-center py-3">
          <motion.button
            whileTap={{
              boxShadow: "0 0 4px rgba(0,0,0,0.2), 0 1px 1px rgba(0,0,0,0.2)",
            }}
            transition={{ duration: 0.05 }}
            className="py-1 px-5 border rounded-full text-[15px] font-medium text-gray-600 hover:bg-gray-50"
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
          className="py-1 px-5 border rounded hover:bg-gray-50"
        >
          Sign Out
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ProfileDetails;

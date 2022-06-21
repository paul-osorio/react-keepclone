import { doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addUserSettings,
  selectUser,
  selectUserSettings,
} from "../../app/features/userSlice";
import { db } from "../../services/firebase.config";
import Backdrop from "./Backdrop";

const SettingsModal = ({ handleClose }) => {
  const dispatch = useDispatch();
  const settings = useSelector(selectUserSettings);

  const [isDarkMode, setDarkMode] = useState(settings.isDarkMode);
  const user = useSelector(selectUser);
  const docRef = doc(db, "users", user.uid);
  const changeSettings = async (e) => {
    dispatch(addUserSettings({ isDarkMode: isDarkMode }));
    await updateDoc(docRef, {
      isDarkMode: isDarkMode,
    });
    handleClose();
  };

  return (
    <Backdrop onClick={handleClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="border bg-white rounded-xl py-3  w-[300px] shadow-lg shadow-gray-400 "
      >
        <p className="text-center text-2xl">Settings</p>
        <div className="px-5 mt-5">
          <p className="text-blue-700 font-medium text-[15px] mb-3">
            Notes and Lists
          </p>
          <label className="flex items-center justify-between">
            <span className="text-sm">Enable dark theme</span>
            <input
              id="default-checkbox"
              type="checkbox"
              onChange={(e) => setDarkMode(e.target.checked)}
              className="w-4 h-4 rounded-full border-red-700"
              checked={isDarkMode}
            />
          </label>
        </div>
        <div className="flex justify-end px-5 mt-7 space-x-3">
          <button
            onClick={handleClose}
            className="text-[15px] px-4 py-1 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={changeSettings}
            className="text-blue-600 text-[15px] px-4 py-1 hover:bg-blue-50/40 font-medium"
          >
            Save
          </button>
        </div>
      </div>
    </Backdrop>
  );
};

export default SettingsModal;

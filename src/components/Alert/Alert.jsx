import { useEffect } from "react";
import Icon from "../Icon";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { setAlertName } from "../../app/features/noteActionSlice";

const Alert = ({ Title, onClose, onUndo }) => {
  const alertName = useSelector((state) => state.noteAction.alertName);
  const dispatch = useDispatch();
  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(setAlertName(""));
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ y: 30 }}
      animate={{ y: 0 }}
      exit={{ y: 30 }}
      transition={{ duration: 0.1 }}
      className="fixed bottom-5 left-5 py-3 rounded w-[30rem] px-5 bg-zinc-800"
    >
      <div className="flex items-center h-10 justify-between text-white">
        <p className="text-sm">{Title}</p>
        <div className="flex items-center">
          <button
            onClick={onUndo}
            className="text-sm px-5 text-yellow-500 hover:bg-gray-500/10 rounded py-1 font-medium"
          >
            Undo
          </button>
          <button
            className="flex items-center hover:bg-gray-500/10 rounded-full p-1"
            onClick={onClose}
          >
            <Icon name="close" variant="Symbols" className="text-[20px]" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Alert;

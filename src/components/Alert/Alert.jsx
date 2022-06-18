import { useEffect } from "react";
import { useNoteContext } from "../../Context/NoteContext";
import Icon from "../Icon";
import { motion } from "framer-motion";

const Alert = ({ Title, onClose }) => {
  const { alertName, setAlertName } = useNoteContext();
  useEffect(() => {
    const interval = setInterval(() => {
      setAlertName("");
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ y: 30 }}
      animate={{ y: 0 }}
      exit={{ y: 30 }}
      transition={{ duration: 0.1 }}
      className="fixed bottom-5 left-5 py-3 rounded w-[30rem] px-5 bg-zinc-900"
    >
      <div className="flex items-center h-10 justify-between text-white">
        <p className="text-sm">{Title}</p>
        <div className="flex items-center">
          <button className="text-sm px-5 text-yellow-500 hover:bg-gray-500/10 rounded py-1 font-medium">
            Undo
          </button>
          <button className="flex items-center" onClick={onClose}>
            <Icon name="close" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Alert;

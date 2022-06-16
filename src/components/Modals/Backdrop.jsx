import { motion } from "framer-motion";
const Backdrop = ({ children, onClick }) => {
  return (
    <motion.div
      onClick={onClick}
      className="w-full h-screen fixed -top-0 left-0 bg-black/10 flex items-center justify-center z-[900]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.05 }}
    >
      {children}
    </motion.div>
  );
};

export default Backdrop;

import Backdrop from "../Modals/Backdrop";
import { motion } from "framer-motion";

const Container = ({ onClick, children, layoutId, divColor }) => {
  return (
    <Backdrop onClick={onClick}>
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={{ scale: 0.5 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.5 }}
        transition={{ type: "tween", duration: 0.2 }}
        className="z-[1000] flex items-center mx-auto mb-2 w-full relative  rounded-lg max-w-[600px]"
      >
        <motion.div
          className=" py-2 w-full rounded-lg dark:border-midnight-500 dark:border shadow-card dark:shadow-darkCard"
          style={{ backgroundColor: divColor ? divColor : "white" }}
        >
          {children}
        </motion.div>
      </motion.div>
    </Backdrop>
  );
};

export default Container;

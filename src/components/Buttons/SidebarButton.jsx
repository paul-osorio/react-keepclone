import { motion } from "framer-motion";

const SidebarButton = ({ Icon, Name, isActive, collapse, onClick }) => {
  return (
    <motion.div
      onClick={onClick}
      initial={{
        paddingLeft: 12,
      }}
      animate={{
        borderTopLeftRadius: collapse ? "50%" : 0,
        borderBottomLeftRadius: collapse ? "50%" : 0,
        borderBottomRightRadius: collapse ? "50%" : "25px",
        borderTopRightRadius: collapse ? "50%" : "25px",
        paddingRight: collapse ? 0 : 0,
        paddingLeft: collapse ? 0 : 12,
        paddingBottom: 0,
        paddingTop: 0,
        width: collapse ? 48 : "100%",
        marginLeft: collapse ? 12 : 0,
      }}
      transition={{ type: "tween", duration: 0.09 }}
      className={
        (isActive ? "activesidebutton" : "notactivebutton") +
        "  flex items-center box-border cursor-pointer h-12 min-w-[48px] overflow-hidden pl-3  "
      }
    >
      {Icon}
      <span
        className="ml-5 overflow-hidden dark:text-white text-sm font-medium"
        style={{ letterSpacing: 0.25 }}
      >
        {" "}
        {Name}{" "}
      </span>
    </motion.div>
  );
};

export default SidebarButton;

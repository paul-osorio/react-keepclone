import Title from "./Navbar/Title";
import Middle from "./Navbar/Middle";
import Profile from "./Navbar/Profile";

const Navbar = ({ setCollapse }) => {
  return (
    <header className="flex fixed justify-between items-center p-2 border-b w-full z-50 bg-white">
      <Title setCollapse={setCollapse} />
      <Middle />
      <Profile />
    </header>
  );
};

export default Navbar;

import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const Layout = () => {
  const sideBarCollapse = localStorage.getItem("sidebarCollapse");
  const [collapse, setCollapse] = useState(!sideBarCollapse);

  const onCollapse = () => {
    if (collapse) {
      setCollapse(false);
      localStorage.setItem("sidebarCollapse", true);
      return;
    }
    setCollapse(true);
    localStorage.removeItem("sidebarCollapse");
  };

  return (
    <>
      <div className=" block">
        <Navbar setCollapse={onCollapse} />
        <div className="block h-16"></div>
      </div>
      <div className="clear-both flex flex-col h-full relative">
        <div className="flex flex-row downdiv">
          <Sidebar collapse={!collapse} />
          <div className="block min-w-0 w-full">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;

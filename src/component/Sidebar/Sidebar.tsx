import React, { FC, useContext, useState } from "react";
import icons from "../../assets/icons/icons";
import sidebarContext from "./sidebar-context";
import SidebarLogo from "./SidebarLogo";
import SidebarNav from "./SidebarNav";

const Sidebar: FC = (props) => {
  const sidebar = useContext(sidebarContext);

  console.log(sidebar);
  let sidebarStyle =
    "fixed flex flex-col items-center w-[230px] left-0 top-0 bottom-0 shadow z-10 transition-all duration-500 ease-in-out bg-white overflow-hidden";
  let buttonStyle =
    "flex w-4/5 h-10 mt-auto mb-10 justify-evenly items-center rounded hover:bg-[#4487D9] text-[#989898] hover:text-white hover:font-bold";

  if (sidebar.isMinimized && !sidebar.isMouseHover) {
    sidebarStyle = sidebarStyle.replace("w-[230px]", "w-[60px]");
  }
  const mouseEnterHandler = () => {
    sidebar.setOnMouseEnter();
    console.log("mouse enter");
  };
  const mouseLeaveHandler = () => {
    sidebar.setOnMouseLeave();
    console.log("mouse leave");
  };
  return (
    <div
      className={sidebarStyle}
      onMouseEnter={mouseEnterHandler}
      onMouseLeave={mouseLeaveHandler}
    >
      <SidebarLogo />
      <SidebarNav />
      <button className={buttonStyle}>
        {(!sidebar.isMinimized || sidebar.isMouseHover) && <div>Logout</div>}
        <img
          className="h-6 w-6"
          src={icons.logout.gray as string}
          alt="Logout"
        />
      </button>
    </div>
  );
};

export default Sidebar;

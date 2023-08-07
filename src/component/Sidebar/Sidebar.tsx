import React, { FC, useContext, useState } from "react";
import icons from "../../assets/icons/icons";
import sidebarContext from "./sidebar-context";
import SidebarLogo from "./SidebarLogo";
import SidebarNav from "./SidebarNav";

interface Props {
  children?: React.ReactNode;
}

const Sidebar: FC<Props> = (props) => {
  const sidebar = useContext(sidebarContext);
  let sidebarStyle =
    "fixed flex flex-col items-center w-[230px] left-0 top-0 bottom-0 shadow z-10 transition-all duration-300 ease-in-out bg-white overflow-hidden font-jakarta";
  let buttonStyle =
    "flex w-4/5 h-10 mt-auto mb-10 justify-evenly items-center rounded hover:bg-[#4487D9] text-[#989898] hover:text-white hover:font-bold";

  if (sidebar.isMinimized && !sidebar.isMouseHover) {
    sidebarStyle = sidebarStyle.replace("w-[230px]", "w-[60px]");
  }
  const mouseEnterHandler = () => {
    sidebar.setOnMouseEnter();
  };
  const mouseLeaveHandler = () => {
    sidebar.setOnMouseLeave();
  };

  const logoutHandler = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div
      className={sidebarStyle}
      onMouseEnter={mouseEnterHandler}
      onMouseLeave={mouseLeaveHandler}
    >
      <SidebarLogo />
      <SidebarNav />
      <button className={buttonStyle} onClick={logoutHandler}>
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

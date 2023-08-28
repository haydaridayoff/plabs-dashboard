import React, { FC, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import icons from "../../assets/icons/icons";
import handleLogout from "../../handlers/logoutHandler";
import { clearAccessToken } from "../../utils/tokenManager";
import DialogFormContext from "../Dialog/DialogFormContext";
import DialogValidation from "../Dialog/DialogValidation";
import PageLoader from "../Loader/PageLoader";
import sidebarContext from "./sidebar-context";
import SidebarLogo from "./SidebarLogo";
import SidebarNav from "./SidebarNav";

interface Props {
  children?: React.ReactNode;
}

const Sidebar: FC<Props> = (props) => {
  const sidebar = useContext(sidebarContext);
  const [isShow, setIsShow] = useState(false);

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

  const dialog = useContext(DialogFormContext);
  const navigate = useNavigate();
  const logoutHandler = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();
    setIsShow(true);
    try {
      await handleLogout();
      navigate("/login");
    } catch (errorDetails) {
      clearAccessToken();
      navigate("/login");
    }
    setIsShow(false);
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
      {createPortal(PageLoader({ isShow }), document.body)}
    </div>
  );
};

export default Sidebar;

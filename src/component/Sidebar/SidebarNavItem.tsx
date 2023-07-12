import React, { FC, useContext } from "react";
import { NavLink } from "react-router-dom";
import { navItem } from "../../model/Sidebar/SidebarNavItems";
import SidebarContext from "./sidebar-context";

interface Props {
  navItem: navItem;
  onClick?: () => void;
}

interface StyleProps {
  isActive: boolean;
  isPending: boolean;
}

const SidebarNavItem: FC<Props> = (props) => {
  const sidebar = useContext(SidebarContext);
  let defaultStyle =
    "flex flex-start w-full px-3 py-2 gap-2 rounded text-[#989898]";

  let activeStyle =
    "flex flex-start w-full px-3 py-2 gap-2 rounded text-white bg-[#4487D9] font-bold";

  const classNameHandler: (styleprops: StyleProps) => string = ({
    isActive,
  }) => {
    return isActive ? activeStyle : defaultStyle;
  };

  return (
    <NavLink
      onClick={props.onClick}
      to={props.navItem.path}
      className={classNameHandler}
    >
      {!props.navItem.isActive && (
        <img
          className="w-[24px] h-[24px]"
          src={props.navItem.icon.gray}
          alt={props.navItem.title}
        />
      )}
      {props.navItem.isActive && (
        <img
          className="w-[24px] h-[24px]"
          src={props.navItem.icon.white}
          alt={props.navItem.title}
        />
      )}
      {(!sidebar.isMinimized || sidebar.isMouseHover) && (
        <div>{props.navItem.title}</div>
      )}
    </NavLink>
  );
};

export default SidebarNavItem;

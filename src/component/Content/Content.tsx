import React, { useContext } from "react";
import SidebarContext from "../Sidebar/sidebar-context";

interface Props {
  children?: React.ReactNode;
}

const Content: React.FC<Props> = (props) => {
  const sidebar = useContext(SidebarContext);

  let mainStyle =
    "absolute p-6 left-[230px] top-20 right-0 font-jakarta transition-all ease-in-out duration-300 h-fit overflow-y-auto";
  if (sidebar.isMinimized) {
    mainStyle = mainStyle.replace("left-[230px]", "left-[60px]");
  }

  return <main className={mainStyle}>{props.children}</main>;
};

export default Content;

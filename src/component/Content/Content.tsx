import React, { useContext } from "react";
import SidebarContext from "../Sidebar/sidebar-context";

interface Props {
  children?: React.ReactNode;
}

const Content: React.FC<Props> = (props) => {
  const sidebar = useContext(SidebarContext);

  let mainStyle =
    "relative p-6 left-[230px] top-20 bg-[#C1D7F2] transition-all ease-in-out duration-300";

  console.log("sidebar.isMinimized: ", sidebar.isMinimized);
  if (sidebar.isMinimized) {
    mainStyle = mainStyle.replace("left-[230px]", "left-[60px]");
  }

  return <main className={mainStyle}>{props.children}</main>;
};

export default Content;
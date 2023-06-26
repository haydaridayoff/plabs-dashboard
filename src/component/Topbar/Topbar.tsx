import React, { useContext } from "react";
import SidebarContext from "../Sidebar/sidebar-context";
import TopbarNav from "./TopbarNav";

const Topbar: React.FC = (props) => {
  const sidebar = useContext(SidebarContext);

  let topbarStyle =
    "fixed flex w-full h-20 left-[230px] shadow transition-all ease-in-out duration-300";

  if (sidebar.isMinimized) {
    topbarStyle = topbarStyle.replace("left-[230px]", "left-[60px]");
  }

  return (
    <header className={topbarStyle}>
      <TopbarNav />
    </header>
  );
};

export default Topbar;

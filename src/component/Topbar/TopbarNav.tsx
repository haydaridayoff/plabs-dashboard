import React, { FC, useContext } from "react";
import sidebarContext from "../Sidebar/sidebar-context";
import TopbarNavItem from "./TopbarNavItem";

interface Props {}

const TopbarNav: FC<Props> = (props) => {
  const sidebar = useContext(sidebarContext);
  return (
    <nav className="flex justify-start items-center h-full w-auto ml-7 gap-3 text-lg font-semibold">
      {sidebar.navItemsStatus
        .filter((item) => item.isActive)
        .map((item) => (
          <TopbarNavItem key={item.id} navItem={item} />
        ))}
    </nav>
  );
};

export default TopbarNav;

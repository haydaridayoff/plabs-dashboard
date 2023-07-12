//create a new component called SidebarNav

import React, { useContext } from "react";
import SidebarContext from "./sidebar-context";
import SidebarNavItem from "./SidebarNavItem";

const SidebarNav: React.FC = (props) => {
  const sidebar = useContext(SidebarContext);

  return (
    <nav className="flex flex-col m-5 w-4/5 left-0 top-[72px]">
      {sidebar.navItemsStatus.map((item) => (
        <SidebarNavItem
          key={item.id}
          navItem={item}
          onClick={() =>
            sidebar.setActiveItems(
              0,
              undefined,
              undefined,
              undefined,
              undefined,
              item.id,
            )
          }
        />
      ))}
    </nav>
  );
};

export default SidebarNav;

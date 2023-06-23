//create a new component called SidebarNav

import React, { useContext, useState } from "react";
import SidebarNavItem from "./SidebarNavItem";
import SidebarNavItems from "../../model/Sidebar/SidebarNavItems";
import { NavLink } from "react-router-dom";
import SidebarContext from "./sidebar-context";




const SidebarNav: React.FC = (props) => {
  // const activeStatusItems: boolean[] = SidebarNavItems.map((item) => false);
  // activeStatusItems[0] = true;

  // const [activeItems, setActiveItems] = useState<boolean[]>(activeStatusItems);

  // function activeItemHandler(index: number): void {
  //   const newActiveItems: boolean[] = [...activeItems];
  //   newActiveItems.fill(false);
  //   newActiveItems[index] = true;
  //   setActiveItems(newActiveItems);
  // }

  const sidebar = useContext(SidebarContext);

  return (
    <nav className="flex flex-col m-5 w-[190px] h-[648px] left-0 top-[72px]">
        {sidebar.navItemsStatus.map((item) => (
          <SidebarNavItem
            key={item.title}
            navItem={item}
            onClick={() => sidebar.setActiveItems(item)}
          />
        ))}
    </nav>
  );
};

export default SidebarNav;

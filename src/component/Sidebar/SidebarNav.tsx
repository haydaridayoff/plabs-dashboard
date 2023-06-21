//create a new component called SidebarNav

import React, { useState } from "react";
import SidebarNavItem from "./SidebarNavItem";
import SidebarNavItems from "../../model/Sidebar/SidebarNavItems";

const SidebarNav: React.FC = (props) => {
  const activeStatusItems: boolean[] = SidebarNavItems.map((item) => false);
  activeStatusItems[0] = true;

  const [activeItems, setActiveItems] = useState<boolean[]>(activeStatusItems);

  function activeItemHandler(index: number): void {
    const newActiveItems: boolean[] = [...activeItems];
    newActiveItems.fill(false);
    newActiveItems[index] = true;
    setActiveItems(newActiveItems);
  }

  return (
    <nav className="flex m-5 w-[190px] h-[648px] left-0 top-[72px]">
      <ul className="flex flex-col w-full h-full">
        {SidebarNavItems.map((item) => (
          <SidebarNavItem
            key={item.title}
            icon={item.icon}
            title={item.title}
            isActive={activeItems[SidebarNavItems.indexOf(item)]}
            onClick={() => activeItemHandler(SidebarNavItems.indexOf(item))}
          />
        ))}
      </ul>
    </nav>
  );
};

export default SidebarNav;

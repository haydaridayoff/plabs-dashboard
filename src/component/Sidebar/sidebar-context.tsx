import React, {useEffect, useState} from "react";
import SidebarNavItems, { NavItems } from "../../model/Sidebar/SidebarNavItems";
import Sidebar from "./Sidebar";

interface Props {
    children: React.ReactNode;
}

const SidebarContext = React.createContext({
    navItemsStatus: {} as NavItems[],
    setActiveItems: (items:NavItems) => {},
});

const checkSubNav = (items:NavItems) => {
    if (items.subNav){
        items.subNav.map((subNavItem) => {
            if (subNavItem.title !== items.title) {
                subNavItem.isActive = false;
                items.isActive = false;
            } else {
                subNavItem.isActive = true;
                items.isActive = true;
            }
        });
    } else {
        items.isActive = false;
    }
    return items;
};

export const SidebarContextProvider: React.FC<Props> = (props) => {
    const [navItemsStatus, setNavItemsStatus] = useState<NavItems[]>(SidebarNavItems);

    const setActiveItemsHandler = (item:NavItems) => {
        //console.log(item);
        const newNavItemsStatus = navItemsStatus.map((navItem) => {
            if (navItem.title !== item.title) {
                //console.log(navItem.title);
                //console.log(item.title);
                navItem = checkSubNav(navItem);
                //console.log(navItem);
                return navItem;
            }
            //console.log(navItem);
            navItem.isActive = true;
            if (navItem.subNav) {
                navItem.subNav[0].isActive = true;
            }
            return navItem;
        });
        console.log(navItemsStatus);
        setNavItemsStatus(newNavItemsStatus);
    }

    const contextValue = {
        navItemsStatus: navItemsStatus,
        setActiveItems: setActiveItemsHandler,
    };

    useEffect(() => {
        console.log(window.location.pathname);
        setActiveItemsHandler(navItemsStatus.find((item) => item.path === window.location.pathname) as NavItems );
    }, []);

    return (
        <SidebarContext.Provider value={contextValue}>
            <Sidebar/>
            {props.children}
        </SidebarContext.Provider>
    );
}

export default SidebarContext;


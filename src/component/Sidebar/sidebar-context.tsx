import { get } from "http";
import React, {
  Reducer,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";
import { useLocation } from "react-router-dom";
import {
  getNavItem,
  getNavItems,
  getNestedItems,
  resetActiveItems,
} from "../../api/NavItem";
import sidebarNavItems, { navItem } from "../../model/Sidebar/SidebarNavItems";
import Sidebar from "./Sidebar";

interface Props {
  children: React.ReactNode;
}

interface State {
  isMinimized: boolean;
  isMouseHover: boolean;
  sidebarOpen: boolean;
}

interface Action {
  type: string;
}

const initialState: State = {
  isMinimized: false,
  isMouseHover: false,
  sidebarOpen: true,
};

const reducer = (state: State, action: Action) => {
  let tempState;
  switch (action.type) {
    case "TOGGLE_MINIMIZE":
      tempState = {
        ...state,
        isMinimized: !state.isMinimized,
      };
      break;
    case "MOUSE_ENTER":
      tempState = {
        ...state,
        isMouseHover: true,
      };
      break;
    case "MOUSE_LEAVE":
      tempState = {
        ...state,
        isMouseHover: false,
      };
      break;
    default:
      tempState = state;
      break;
  }
  tempState.sidebarOpen = tempState.isMouseHover || !tempState.isMinimized;
  return tempState;
};

export const SidebarContextProvider: React.FC<Props> = (props) => {
  const [navItemsStatus, setNavItemsStatus] =
    useState<navItem[]>(sidebarNavItems);

  const loc = useLocation();

  const [state, dispatch] = useReducer<Reducer<State, Action>>(
    reducer,
    initialState,
  );

  const url = new URL(window.location.href);
  const navActiveItems = useRef<navItem[]>([]);

  const getActiveId = () => {
    const activeId: string[] = [];
    url.pathname.split("/").forEach((path) => {
      if (path !== "")
        if (activeId.length <= 0) activeId.push(path);
        else activeId.push(`${activeId[activeId.length - 1]}-${path}`);
    });
    if (activeId.length <= 0) activeId.push("home");
    if (url.searchParams.get("tabStatus")) {
      activeId.push(
        `${activeId[activeId.length - 1]}-${url.searchParams.get("tabStatus")}`,
      );
    }
    return activeId;
  };

  useEffect(() => {
    const ids = getActiveId();
    setActiveItems(0, undefined, undefined, undefined, undefined, ...ids);
  }, [url.pathname, url.searchParams.get("tabStatus"), loc.pathname]);

  const setActiveItems = (
    index: number = 0,
    navItem?: navItem,
    navItems?: navItem[],
    subNavItems?: navItem[],
    activeItems?: navItem[],
    ...ids: string[]
  ) => {
    let first = true;
    if (!navItem || !navItems || !activeItems || !subNavItems) {
      activeItems = getNestedItems((index = 0), undefined, ...ids);
      if (activeItems.length !== ids.length) {
        console.log("error");
        return;
      }
      navItems = resetActiveItems();
      navItem = getNavItem(activeItems[index].id, navItems);
    } else {
      navItem = getNavItem(activeItems[index].id, subNavItems);
    }
    if (navItem) navItem.isActive = true;
    subNavItems = navItem?.subNav;
    if (navItem?.subNav && index + 1 < activeItems.length) {
      first = false;
      setActiveItems(
        index + 1,
        navItem,
        navItems,
        subNavItems,
        activeItems,
        ...ids,
      );
    }
    console.log(index);
    if (index === 0) {
      console.log("setNavItemsStatus");
      setNavItemsStatus([...navItems]);
      navActiveItems.current = [...activeItems];
    }
  };

  const contextValue = {
    navItemsStatus: navItemsStatus,
    navActiveItems: navActiveItems,
    isMinimized: state.isMinimized,
    isMouseHover: state.isMouseHover,
    setActiveItems: setActiveItems,
    toggleIsMinimized: dispatch.bind(null, { type: "TOGGLE_MINIMIZE" }),
    setOnMouseEnter: dispatch.bind(null, { type: "MOUSE_ENTER" }),
    setOnMouseLeave: dispatch.bind(null, { type: "MOUSE_LEAVE" }),
  };

  return (
    <SidebarContext.Provider value={contextValue}>
      <Sidebar />
      {props.children}
    </SidebarContext.Provider>
  );
};

const SidebarContext = React.createContext({
  navItemsStatus: {} as navItem[],
  navActiveItems: {} as React.MutableRefObject<navItem[]>,
  isMinimized: initialState.isMinimized,
  isMouseHover: initialState.isMouseHover,
  setActiveItems: (
    index: number = 0,
    navItem?: navItem,
    navItems?: navItem[],
    subNavItems?: navItem[],
    activeItems?: navItem[],
    ...ids: string[]
  ) => {},
  toggleIsMinimized: () => {},
  setOnMouseEnter: () => {},
  setOnMouseLeave: () => {},
});

export default SidebarContext;

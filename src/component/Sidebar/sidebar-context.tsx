import { stat } from "fs";
import React, { Reducer, useEffect, useReducer, useState } from "react";
import SidebarNavItems, { NavItems } from "../../model/Sidebar/SidebarNavItems";
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

const checkSubNav = (items: NavItems) => {
  if (items.subNav) {
    items.subNav.map((subNavItem) => {
      if (subNavItem.id !== items.id) {
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

const reducer = (state: State, action: Action) => {
  let tempState;
  console.log(state);
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
    useState<NavItems[]>(SidebarNavItems);

  const [state, dispatch] = useReducer<Reducer<State, Action>, State>(
    reducer,
    initialState,
    (init) => {
      if (localStorage.getItem("sidebar-state")) {
        const tempState: State = JSON.parse(
          localStorage.getItem("sidebar-state") || "",
        );
        init.isMinimized = tempState.isMinimized;
        init.isMouseHover = tempState.isMouseHover;
        init.sidebarOpen = tempState.sidebarOpen;
      }
      return init;
    },
  );

  useEffect(() => {
    setActiveItemsHandler(
      navItemsStatus.find(
        (item) => item.path === window.location.pathname,
      ) as NavItems,
    );
  }, []);

  useEffect(() => {
    localStorage.setItem("sidebar-state", JSON.stringify(state));
  }, [state.isMinimized, state.isMouseHover, state.sidebarOpen]);

  const setActiveItemsHandler = (item: NavItems) => {
    const newNavItemsStatus = navItemsStatus.map((navItem) => {
      if (navItem.id !== item.id) {
        navItem = checkSubNav(navItem);
        return navItem;
      }
      navItem.isActive = true;
      if (navItem.subNav) {
        navItem.subNav[0].isActive = true;
      }
      return navItem;
    });
    setNavItemsStatus(newNavItemsStatus);
  };

  const contextValue = {
    navItemsStatus: navItemsStatus,
    isMinimized: state.isMinimized,
    isMouseHover: state.isMouseHover,
    setActiveItems: setActiveItemsHandler,
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
  navItemsStatus: {} as NavItems[],
  isMinimized: initialState.isMinimized,
  isMouseHover: initialState.isMouseHover,
  setActiveItems: (items: NavItems) => {},
  toggleIsMinimized: () => {},
  setOnMouseEnter: () => {},
  setOnMouseLeave: () => {},
});

export default SidebarContext;

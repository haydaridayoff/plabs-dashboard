import React from "react";
import { Outlet } from "react-router-dom";
import { SidebarContextProvider } from "../component/Sidebar/sidebar-context";
import Topbar from "../component/Topbar/Topbar";

const Journal = () => {
  return (
    <SidebarContextProvider>
      <Outlet />
      <Topbar />
    </SidebarContextProvider>
  );
};

export default Journal;

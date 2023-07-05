import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { SidebarContextProvider } from "../component/Sidebar/sidebar-context";
import Topbar from "../component/Topbar/Topbar";

const Journal = () => {
  if (localStorage.getItem("token") === null) {
    return <Navigate to="/login" />;
  }

  return (
    <SidebarContextProvider>
      <Outlet />
      <Topbar />
    </SidebarContextProvider>
  );
};

export default Journal;

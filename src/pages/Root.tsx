import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { SidebarContextProvider } from "../component/Sidebar/sidebar-context";
import Topbar from "../component/Topbar/Topbar";

const Journal = () => {
  if (localStorage.getItem("token") === null) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <div className="bg-[#F4F9FF] fixed h-screen w-screen bg-fixed bg-center bg-no-repeat bg-cover"></div>
      <SidebarContextProvider>
        <Outlet />
        <Topbar />
      </SidebarContextProvider>
    </>
  );
};

export default Journal;

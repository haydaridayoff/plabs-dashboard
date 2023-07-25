import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import DialogFormContext, {
  DialogFormContextProvider,
} from "../component/Dialog/DialogFormContext";
import { SidebarContextProvider } from "../component/Sidebar/sidebar-context";
import Topbar from "../component/Topbar/Topbar";

const Journal = () => {
  if (localStorage.getItem("token") === null) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <div className="bg-[#F4F9FF] fixed h-screen w-screen bg-fixed bg-center bg-no-repeat bg-cover"></div>
      <DialogFormContextProvider>
        <SidebarContextProvider>
          <Outlet />
          <Topbar />
        </SidebarContextProvider>
      </DialogFormContextProvider>
    </>
  );
};

export default Journal;

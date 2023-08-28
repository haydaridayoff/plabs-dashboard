import React, { useEffect } from "react";
import { Navigate, Outlet, redirect, useNavigate } from "react-router-dom";
import DialogFormContext, {
  DialogFormContextProvider,
} from "../component/Dialog/DialogFormContext";
import { SidebarContextProvider } from "../component/Sidebar/sidebar-context";
import Topbar from "../component/Topbar/Topbar";
import { getAccessToken } from "../utils/tokenManager";

const Journal = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!getAccessToken()) {
      navigate("/login");
    }
  }, [getAccessToken()]);

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

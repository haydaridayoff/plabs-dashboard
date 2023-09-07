import React, { useContext } from "react";
import { BrowserRouter, RouterProvider } from "react-router-dom";
import NotificationDisplay from "./component/Notification/NotificationDisplay";
import Sidebar from "./component/Sidebar/Sidebar";
import Topbar from "./component/Topbar/Topbar";
import { NotificationProvider } from "./contexts/NotificationContext";
import logo from "./logo.svg";
import router from "./Router";

function App() {
  return (
    <>
      <NotificationProvider>
        <RouterProvider router={router} />
        <NotificationDisplay />
      </NotificationProvider>
    </>
  );
}

export default App;

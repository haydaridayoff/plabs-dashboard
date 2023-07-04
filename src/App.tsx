import React, { useContext } from "react";
import { BrowserRouter, RouterProvider } from "react-router-dom";
import Sidebar from "./component/Sidebar/Sidebar";
import Topbar from "./component/Topbar/Topbar";
import logo from "./logo.svg";
import router from "./Router";

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;

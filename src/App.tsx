import React, {useContext} from "react";
import logo from "./logo.svg";
import "./App.css";

import Sidebar from "./component/Sidebar/Sidebar";
import Topbar from "./component/Topbar/Topbar";

import router from "./Router";
import {RouterProvider} from "react-router-dom";


function App() {
  return <RouterProvider router={router}/>;
}

export default App;

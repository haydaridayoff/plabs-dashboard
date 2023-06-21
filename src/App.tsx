import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Sidebar from "./component/Sidebar/Sidebar";
import Topbar from "./component/Topbar/Topbar";

function App() {
  return (
    <div className="App bg-[#F4F9FF]">
      <Topbar />
      <Sidebar />
    </div>
  );
}

export default App;

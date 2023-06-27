import React from "react";
import { isTemplateLiteralTypeSpan } from "typescript";
import { SidebarContextProvider } from "../component/Sidebar/sidebar-context";
import Topbar from "../component/Topbar/Topbar";

const Journal = () => {
  return (
    <SidebarContextProvider>
      <Topbar />
    </SidebarContextProvider>
  );
};

export default Journal;

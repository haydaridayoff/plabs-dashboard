import React from "react";
import {SidebarContextProvider} from "../component/Sidebar/sidebar-context";
import Topbar from "../component/Topbar/Topbar";

const Work = () => {
    return (
        <SidebarContextProvider>
            <Topbar />
        </SidebarContextProvider>
    );
}

export default Work;
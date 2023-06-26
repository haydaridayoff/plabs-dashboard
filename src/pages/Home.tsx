import React from "react";
import {SidebarContextProvider} from "../component/Sidebar/sidebar-context";
import Topbar from "../component/Topbar/Topbar";

const Home = () => {
    return (
        <SidebarContextProvider>
        </SidebarContextProvider>
    );
}

export default Home;
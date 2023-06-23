import React from "react";
import {SidebarContextProvider} from "../component/Sidebar/sidebar-context";
import { isTemplateLiteralTypeSpan } from "typescript";
import Topbar from "../component/Topbar/Topbar";

const Contact = () => {
    return (
        <SidebarContextProvider>
            <Topbar />
        </SidebarContextProvider>
    );
}

export default Contact;
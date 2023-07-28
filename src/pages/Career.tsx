import React, { useContext } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Card from "../component/Card/Card";
import CardTabs from "../component/Card/CardTabs";
import Content from "../component/Content/Content";
import SidebarContext, {
  SidebarContextProvider,
} from "../component/Sidebar/sidebar-context";
import Topbar from "../component/Topbar/Topbar";

const Career: React.FC = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const tab = params.get("tabStatus");
  const sidebar = useContext(SidebarContext);
  const path = location.pathname;

  return (
    <>
      <Content>
        <CardTabs />
        <Card>
          {tab === "about" && <h1>Heil</h1>}
          <Outlet />
        </Card>
      </Content>
    </>
  );
};

export default Career;

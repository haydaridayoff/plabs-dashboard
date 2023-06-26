import React, { useContext } from "react";
import Card from "../component/Card/Card";
import Content from "../component/Content/Content";
import Section from "../component/Section/Section";
import SidebarContext, {
  SidebarContextProvider,
} from "../component/Sidebar/sidebar-context";
import Topbar from "../component/Topbar/Topbar";

const Home = () => {
  return (
    <SidebarContextProvider>
      <Content>
        <Card>
          <Section title={"Hero"}></Section>
        </Card>
      </Content>
      <Topbar />
    </SidebarContextProvider>
  );
};

export default Home;

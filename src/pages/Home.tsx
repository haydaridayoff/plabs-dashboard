import React, { useContext } from "react";
import Card from "../component/Card/Card";
import Content from "../component/Content/Content";
import InputField from "../component/Input/InputField";
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
          <Section title={"Hero"}>
            <InputField value="We are on a mission to evolve your business by simplifying every development process on all touchpoint." />
          </Section>
          <Section title={"Section 1"}>
            <InputField
              label="Title"
              value="We are on a mission to evolve your business by simplifying every development process on all touchpoint."
            />
            <InputField
              label="Title"
              value="We are on a mission to evolve your business by simplifying every development process on all touchpoint."
            />
          </Section>
        </Card>
      </Content>
      <Topbar />
    </SidebarContextProvider>
  );
};

export default Home;

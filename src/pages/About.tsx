import React, { useContext, useEffect, useState } from "react";
import {
  Link,
  NavLink,
  redirect,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import Card from "../component/Card/Card";
import CardTabs from "../component/Card/CardTabs";
import Content from "../component/Content/Content";
import SidebarContext from "../component/Sidebar/sidebar-context";
import AboutEcosystem from "./AboutEcosystem";
import AboutMain from "./AboutMain";
import AboutPartner from "./AboutPartner";
import AboutPeople from "./AboutPeople";

const About = () => {
  const sidebar = useContext(SidebarContext);
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const tab = params.get("tabStatus");

  const [tabLinks, setTabLinks] = useState([
    {
      name: "About",
      path: "/about?tabStatus=about",
      isActive: tab === "about" ? true : false,
    },
    {
      name: "Ecosystem",
      path: "/about?tabStatus=ecosystem",
      isActive: tab === "ecosystem" ? true : false,
    },
    {
      name: "Partner",
      path: "/about?tabStatus=partner",
      isActive: tab === "partner" ? true : false,
    },
    {
      name: "People",
      path: "/about?tabStatus=people",
      isActive: tab === "people" ? true : false,
    },
  ]);

  useEffect(() => {
    setTabLinks([
      {
        name: "About",
        path: "/about?tabStatus=about",
        isActive: tab === "about" ? true : false,
      },
      {
        name: "Ecosystem",
        path: "/about?tabStatus=ecosystem",
        isActive: tab === "ecosystem" ? true : false,
      },
      {
        name: "Partner",
        path: "/about?tabStatus=partner",
        isActive: tab === "partner" ? true : false,
      },
      {
        name: "People",
        path: "/about?tabStatus=people",
        isActive: tab === "people" ? true : false,
      },
    ]);
    !tab && navigate("/about?tabStatus=about");
  }, [tab]);

  console.log(tabLinks);
  return (
    <>
      <Content>
        <Card>
          <CardTabs className="mb-6" items={tabLinks} />
          {tab === "about" && <AboutMain />}
          {tab === "ecosystem" && <AboutEcosystem />}
          {tab === "partner" && <AboutPartner />}
          {tab === "people" && <AboutPeople />}
        </Card>
      </Content>
    </>
  );
};

export default About;

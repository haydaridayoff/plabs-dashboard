import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, useNavigate, useSearchParams } from "react-router-dom";
import Card from "../component/Card/Card";
import CardTabs from "../component/Card/CardTabs";
import Content from "../component/Content/Content";
import SidebarContext from "../component/Sidebar/sidebar-context";
import AboutEcosystem from "./AboutEcosystem";
import AboutMain from "./AboutMain";

const About = () => {
  // OLD CODE
  // let { search } = useLocation();
  // let query = new URLSearchParams(search);
  const sidebar = useContext(SidebarContext);
  const [query, setQuery] = useSearchParams();
  const navigator = useNavigate();
  let tab = query.get("tabStatus");

  const [tabLinks, setTabLinks] = useState([
    {
      name: "About",
      path: "/about?tabStatus=about",
      isActive: false,
    },
    {
      name: "Ecosystem",
      path: "/about?tabStatus=ecosystem",
      isActive: false,
    },
    {
      name: "Partner",
      path: "/about?tabStatus=partner",
      isActive: false,
    },
    {
      name: "People",
      path: "/about?tabStatus=people",
      isActive: false,
    },
  ]);
  useEffect(() => {
    if (!tab) {
      sidebar.setActiveItems(
        0,
        undefined,
        undefined,
        undefined,
        undefined,
        sidebar.navActiveItems.current[0].id,
        sidebar.navActiveItems.current[0].subNav![0].id,
      );
      navigator("/about?tabStatus=about");
    }
  }, [tab]);

  console.log(tabLinks);
  return (
    <>
      <Content>
        <Card>
          <CardTabs className="mb-6" items={tabLinks} />
          {tab === "about" && <AboutMain />}
          {tab === "ecosystem" && <AboutEcosystem />}
        </Card>
      </Content>
    </>
  );
};

export default About;

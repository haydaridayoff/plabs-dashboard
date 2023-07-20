import React, { useContext, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Card from "../component/Card/Card";
import Content from "../component/Content/Content";
import SidebarContext from "../component/Sidebar/sidebar-context";

const About = () => {
  // OLD CODE
  // let { search } = useLocation();
  // let query = new URLSearchParams(search);
  const sidebar = useContext(SidebarContext);
  let [query, setQuery] = useSearchParams();
  const navigator = useNavigate();
  let tab = query.get("tabStatus");

  useEffect(() => {
    if (!tab) {
      navigator("/about?tabStatus=about");
      sidebar.setActiveItems(
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        sidebar.navActiveItems.current[0].id,
        sidebar.navActiveItems.current[0].subNav![0].id,
      );
    }
  }, [tab]);

  console.log(tab);
  return (
    <>
      <Content>
        <Card></Card>
      </Content>
    </>
  );
};

export default About;

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

  console.log(tab);
  console.log(sidebar.navActiveItems.current);
  return (
    <>
      <Content>
        <Card>
          {sidebar.navActiveItems.current[0] &&
            sidebar.navActiveItems.current[0].subNav &&
            sidebar.navActiveItems.current[0].subNav.map((item) => (
              <Link
                key={item.id}
                onClick={() => {
                  sidebar.setActiveItems(
                    0,
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    sidebar.navActiveItems.current[0].id,
                    item.id,
                  );
                }}
                to={`/about?tabStatus=${item.param!["tabStatus"]}`}
              >
                {item.title}
              </Link>
            ))}
        </Card>
      </Content>
    </>
  );
};

export default About;

import { useContext, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Card from "../component/Card/Card";
import Content from "../component/Content/Content";
import SidebarContext from "../component/Sidebar/sidebar-context";

const Project: React.FC = () => {
  const url = useLocation();
  // if url is /project go to project dashboard
  const navigator = useNavigate();
  const sidebar = useContext(SidebarContext);

  useEffect(() => {
    if (url.pathname === "/project") {
      navigator("/project/dashboard");
      sidebar.setActiveItems(
        0,
        undefined,
        undefined,
        undefined,
        undefined,
        sidebar.navActiveItems.current[0].id,
        sidebar.navActiveItems.current[0].subNav![0].id,
      );
    }
  }, [url.pathname]);

  return (
    <>
      <Content>
        <Card>
          <Outlet />
        </Card>
      </Content>
    </>
  );
};
export default Project;

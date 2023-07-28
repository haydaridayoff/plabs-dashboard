import { useContext, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Card from "../component/Card/Card";
import Content from "../component/Content/Content";
import SidebarContext from "../component/Sidebar/sidebar-context";

const Project: React.FC = () => {
  const url = useLocation();
  const paths = url.pathname.split("/");
  // if url is /project go to project dashboard
  const navigator = useNavigate();
  const sidebar = useContext(SidebarContext);

  useEffect(() => {
    // if url is /project go to project dashboard
    if (url.pathname === "/project") {
      navigator("/project/dashboard");
    }
    if (
      paths.find((path) => path === "project") &&
      paths.length === 3 &&
      paths[2] !== "dashboard"
    ) {
      sidebar.setActiveItems(
        0,
        undefined,
        undefined,
        undefined,
        undefined,
        sidebar.navItemsStatus.find((item) => item.id === paths[1])!.id,
        sidebar.navItemsStatus
          .find((item) => item.id === "project")!
          .subNav!.find((item) => item.id === `${paths[1]}-${paths[2]}`)?.id!,
      );
    } else {
      sidebar.setActiveItems(
        0,
        undefined,
        undefined,
        undefined,
        undefined,
        sidebar.navItemsStatus[2].id,
        sidebar.navItemsStatus[2].subNav![0].id,
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

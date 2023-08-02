import { useContext, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Card from "../component/Card/Card";
import Content from "../component/Content/Content";
import SidebarContext from "../component/Sidebar/sidebar-context";

const Project: React.FC = () => {
  const url = useLocation();
  // if url is /project go to project dashboard
  const navigator = useNavigate();

  useEffect(() => {
    // if url is /project go to project dashboard
    if (url.pathname === "/project") {
      navigator("/project/dashboard");
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

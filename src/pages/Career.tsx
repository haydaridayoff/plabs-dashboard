import React, { useContext, useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Card from "../component/Card/Card";
import CardTabs from "../component/Card/CardTabs";
import Content from "../component/Content/Content";
import SidebarContext, {
  SidebarContextProvider,
} from "../component/Sidebar/sidebar-context";
import Topbar from "../component/Topbar/Topbar";

const Career: React.FC = () => {
  const location = useLocation();
  const sidebar = useContext(SidebarContext);
  const navigate = useNavigate();

  console.log(location.pathname);

  const [tabLinks, setTabLinks] = useState([
    {
      name: "Career",
      path: "/career/career",
      isActive: location.pathname === "/career/career" ? true : false,
    },
    {
      name: "Job",
      path: "/career/job",
      isActive: location.pathname === "/career/job" ? true : false,
    },
    {
      name: "Applicant",
      path: "/career/applicant",
      isActive: location.pathname === "/career/applicant" ? true : false,
    },
  ]);

  useEffect(() => {
    setTabLinks([
      {
        name: "Career",
        path: "/career/career",
        isActive: location.pathname === "/career/career" ? true : false,
      },
      {
        name: "Job",
        path: "/career/job",
        isActive: location.pathname.includes("/career/job") ? true : false,
      },
      {
        name: "Applicant",
        path: "/career/applicant",
        isActive: location.pathname === "/career/applicant" ? true : false,
      },
    ]);
    location.pathname === "/career" && navigate("/career/career");
  }, [location.pathname]);

  return (
    <>
      <Content>
        <Card>
          <CardTabs items={tabLinks} className="mb-6" />
          <Outlet />
        </Card>
      </Content>
    </>
  );
};

export default Career;

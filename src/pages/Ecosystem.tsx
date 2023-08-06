import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Card from "../component/Card/Card";
import CardTabs from "../component/Card/CardTabs";
import Content from "../component/Content/Content";

const Ecosystem: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const initLinks = [
    {
      name: "Client",
      path: "/ecosystem/client",
      isActive: location.pathname === "/ecosystem/client" ? true : false,
    },
    {
      name: "Ecosystem",
      path: "/ecosystem/ecosystem",
      isActive: location.pathname === "/ecosystem/ecosystem" ? true : false,
    },
    {
      name: "Partner",
      path: "/ecosystem/partner",
      isActive: location.pathname === "/ecosystem/partner" ? true : false,
    },
  ];

  const [tabLinks, setTabLinks] = useState(initLinks);

  useEffect(() => {
    initLinks.map((link) => {
      if (location.pathname.includes(link.path)) {
        link.isActive = true;
      } else {
        link.isActive = false;
      }
    });
    setTabLinks(initLinks);
    location.pathname === "/ecosystem" && navigate("/ecosystem/client");
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

export default Ecosystem;

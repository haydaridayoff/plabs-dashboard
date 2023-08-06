import React from "react";
import { Outlet } from "react-router-dom";
import Card from "../component/Card/Card";
import Content from "../component/Content/Content";

const Journal: React.FC = () => {
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

export default Journal;

import { useContext, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Card from "../component/Card/Card";
import Content from "../component/Content/Content";
import InputField from "../component/Input/InputField";
import Section from "../component/Section/Section";
import SidebarContext from "../component/Sidebar/sidebar-context";

const ProjectCreate: React.FC = () => {
  return (
    <>
      <Section title="Project" isLast={true} type="add">
        <div className="flex flex-col gap-5">
          <div>
            <InputField />
          </div>
        </div>
      </Section>
    </>
  );
};
export default ProjectCreate;

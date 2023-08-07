import React, { useState } from "react";
import { getWorkData } from "../api/Work";
import Card from "../component/Card/Card";
import Content from "../component/Content/Content";
import InputField from "../component/Input/InputField";
import Section from "../component/Section/Section";
import { SidebarContextProvider } from "../component/Sidebar/sidebar-context";
import Topbar from "../component/Topbar/Topbar";

const Work = () => {
  const [content, setContent] = useState(getWorkData);
  const [editContent, setEditContent] = useState(content);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const toggleEditing = () => {
    setIsEditing(!isEditing);
    setEditContent(content);
  };

  function submitHandler(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    setContent(editContent);
    toggleEditing();
  }

  return (
    <>
      <Content>
        <Card>
          <Section
            title="Work"
            isLast={true}
            onClick={toggleEditing}
            isEditing={isEditing}
            onSubmit={submitHandler}
            type="edit"
          >
            <div>
              <InputField
                value={isEditing ? editContent.title : content.title}
                readOnly={!isEditing}
                onChange={(e) => {
                  setEditContent({ ...editContent, title: e.target.value });
                }}
              />
            </div>
          </Section>
        </Card>
      </Content>
    </>
  );
};

export default Work;

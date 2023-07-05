import { is } from "@babel/types";
import React, { useState } from "react";
import Card from "../component/Card/Card";
import Content from "../component/Content/Content";
import FileInput from "../component/Input/FileInput";
import InputField from "../component/Input/InputField";
import TextArea from "../component/Input/TextArea";
import Section from "../component/Section/Section";
import homeData from "../model/MockData/homeData";

const Home = () => {
  let description = `We discover and execute transformations by bringing a diverse skill set with impressive experiences in creative & technology solutions. We deliver the simplest and the fittest solution for even the most complicated business problems.`;
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [content, setContent] = useState(homeData);
  const [editContent, setEditContent] = useState(content);

  const toggleEditing = () => {
    setIsEditing(!isEditing);
    setEditContent(content);
  };

  const submitEditHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setContent(editContent);
    setIsEditing(false);
  };

  return (
    <Content>
      <Card>
        <Section
          title={"Hero"}
          onEditToggle={toggleEditing}
          isEditing={isEditing}
          onSubmit={submitEditHandler}
        >
          <InputField
            readOnly={!isEditing}
            value={content.hero}
            onChange={(e) => {
              setEditContent({
                ...editContent,
                hero: e.target.value,
              });
            }}
          />
        </Section>
        <Section
          title={"Section 1"}
          onEditToggle={toggleEditing}
          isEditing={isEditing}
          onSubmit={submitEditHandler}
        >
          <InputField
            label="Title"
            value={content.section1.title}
            readOnly={!isEditing}
            onChange={(e) => {
              setEditContent({
                ...editContent,
                section1: {
                  ...editContent.section1,
                  title: e.target.value,
                },
              });
            }}
          />
          <div className="flex mt-4 gap-5">
            <div className="w-full">
              <TextArea
                label="Description"
                value={content.section1.description}
                className="resize-none overflow-y-scroll h-20 w-full"
                onChange={(e) => {
                  description = e.target.value;
                }}
                readOnly={!isEditing}
              />
            </div>
            <div className="w-full">
              <FileInput
                label="File"
                readOnly={!isEditing}
                preview={
                  !isEditing
                    ? content.section1.file.src
                    : editContent.section1.file.src
                }
                fileType={
                  !isEditing
                    ? content.section1.file.type
                    : editContent.section1.file.type
                }
                onChange={(e, fileType) => {
                  setEditContent({
                    ...editContent,
                    section1: {
                      ...editContent.section1,
                      file: {
                        src: URL.createObjectURL(e.target.files![0]),
                        type: fileType as string,
                      },
                    },
                  });
                }}
              />
            </div>
          </div>
        </Section>
      </Card>
    </Content>
  );
};

export default Home;

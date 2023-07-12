import { info } from "console";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  TableOptions,
  useReactTable,
} from "@tanstack/react-table";
import React, { useState } from "react";
import Card from "../component/Card/Card";
import Content from "../component/Content/Content";
import FileInput from "../component/Input/FileInput";
import InputField from "../component/Input/InputField";
import TextArea from "../component/Input/TextArea";
import Section from "../component/Section/Section";
import GlobalFiltering from "../component/Table/GlobalFiltering";
import TableBase from "../component/Table/TableBase";
import homeData from "../model/MockData/homeData";

const Home = () => {
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

  const sectionHero = (
    <Section
      title={"Hero"}
      onEditToggle={toggleEditing}
      isEditing={isEditing}
      onSubmit={submitEditHandler}
    >
      <InputField
        readOnly={!isEditing}
        value={!isEditing ? content.hero : editContent.hero}
        onChange={(e) => {
          console.log(e.target.value);
          setEditContent({
            ...editContent,
            hero: e.target.value,
          });
        }}
      />
    </Section>
  );

  const sectionOne = (
    <Section
      title={"Section 1"}
      onEditToggle={toggleEditing}
      isEditing={isEditing}
      onSubmit={submitEditHandler}
    >
      <InputField
        label="Title"
        value={!isEditing ? content.section1.title : editContent.section1.title}
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
            value={
              !isEditing
                ? content.section1.description
                : editContent.section1.description
            }
            className="resize-none overflow-y-scroll h-40 w-full"
            onChange={(e) => {
              setEditContent({
                ...content,
                section1: {
                  ...content.section1,
                  description: e.target.value,
                },
              });
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
            onChange={(e) => {
              setEditContent({
                ...editContent,
                section1: {
                  ...editContent.section1,
                  file: {
                    src: editContent.section1.file.src,
                    type: e.target.value as string,
                  },
                },
              });
            }}
            onFileChange={(e) => {
              setEditContent({
                ...editContent,
                section1: {
                  ...editContent.section1,
                  file: {
                    src: URL.createObjectURL(e.target.files![0]),
                    type: editContent.section1.file.type,
                  },
                },
              });
            }}
          />
        </div>
      </div>
    </Section>
  );

  //#region Table
  type Data = {
    col1: string;
    col2: string;
  };

  let defaultData = React.useMemo<Data[]>(
    () => [
      {
        col1: "Hello",
        col2: "World",
      },
      {
        col1: "react-table",
        col2: "rocks",
      },
      {
        col1: "whatever",
        col2: "you want",
      },
    ],
    [],
  );

  const sectionTableOne = (
    <Section
      title={"Section 2"}
      onEditToggle={toggleEditing}
      isEditing={isEditing}
      onSubmit={submitEditHandler}
      type="add"
    >
      <GlobalFiltering filter="" setFilter={() => {}} />
      <TableBase data={content.Project} />
    </Section>
  );
  //#endregion
  return (
    <Content>
      <Card>
        {sectionHero}
        {sectionOne}
        {sectionTableOne}
      </Card>
    </Content>
  );
};

export default Home;

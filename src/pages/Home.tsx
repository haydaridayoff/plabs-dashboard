import { ColumnDef } from "@tanstack/react-table";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProject } from "../api/Project";
import icons from "../assets/icons/icons";
import Card from "../component/Card/Card";
import Content from "../component/Content/Content";
import DialogForm from "../component/Dialog/DialogFormContext";
import DialogFormContext from "../component/Dialog/DialogFormContext";
import DialogSelect from "../component/Dialog/DialogSelect";
import FileInput from "../component/Input/FileInput";
import InputField from "../component/Input/InputField";
import TextArea from "../component/Input/TextArea";
import Section from "../component/Section/Section";
import SidebarContext from "../component/Sidebar/sidebar-context";
import TableBase from "../component/Table/TableBase";
import homeData, { deleteHomeProject } from "../model/MockData/homeData";

const Home = () => {
  const homeDataRef = React.useRef(homeData);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [content, setContent] = useState(homeDataRef.current);
  const [editContent, setEditContent] = useState(content);
  //useState to refresh component when content is changed
  const [refresh, setRefresh] = useState(false);

  const navigate = useNavigate();

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
      onClick={toggleEditing}
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
      onClick={toggleEditing}
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
            id="section1File"
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

  //section two is has the same layout as section one
  const sectionTwo = (
    <Section
      title={"Section 2"}
      onClick={toggleEditing}
      isEditing={isEditing}
      onSubmit={submitEditHandler}
    >
      <InputField
        label="Title"
        value={!isEditing ? content.section2.title : editContent.section2.title}
        readOnly={!isEditing}
        onChange={(e) => {
          setEditContent({
            ...editContent,
            section2: {
              ...editContent.section2,
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
                ? content.section2.description
                : editContent.section2.description
            }
            className="resize-none overflow-y-scroll h-40 w-full"
            onChange={(e) => {
              setEditContent({
                ...content,
                section2: {
                  ...content.section2,
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
            id="section2File"
            readOnly={!isEditing}
            preview={
              !isEditing
                ? content.section2.file.src
                : editContent.section2.file.src
            }
            fileType={
              !isEditing
                ? content.section2.file.type
                : editContent.section2.file.type
            }
            onChange={(e) => {
              setEditContent({
                ...editContent,
                section2: {
                  ...editContent.section2,
                  file: {
                    src: editContent.section2.file.src,
                    type: e.target.value as string,
                  },
                },
              });
            }}
            onFileChange={(e) => {
              setEditContent({
                ...editContent,
                section2: {
                  ...editContent.section2,
                  file: {
                    src: URL.createObjectURL(e.target.files![0]),
                    type: editContent.section2.file.type,
                  },
                },
              });
            }}
          />
        </div>
      </div>
    </Section>
  );

  const solutions = (
    <Section
      title={"Solutions"}
      isEditing={isEditing}
      onClick={toggleEditing}
      onSubmit={submitEditHandler}
    >
      <div className="flex flex-col gap-5">
        <div>
          <InputField
            label="Title"
            value={
              !isEditing ? content.solutions.title : editContent.solutions.title
            }
            readOnly={!isEditing}
            onChange={(e) => {
              setEditContent({
                ...editContent,
                solutions: {
                  ...editContent.solutions,
                  title: e.target.value,
                },
              });
            }}
          />
        </div>
        <div>
          <TextArea
            label="Description"
            readOnly={!isEditing}
            value={
              !isEditing
                ? content.solutions.description
                : editContent.solutions.description
            }
            className="resize-none overflow-y-scroll h-40 w-1/2"
            onChange={(e) => {
              setEditContent({
                ...editContent,
                solutions: {
                  ...editContent.solutions,
                  description: e.target.value,
                },
              });
            }}
          />
        </div>
      </div>
    </Section>
  );

  const brands = (
    <Section
      title={"Brands"}
      onClick={toggleEditing}
      isEditing={isEditing}
      onSubmit={submitEditHandler}
    >
      <div className="flex flex-col gap-5">
        <div>
          <InputField
            label="Title"
            value={!isEditing ? content.brands.title : editContent.brands.title}
            readOnly={!isEditing}
            onChange={(e) => {
              setEditContent({
                ...editContent,
                brands: {
                  ...editContent.brands,
                  title: e.target.value,
                },
              });
            }}
          />
        </div>
        <div className="w-1/2">
          <FileInput
            label="Image"
            id="brandsImage"
            readOnly={!isEditing}
            preview={
              !isEditing ? content.brands.file.src : editContent.brands.file.src
            }
            fileType={
              !isEditing
                ? content.brands.file.type
                : editContent.brands.file.type
            }
            onChange={(e) => {
              setEditContent({
                ...editContent,
                brands: {
                  ...editContent.brands,
                  file: {
                    src: editContent.brands.file.src,
                    type: e.target.value as string,
                  },
                },
              });
            }}
            onFileChange={(e) => {
              setEditContent({
                ...editContent,
                brands: {
                  ...editContent.brands,
                  file: {
                    src: URL.createObjectURL(e.target.files![0]),
                    type: editContent.brands.file.type,
                  },
                },
              });
            }}
          />
        </div>
      </div>
    </Section>
  );

  const latestWork = (
    <Section
      title="Latest Work"
      onClick={toggleEditing}
      isEditing={isEditing}
      onSubmit={submitEditHandler}
    >
      <div className="flex flex-col gap-5">
        <InputField
          value={!isEditing ? content.latestWork : editContent.latestWork}
          readOnly={!isEditing}
          onChange={(e) => {
            setEditContent({
              ...editContent,
              latestWork: e.target.value,
            });
          }}
        ></InputField>
      </div>
    </Section>
  );

  //#region Table
  const dialog = useContext(DialogFormContext);
  const sidebar = useContext(SidebarContext);

  const projectColumns: ColumnDef<{
    id: string;
    title: string;
    image: string;
  }>[] = [
    {
      header: "Title",
      accessorKey: "title",
      cell: (info) => <p className="h-auto">{info.getValue() as string}</p>,
    },
    {
      header: "Image",
      accessorKey: "image",
      cell: (info) => (
        <div className="h-16 w-16 mx-auto">
          <img
            className="h-full w-full object-contain"
            src={info.getValue() as string}
            alt="project image"
          />
        </div>
      ),
    },
    {
      header: "Action",
      size: 1,
      cell: (info) => (
        <div className="flex gap-2 justify-center">
          <button
            onClick={() => {
              //navigate root to project page
              sidebar.setActiveItems(
                0,
                undefined,
                undefined,
                undefined,
                undefined,
                sidebar.navItemsStatus[2].id,
                sidebar.navItemsStatus[2].subNav![2].id,
              );
              navigate(`/project/${info.row.original.id}`, {
                state: { fromDashboard: true },
              });
            }}
          >
            <img src={icons.edit.blue} className="h-6 w-6" />
          </button>
          <button
            onClick={(e) => {
              let id = info.row.original.id;
              let newerContent = {
                ...homeDataRef.current,
                projects: content.projects.filter(
                  (project) => project.id !== id,
                ),
              };
              setContent((prev) => {
                let newContent = { ...prev };
                newContent.projects = newContent.projects.filter(
                  (project) => project.id !== id,
                );
                console.log(newContent);
                return newContent;
              });
              deleteHomeProject(id);
            }}
          >
            <img src={icons.delete.blue} className="h-6 w-6" />
          </button>
        </div>
      ),
    },
  ];

  const addProjectHandler = () => {
    let project = getProject()[0].value;

    const confirmHandler = () => {
      setContent({
        ...content,
        projects: [
          ...content.projects,
          {
            id: project.id,
            title: project.title,
            image: project.file.src,
          },
        ],
      });
    };

    const inputElement = (
      <DialogSelect
        label="Project"
        options={getProject()}
        onChange={(option) => {
          project = option.value;
        }}
      />
    );

    dialog.createDialog("Add Project", inputElement, confirmHandler, () => {});
  };

  const projectTable = (
    <Section title={"Select Project"} onClick={addProjectHandler} type="add">
      <TableBase data={content.projects} columns={projectColumns} />
    </Section>
  );

  //#endregion
  return (
    <>
      <Content>
        <Card>
          {sectionHero}
          {sectionOne}
          {sectionTwo}
          {solutions}
          {brands}
          {latestWork}
          {projectTable}
        </Card>
      </Content>
    </>
  );
};

export default Home;

import { info } from "console";
import { faker } from "@faker-js/faker";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  TableOptions,
  useReactTable,
} from "@tanstack/react-table";
import { getValue } from "@testing-library/user-event/dist/utils";
import React, { useContext, useEffect, useState } from "react";
import { getProject } from "../api/Project";
import Card from "../component/Card/Card";
import Content from "../component/Content/Content";
import DialogForm from "../component/Dialog/DialogFormContext";
import DialogFormContext from "../component/Dialog/DialogFormContext";
import DialogSelect from "../component/Dialog/DialogSelect";
import FileInput from "../component/Input/FileInput";
import InputField from "../component/Input/InputField";
import TextArea from "../component/Input/TextArea";
import Section from "../component/Section/Section";
import BottomPagination from "../component/Table/BottomPagination";
import GlobalFiltering from "../component/Table/GlobalFiltering";
import TableBase from "../component/Table/TableBase";
import homeData from "../model/MockData/homeData";

const Home = () => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [content, setContent] = useState(homeData);
  const [editContent, setEditContent] = useState(content);
  //useState to refresh component when content is changed
  const [refresh, setRefresh] = useState(false);

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

  const addProjectHandler = () => {
    const project = getProject()[0];

    const ProjectAddHandler = () => {
      //add selected project to content
      setContent({
        ...content,
        projects: [
          ...content.projects,
          {
            id: project.value.id,
            title: project.value.title,
            image: project.value.file.src,
          },
        ],
      });
      //close dialog
      dialog.toggleDialog();
    };

    const ProjectCancelHandler = () => {
      //close dialog
      dialog.toggleDialog();
    };

    const inputElement = (
      <DialogSelect
        label="Project"
        options={getProject()}
        value={project}
        onChange={(option) => {
          project.label = option?.label!;
          project.value = option?.value!;
        }}
      ></DialogSelect>
    );

    dialog.createDialog(
      "Add Project",
      project,
      inputElement,
      ProjectAddHandler,
      ProjectCancelHandler,
    );
  };

  useEffect(() => {
    if (dialog.data && dialog.isOpen) editProjectHandler(dialog.data as any);
  }, [dialog.data]);

  const editProjectHandler = (data: {
    id: string;
    title: string;
    image: string;
  }) => {
    console.log(dialog.data as typeof data);
    const submitEditHandler = () => {
      //edit selected project to content
      setContent({
        ...content,
        projects: [
          ...content.projects.filter(
            (project) => project.id !== (dialog.data as typeof data).id,
          ),
          dialog.data as typeof data,
        ],
      });

      //close dialog
      dialog.toggleDialog();
    };

    const cancelEditHandler = () => {
      //close dialog
      dialog.toggleDialog();
    };

    const inputElement = (
      <div className="flex flex-col gap-2 mb-4">
        <div>
          <InputField
            readOnly={true}
            label="Id"
            value={(dialog.data as typeof data).id}
          />
        </div>
        <div>
          <InputField
            label="Title"
            value={(dialog.data as typeof data).title}
            onChange={(e) => {
              dialog.setData({
                ...(dialog.data as typeof data),
                title: e.target.value,
              });
            }}
          />
        </div>
        <div>
          <FileInput
            label="Image"
            readOnly={false}
            preview={(dialog.data as typeof data).image}
            fileType={"image"}
            onFileChange={(e) => {
              dialog.setData({
                ...(dialog.data as typeof data),
                image: URL.createObjectURL(e.target.files![0]),
              });
            }}
          />
        </div>
      </div>
    );

    dialog.createDialog(
      "Edit Project",
      data,
      inputElement,
      submitEditHandler,
      cancelEditHandler,
    );
  };

  const projectTable = (
    <Section title={"Select Project"} onClick={addProjectHandler} type="add">
      <TableBase
        data={content.projects}
        onEdit={editProjectHandler}
        onDelete={(data) => {
          //deleteHandler(data);
        }}
      />
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

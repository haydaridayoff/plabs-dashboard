import { ColumnDef } from "@tanstack/react-table";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { clientsType, editClient, getClients } from "../api/Clients";
import { getProjects, projectType } from "../api/Project";
import icons from "../assets/icons/icons";
import Card from "../component/Card/Card";
import Content from "../component/Content/Content";
import DialogClient from "../component/Dialog/DialogClient";
import DialogFormContext from "../component/Dialog/DialogFormContext";
import DialogSelect from "../component/Dialog/DialogSelect";
import DialogValidation from "../component/Dialog/DialogValidation";
import FileInput from "../component/Input/FileInput";
import InputField from "../component/Input/InputField";
import TextArea from "../component/Input/TextArea";
import Section from "../component/Section/Section";
import SidebarContext from "../component/Sidebar/sidebar-context";
import TableBase from "../component/Table/TableBase";
import homeData, {
  addHomeClient,
  addHomeProject,
  deleteHomeClient,
  deleteHomeProject,
  editHomeClient,
} from "../model/MockData/homeData";

const Home = () => {
  const homeDataRef = React.useRef(homeData);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [content, setContent] = useState(homeDataRef.current);
  const [editContent, setEditContent] = useState(content);

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
      type="edit"
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
      type="edit"
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
      type="edit"
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
      type="edit"
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
      type="edit"
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
      type="edit"
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
      size: 300,
      cell: (info) => <p className="h-auto">{info.getValue() as string}</p>,
    },
    {
      header: "Image",
      accessorKey: "image",
      size: 300,
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
      size: 80,
      cell: (info) => (
        <div className="flex gap-2 h-24 justify-center">
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
              dialog.openDialog(
                DialogValidation({
                  title: "Delete Project",
                  message: "Are you sure you want to delete this project?",
                  onConfirm: () => {
                    let id = info.row.original.id;
                    deleteHomeProject(id);
                    setContent((prev) => {
                      let newContent = { ...prev };
                      newContent.projects = [...homeData.projects];
                      return newContent;
                    });
                  },
                }),
              );
            }}
          >
            <img src={icons.delete.blue} className="h-6 w-6" />
          </button>
        </div>
      ),
    },
  ];

  const addProjectHandler = () => {
    let project = {} as projectType;

    const confirmHandler = () => {
      addHomeProject({
        id: project.id,
        title: project.title,
        image: project.file.src,
      });
      setContent((prev) => {
        let newContent = { ...prev };
        newContent.projects = [...homeData.projects];
        return newContent;
      });
    };

    const inputElement: React.ReactNode = (
      <DialogSelect
        label="Project"
        title="Add Project"
        onSubmit={confirmHandler}
        selectInput={{
          options: getProjects().filter((project) => {
            return !content.projects.some(
              (contentProject) => contentProject.id === project.value.id,
            );
          }),
          onChange: (option) => {
            project = option?.value as projectType;
          },
        }}
      />
    );

    dialog.openDialog(inputElement);
  };

  const projectTable = (
    <Section title={"Select Project"} onClick={addProjectHandler} type="add">
      <TableBase data={content.projects} columns={projectColumns} />
    </Section>
  );

  const clientColumns: ColumnDef<(typeof content.clients)[0]>[] = [
    {
      header: "Name",
      size: 300,
      accessorKey: "name",
      cell: (info) => <p className="h-auto">{info.getValue() as string}</p>,
    },
    {
      header: "Image",
      accessorKey: "image",
      size: 300,
      cell: (info) => (
        <div className="h-16 w-16 mx-auto">
          <img
            className="h-full w-full object-contain"
            src={info.getValue() as string}
            alt="client image"
          />
        </div>
      ),
    },
    {
      header: "Action",
      size: 80,
      cell: (info) => (
        <div className="flex gap-2 h-24 justify-center">
          <button onClick={() => editClientHandler(info.row.original.id)}>
            <img src={icons.edit.blue} className="h-6 w-6" />
          </button>
          <button onClick={() => deleteClientHandler(info.row.original.id)}>
            <img src={icons.delete.blue} className="h-6 w-6" />
          </button>
        </div>
      ),
    },
  ];

  const deleteClientHandler = (id: string) => {
    const confirmHandler = () => {
      deleteHomeClient(id);
      setContent({
        ...content,
        clients: content.clients.filter((client) => client.id !== id),
      });
    };

    const InputElement: React.ReactNode = (
      <DialogValidation
        title="Delete Client"
        message="Are you sure you want to delete this client?"
        onConfirm={confirmHandler}
      />
    );

    dialog.openDialog(InputElement);
  };

  const editClientHandler = (id: string) => {
    let client = getClients().find((client) => client.value.id === id);

    const confirmHandler = (client: clientsType) => {
      console.log(client);
      editHomeClient(client.id, {
        name: client.name,
        image: client.file.src,
      });

      editClient(id, client);

      setContent({
        ...content,
        clients: content.clients.map((item) => {
          if (item.id === id) {
            return {
              ...item,
              name: client.name,
              image: client.file.src,
            };
          }
          return item;
        }),
      });
    };

    const inputElement: React.ReactNode = (
      <DialogClient
        userInput={{
          data: client!.value,
          onChangeName: (e) => {
            client!.value.name = e.target.value;
          },
          onChangeStatus: (option) => {
            client!.value.status = option?.value;
          },
          onChangeLogo: (e) => {
            client!.value.file.src = URL.createObjectURL(e.target.files![0]);
          },
        }}
        onSubmit={confirmHandler}
        title="Edit Client"
      />
    );

    dialog.openDialog(inputElement);
  };

  const addClientHandler = () => {
    const confirmHandler = (client: clientsType) => {
      addHomeClient({
        id: client.id,
        name: client.name,
        image: client.file.src,
      });

      setContent((prev) => {
        let newContent = { ...prev };
        newContent.clients = [...homeData.clients];
        return newContent;
      });
    };

    const inputElement: React.ReactNode = (
      <DialogSelect
        label="Client"
        title="Create New Select Client"
        onSubmit={confirmHandler}
        selectInput={{
          options: getClients().filter((client) => {
            return !content.clients.some(
              (contentClient) => contentClient.id === client.value.id,
            );
          }),
        }}
      />
    );

    dialog.openDialog(inputElement);
  };

  const clientTable = (
    <Section
      title={"Select Client"}
      onClick={addClientHandler}
      type="add"
      isLast
    >
      <TableBase data={content.clients} columns={clientColumns} />
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
          {clientTable}
        </Card>
      </Content>
    </>
  );
};

export default Home;

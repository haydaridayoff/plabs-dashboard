import { ColumnDef } from "@tanstack/react-table";
import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { isTemplateLiteralTypeSpan } from "typescript";
import { deleteProject, getProjects, projectType } from "../api/Project";
import { getService } from "../api/Service";
import icons from "../assets/icons/icons";
import DialogFormContext from "../component/Dialog/DialogFormContext";
import DialogValidation from "../component/Dialog/DialogValidation";
import Section from "../component/Section/Section";
import TableBase from "../component/Table/TableBase";

const ProjectDashboard: React.FC = () => {
  const [content, setContent] = useState(
    getProjects().map((item) => item.value),
  );

  const navigator = useNavigate();

  const projectColumnDefs: ColumnDef<projectType>[] = [
    {
      header: "Title",
      size: 200,
      accessorKey: "title",
      cell: (info) => <p className="h-auto">{info.getValue() as string}</p>,
    },
    {
      header: "Subtitle",
      accessorKey: "subtitle",
      size: 300,
      cell: (info) => (
        <p className="h-24 line-clamp-4 overflow-hidden">
          {info.getValue() as string}
        </p>
      ),
    },
    {
      header: "Service",
      size: 200,
      accessorKey: "service.title",
      cell: (info) => <p className="h-auto">{info.getValue() as string}</p>,
    },
    {
      header: "Action",
      size: 80,
      cell: (info) => (
        <div className="flex justify-center gap-2 h-24">
          <button
            onClick={(e) => {
              editProject(info.row.original);
            }}
          >
            <img src={icons.edit.blue} className="h-6 w-6" />
          </button>
          <button onClick={(e) => deleteProjectHandler(info.row.original)}>
            <img src={icons.delete.blue} className="h-6 w-6" />
          </button>
        </div>
      ),
    },
  ];

  const editProject = (project: projectType) => {
    navigator(`/project/${project.id}`);
  };

  const dialog = useContext(DialogFormContext);

  const deleteProjectHandler = (project: projectType) => {
    const inputElement = (
      <DialogValidation
        title="Delete Project"
        message="Are you sure you want to delete this project?"
        onConfirm={() => {
          deleteProject(project.id);
          setContent([...getProjects().map((item) => item.value)]);
        }}
      />
    );

    dialog.openDialog(inputElement);
  };

  return (
    <>
      <Section
        title="Project"
        type="add"
        onClick={() => {
          navigator("/project/create", { state: { fromDashboard: true } });
        }}
        isLast
      >
        <TableBase data={content} columns={projectColumnDefs}></TableBase>
      </Section>
    </>
  );
};

export default ProjectDashboard;

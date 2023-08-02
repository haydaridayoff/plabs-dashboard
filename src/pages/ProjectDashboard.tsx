import { ColumnDef } from "@tanstack/react-table";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { isTemplateLiteralTypeSpan } from "typescript";
import { getProjects, projectType } from "../api/Project";
import { getService } from "../api/Service";
import icons from "../assets/icons/icons";
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
          <button>
            <img src={icons.edit.blue} className="h-6 w-6" />
          </button>
          <button>
            <img src={icons.delete.blue} className="h-6 w-6" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <>
      <Section
        title="Project"
        type="add"
        onClick={() => {
          //navigate back to root
          navigator("/project/create", { state: { fromDashboard: true } });
        }}
      >
        <TableBase data={content} columns={projectColumnDefs}></TableBase>
      </Section>
    </>
  );
};

export default ProjectDashboard;

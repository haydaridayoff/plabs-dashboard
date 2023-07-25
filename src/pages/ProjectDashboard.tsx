import { ColumnDef } from "@tanstack/react-table";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { isTemplateLiteralTypeSpan } from "typescript";
import { getProject } from "../api/Project";
import { getService } from "../api/Service";
import icons from "../assets/icons/icons";
import Section from "../component/Section/Section";
import TableBase from "../component/Table/TableBase";

const ProjectDashboard: React.FC = () => {
  const [content, setContent] = useState(
    getProject().map((item) => item.value),
  );

  const navigator = useNavigate();

  const projectColumnDefs: ColumnDef<typeof content>[] = [
    {
      header: "Title",
      size: 500,
      accessorKey: "title",
      cell: (info) => (
        <span className="h-16 text-ellipsis overflow-hidden max-w-xs">
          {info.getValue() as string}
        </span>
      ),
    },
    {
      header: "SubTitle",
      size: 500,
      accessorKey: "subTitle",
      cell: (info) => (
        <span className="h-16 text-ellipsis overflow-hidden max-w-xs">
          {info.getValue() as string}
        </span>
      ),
    },
    {
      header: "Service",
      size: 500,
      accessorKey: "service",
      cell: (info) => (
        <span className="h-16 text-ellipsis overflow-hidden max-w-xs">
          {info.getValue() as string}
        </span>
      ),
    },
    {
      header: "Action",
      size: 1,
      cell: (info) => (
        <div className="flex justify-center gap-2">
          <button>
            <img src={icons.info.blue} className="h-6 w-6" />
          </button>
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
        title="Service"
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

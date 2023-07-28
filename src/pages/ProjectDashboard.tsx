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
      size: 300,
      accessorKey: "title",
      cell: (info) => (
        <p className="h-auto truncate">{info.getValue() as string}</p>
      ),
    },
    {
      header: "SubTitle",
      size: 300,
      accessorKey: "subTitle",
      cell: (info) => (
        <p
          className="min-h-[4.75rem] max-h-[4.75rem]  line-clamp-3 overflow-hidden"
          // {...{
          //   style: {
          //     width: "200px",
          //     height: "40px",
          //     lineHeight: "20px",
          //     display: "-webkit-box",
          //     WebkitLineClamp: 2,
          //     lineClamp: 2,
          //     WebkitBoxOrient: "vertical",
          //     overflow: "hidden",
          //   },
          // }}
        >
          {info.getValue() as string}
        </p>
      ),
    },
    {
      header: "Service",
      size: 300,

      accessorKey: "service",
      cell: (info) => <p className="h-auto">{info.getValue() as string}</p>,
    },
    {
      header: "Action",
      size: 100,
      cell: (info) => (
        <div className="flex justify-center gap-2 h-auto">
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

import { ColumnDef } from "@tanstack/react-table";
import React, { useState } from "react";
import { isTemplateLiteralTypeSpan } from "typescript";
import { getService } from "../api/Service";
import icons from "../assets/icons/icons";
import Card from "../component/Card/Card";
import Content from "../component/Content/Content";
import Section from "../component/Section/Section";
import { SidebarContextProvider } from "../component/Sidebar/sidebar-context";
import TableBase from "../component/Table/TableBase";
import Topbar from "../component/Topbar/Topbar";

const Service: React.FC = () => {
  const [content, setContent] = useState(
    getService().map((item) => item.value),
  );

  const serviceColumnDefs: ColumnDef<typeof content>[] = [
    {
      header: "title",
      size: 400,
      accessorKey: "title",
      cell: (info) => (
        <span className="h-16 text-ellipsis overflow-hidden max-w-xs">
          {info.getValue() as string}
        </span>
      ),
    },
    {
      header: "description",
      size: 500,
      accessorKey: "description",
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
      <Content>
        <Card>
          <Section title="Service" type="add">
            <TableBase data={content} columns={serviceColumnDefs}></TableBase>
          </Section>
        </Card>
      </Content>
    </>
  );
};

export default Service;

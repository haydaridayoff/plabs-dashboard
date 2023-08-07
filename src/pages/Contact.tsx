import { ColumnDef } from "@tanstack/react-table";
import React from "react";
import { contactType, getContact } from "../api/Contact";
import icons from "../assets/icons/icons";
import Card from "../component/Card/Card";
import Content from "../component/Content/Content";
import Section from "../component/Section/Section";
import TableBase from "../component/Table/TableBase";

const Contact: React.FC = () => {
  const contactColumnDefs: ColumnDef<contactType>[] = [
    {
      header: "Date",
      size: 100,
      accessorKey: "date",
      cell: (info) => (
        <p className="h-auto break-words">
          {(info.getValue() as Date).toLocaleDateString("id-ID")}
        </p>
      ),
    },
    {
      header: "Name",
      size: 100,
      accessorKey: "name",
      cell: (info) => (
        <p className="h-auto text-ellipsis truncate overflow-hidden">
          {(info.getValue() as string) !== ("" || undefined)
            ? (info.getValue() as string)
            : "-"}
        </p>
      ),
    },
    {
      header: "Email",
      size: 100,
      accessorKey: "email",
      cell: (info) => (
        <p className="h-auto truncate text-ellipsis overflow-hidden">
          {info.getValue() as string}
        </p>
      ),
    },
    {
      header: "Message",
      size: 400,
      accessorKey: "message",
      cell: (info) => (
        <p className="h-24 text-ellipsis overflow-hidden line-clamp-4">
          {info.getValue() as string}
        </p>
      ),
    },
    {
      header: "Action",
      size: 80,
      cell: () => (
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
      <Content>
        <Card>
          <Section title="Contact" type="add" isLast>
            <TableBase
              columns={contactColumnDefs}
              data={getContact().map((item) => item.value)}
            />
          </Section>
        </Card>
      </Content>
    </>
  );
};

export default Contact;

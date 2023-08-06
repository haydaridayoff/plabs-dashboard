import { ColumnDef } from "@tanstack/react-table";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import icons from "../assets/icons/icons";
import Section from "../component/Section/Section";
import TableBase from "../component/Table/TableBase";
import { peopleTabData } from "../model/MockData/AboutData";

const AboutPeople: React.FC = () => {
  const [content, setContent] = useState(peopleTabData);

  const navigator = useNavigate();

  const columnDefPeople: ColumnDef<typeof content>[] = [
    {
      header: "Name",
      accessorKey: "name",
      cell: (info) => <p className="h-auto">{info.getValue() as string}</p>,
    },
    {
      header: "Occupation",
      accessorKey: "occupation",
      cell: (info) => <p className="h-auto">{info.getValue() as string}</p>,
    },
    {
      header: "Image",
      accessorKey: "image",
      cell: (info) => (
        <img src={info.getValue() as string} className="h-16 w-16 mx-auto" />
      ),
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
      <Section title="Partner" type="add" isLast>
        <TableBase data={content} columns={columnDefPeople}></TableBase>
      </Section>
    </>
  );
};

export default AboutPeople;

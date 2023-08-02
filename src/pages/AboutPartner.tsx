import { ColumnDef } from "@tanstack/react-table";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPartner } from "../api/Partner";
import icons from "../assets/icons/icons";
import Section from "../component/Section/Section";
import TableBase from "../component/Table/TableBase";
import { partnerTabData } from "../model/MockData/AboutData";

const AboutPartner: React.FC = () => {
  const [content, setContent] = useState(partnerTabData);

  const navigator = useNavigate();

  const columnDefPartners: ColumnDef<typeof content>[] = [
    {
      header: "Name",
      size: 300,
      accessorKey: "name",
      cell: (info) => <p className="h-auto">{info.getValue() as string}</p>,
    },
    {
      header: "Image",
      size: 300,
      accessorKey: "image",
      cell: (info) => (
        <img src={info.getValue() as string} className="h-16 w-16 mx-auto" />
      ),
    },
    {
      header: "Action",
      size: 100,
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
      <Section title="Partner" type="add">
        <TableBase data={content} columns={columnDefPartners}></TableBase>
      </Section>
    </>
  );
};

export default AboutPartner;

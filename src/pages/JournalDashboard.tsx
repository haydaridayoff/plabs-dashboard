import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import {
  getJournals,
  journalData,
  journalDataType,
  journalType,
} from "../api/Journal";
import icons from "../assets/icons/icons";
import InputField from "../component/Input/InputField";
import Section from "../component/Section/Section";
import TableBase from "../component/Table/TableBase";

const journalColumnDefs: ColumnDef<journalType>[] = [
  {
    header: "Title",
    size: 200,
    accessorKey: "title",
    cell: (info) => <p className="h-auto">{info.getValue() as string}</p>,
  },
  {
    header: "Subtitle",
    size: 200,
    accessorKey: "subtitle",
    cell: (info) => <p className="h-auto">{info.getValue() as string}</p>,
  },
  {
    header: "Image",
    size: 200,
    accessorKey: "image",
    cell: (info) => (
      <div className="h-16 w-16">
        <img
          src={info.getValue() as string}
          className="object-cover h-full w-auto"
          alt=""
        />
      </div>
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

const JournalDashboard: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState<journalDataType>(journalData);
  const [editContent, setEditContent] = useState<journalDataType>(content);

  const toggleIsEditing = () => {
    setIsEditing((prev) => !prev);
    setEditContent(content);
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setContent(editContent);
    toggleIsEditing();
  };

  return (
    <>
      <Section title="Client" type="add">
        <TableBase
          data={getJournals().map((item) => item.value)}
          columns={journalColumnDefs}
        ></TableBase>
      </Section>
      <Section
        title="Hero"
        type="edit"
        isEditing={isEditing}
        onClick={toggleIsEditing}
        onSubmit={submitHandler}
        isLast
      >
        <InputField
          value={isEditing ? editContent.hero : content.hero}
          onChange={(e) => {
            setEditContent((prev) => ({ ...prev, hero: e.target.value }));
          }}
          readOnly={!isEditing}
        />
      </Section>
    </>
  );
};

export default JournalDashboard;

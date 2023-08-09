import { ColumnDef } from "@tanstack/react-table";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  createBlankPerson,
  createPerson,
  deletePerson,
  editPerson,
  getPersonById,
} from "../api/People";
import icons from "../assets/icons/icons";
import DialogFormContext from "../component/Dialog/DialogFormContext";
import DialogPeople from "../component/Dialog/DialogPeople";
import DialogValidation from "../component/Dialog/DialogValidation";
import Section from "../component/Section/Section";
import TableBase from "../component/Table/TableBase";
import {
  addPeopleTabData,
  deletePeopleTabData,
  peopleTabData,
  peopleTabType,
  updatePeopleTabData,
} from "../model/MockData/AboutData";

const AboutPeople: React.FC = () => {
  const [content, setContent] = useState(peopleTabData);

  const navigator = useNavigate();

  const columnDefPeople: ColumnDef<peopleTabType>[] = [
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
          <button onClick={(e) => editPeopleHandler(info.row.original)}>
            <img src={icons.edit.blue} className="h-6 w-6" />
          </button>
          <button onClick={(e) => deletePeopleHandler(info.row.original)}>
            <img src={icons.delete.blue} className="h-6 w-6" />
          </button>
        </div>
      ),
    },
  ];

  const dialog = useContext(DialogFormContext);

  const addPeopleHandler = () => {
    const inputElement = (
      <DialogPeople
        data={createBlankPerson()}
        title="Create New People"
        onSubmit={(data) => {
          addPeopleTabData(createPerson(data));
          setContent([...peopleTabData]);
        }}
      />
    );

    dialog.openDialog(inputElement);
  };

  const editPeopleHandler = (data: peopleTabType) => {
    const person = getPersonById(data.id);
    if (!person) return;

    const inputElement = (
      <DialogPeople
        data={person}
        title="Edit People"
        onSubmit={(data) => {
          editPerson(data.id, data);
          updatePeopleTabData(data);
          setContent([...peopleTabData]);
        }}
      />
    );

    dialog.openDialog(inputElement);
  };

  const deletePeopleHandler = (data: peopleTabType) => {
    const inputElement = (
      <DialogValidation
        title="Delete People"
        message="Are you sure you want to delete this people?"
        onConfirm={() => {
          deletePerson(data.id);
          deletePeopleTabData(data.id);
          setContent([...peopleTabData]);
        }}
      />
    );

    dialog.openDialog(inputElement);
  };

  return (
    <>
      <Section title="Partner" type="add" onClick={addPeopleHandler} isLast>
        <TableBase data={content} columns={columnDefPeople}></TableBase>
      </Section>
    </>
  );
};

export default AboutPeople;

import { ColumnDef } from "@tanstack/react-table";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getEcosystemById,
  getEcosystems,
  updateEcosystem,
} from "../api/Ecosystem";
import icons from "../assets/icons/icons";
import DialogEcosystem from "../component/Dialog/DialogEcosystem";
import DialogFormContext from "../component/Dialog/DialogFormContext";
import DialogSelect from "../component/Dialog/DialogSelect";
import DialogValidation from "../component/Dialog/DialogValidation";
import Section from "../component/Section/Section";
import TableBase from "../component/Table/TableBase";
import {
  addEcosystemTabData,
  deleteEcosystemTabData,
  ecosystemTabData,
  ecosystemTabType,
  updateEcosystemTabData,
} from "../model/MockData/AboutData";

const AboutEcosystem: React.FC = () => {
  const [content, setContent] = useState(ecosystemTabData);

  const navigator = useNavigate();

  const ecosystemColumnDefs: ColumnDef<ecosystemTabType>[] = [
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
        <div className="h-16 w-16 mx-auto">
          <img
            src={info.getValue() as string}
            className="h-full w-auto object-contain"
          />
        </div>
      ),
    },
    {
      header: "Action",
      size: 100,
      cell: (info) => (
        <div className="flex justify-center gap-2 h-24">
          <button onClick={(e) => editEcosystemHandler(info.row.original)}>
            <img src={icons.edit.blue} className="h-6 w-6" />
          </button>
          <button onClick={(e) => deleteEcosystemHandler(info.row.original)}>
            <img src={icons.delete.blue} className="h-6 w-6" />
          </button>
        </div>
      ),
    },
  ];

  const dialog = useContext(DialogFormContext);

  const addEcosystem = () => {
    const inputElement = (
      <DialogSelect
        title="Create New Select Ecosystem"
        label="Ecosystem"
        selectInput={{
          options: getEcosystems().filter(
            (item) => !content.some((item2) => item2.id === item.value.id),
          ),
        }}
        onSubmit={(data) => {
          addEcosystemTabData(data);
          setContent([...ecosystemTabData]);
        }}
      />
    );

    dialog.openDialog(inputElement);
  };

  const editEcosystemHandler = (data: ecosystemTabType) => {
    const ecoData = getEcosystemById(data.id)?.value;
    if (!ecoData) return;

    const inputElement = (
      <DialogEcosystem
        data={ecoData}
        title="Edit Ecosystem"
        onSubmit={(item) => {
          updateEcosystem(item);
          updateEcosystemTabData(item);
          setContent([...ecosystemTabData]);
        }}
      />
    );

    dialog.openDialog(inputElement);
  };

  const deleteEcosystemHandler = (data: ecosystemTabType) => {
    const inputElement = (
      <DialogValidation
        title="Delete Ecosystem"
        message="Are you sure you want to delete this ecosystem?"
        onConfirm={() => {
          deleteEcosystemTabData(data.id);
          setContent([...ecosystemTabData]);
        }}
      />
    );

    dialog.openDialog(inputElement);
  };

  return (
    <>
      <Section title="Service" type="add" onClick={addEcosystem} isLast>
        <TableBase data={content} columns={ecosystemColumnDefs}></TableBase>
      </Section>
    </>
  );
};

export default AboutEcosystem;

import { ColumnDef } from "@tanstack/react-table";
import { useContext, useState } from "react";
import {
  createEcosystem,
  deleteEcosystem,
  ecosystemType,
  getEcosystems,
  updateEcosystem,
} from "../api/Ecosystem";
import icons from "../assets/icons/icons";
import DialogEcosystem from "../component/Dialog/DialogEcosystem";
import DialogFormContext from "../component/Dialog/DialogFormContext";
import DialogValidation from "../component/Dialog/DialogValidation";
import Section from "../component/Section/Section";
import TableBase from "../component/Table/TableBase";

const EcosystemEcosystem: React.FC = () => {
  const ecosystemColumnDefs: ColumnDef<ecosystemType>[] = [
    {
      header: "Name",
      size: 200,
      accessorKey: "name",
      cell: (info) => <p className="h-auto">{info.getValue() as string}</p>,
    },
    {
      header: "Image",
      size: 200,
      accessorKey: "file.src",
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

  const [content, setContent] = useState(
    getEcosystems().map((item) => item.value),
  );
  const dialog = useContext(DialogFormContext);

  const addEcosystemHandler = () => {
    const inputElement = (
      <DialogEcosystem
        title="Create New Ecosystem"
        onSubmit={(data) => {
          createEcosystem(data);
          setContent(getEcosystems().map((item) => item.value));
        }}
      />
    );

    dialog.openDialog(inputElement);
  };

  const editEcosystemHandler = (data: ecosystemType) => {
    const inputElement = (
      <DialogEcosystem
        title="Edit Ecosystem"
        data={data}
        onSubmit={(item) => {
          updateEcosystem(item);
          setContent(getEcosystems().map((item) => item.value));
        }}
      />
    );

    dialog.openDialog(inputElement);
  };

  const deleteEcosystemHandler = (data: ecosystemType) => {
    const inputElement = (
      <DialogValidation
        title="Delete Ecosystem"
        message="Are you sure you want to delete this ecosystem?"
        onConfirm={() => {
          deleteEcosystem(data.id);
          setContent(getEcosystems().map((item) => item.value));
        }}
      />
    );

    dialog.openDialog(inputElement);
  };

  return (
    <>
      <Section
        title="Ecosystem"
        type="add"
        onClick={addEcosystemHandler}
        isLast
      >
        <TableBase data={content} columns={ecosystemColumnDefs}></TableBase>
      </Section>
    </>
  );
};

export default EcosystemEcosystem;

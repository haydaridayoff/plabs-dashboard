import { ColumnDef } from "@tanstack/react-table";
import { useContext, useState } from "react";
import {
  createPartner,
  deletePartner,
  getPartner,
  partnerType,
  updatePartner,
} from "../api/Partner";
import icons from "../assets/icons/icons";
import DialogFormContext from "../component/Dialog/DialogFormContext";
import DialogPartner from "../component/Dialog/DialogPartner";
import DialogValidation from "../component/Dialog/DialogValidation";
import Section from "../component/Section/Section";
import TableBase from "../component/Table/TableBase";

const EcosystemPartner: React.FC = () => {
  const partnerColumnDefs: ColumnDef<partnerType>[] = [
    {
      header: "Name",
      size: 200,
      accessorKey: "name",
      cell: (info) => <p className="h-auto">{info.getValue() as string}</p>,
    },
    {
      header: "Image",
      size: 200,
      accessorKey: "logo.src",
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
          <button onClick={(e) => editPartnerHandler(info.row.original)}>
            <img src={icons.edit.blue} className="h-6 w-6" />
          </button>
          <button onClick={(e) => deletePartnerHandler(info.row.original)}>
            <img src={icons.delete.blue} className="h-6 w-6" />
          </button>
        </div>
      ),
    },
  ];

  const [content, setContent] = useState(
    getPartner().map((item) => item.value),
  );

  const dialog = useContext(DialogFormContext);

  const addPartnerHandler = () => {
    const inputElement = (
      <DialogPartner
        title="Create New Partner"
        onSubmit={(data) => {
          createPartner(data);
          setContent(getPartner().map((item) => item.value));
        }}
      />
    );

    dialog.openDialog(inputElement);
  };

  const editPartnerHandler = (data: partnerType) => {
    const inputElement = (
      <DialogPartner
        title="Edit Partner"
        data={data}
        onSubmit={(data) => {
          updatePartner(data);
          setContent(getPartner().map((item) => item.value));
        }}
      />
    );

    dialog.openDialog(inputElement);
  };

  const deletePartnerHandler = (data: partnerType) => {
    const inputElement = (
      <DialogValidation
        title="Delete Partner"
        message="Are you sure you want to delete this partner?"
        onConfirm={() => {
          deletePartner(data.id);
          setContent(getPartner().map((item) => item.value));
        }}
      />
    );

    dialog.openDialog(inputElement);
  };

  return (
    <>
      <Section title="Partner" type="add" onClick={addPartnerHandler} isLast>
        <TableBase data={content} columns={partnerColumnDefs}></TableBase>
      </Section>
    </>
  );
};

export default EcosystemPartner;

import { ColumnDef } from "@tanstack/react-table";
import { useContext, useState } from "react";
import {
  clientsType,
  createClient,
  deleteClient,
  getClients,
  updateClient,
} from "../api/Clients";
import { getJobs, status as jobStatus, jobType } from "../api/Job";
import icons from "../assets/icons/icons";
import DialogClient from "../component/Dialog/DialogClient";
import DialogFormContext from "../component/Dialog/DialogFormContext";
import DialogValidation from "../component/Dialog/DialogValidation";
import Section from "../component/Section/Section";
import TableBase from "../component/Table/TableBase";

const EcosystemClient: React.FC = () => {
  const clientColumnDefs: ColumnDef<clientsType>[] = [
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
          <button onClick={(e) => editClientHandler(info.row.original)}>
            <img src={icons.edit.blue} className="h-6 w-6" />
          </button>
          <button onClick={(e) => deleteClientHandler(info.row.original)}>
            <img src={icons.delete.blue} className="h-6 w-6" />
          </button>
        </div>
      ),
    },
  ];

  const [content, setContent] = useState(
    getClients().map((item) => item.value),
  );

  const dialog = useContext(DialogFormContext);

  const addClientHandler = () => {
    const inputElement = (
      <DialogClient
        title="Create New Client"
        onSubmit={(data) => {
          createClient(data);
          setContent(getClients().map((item) => item.value));
        }}
      />
    );
    dialog.openDialog(inputElement);
  };

  const editClientHandler = (data: clientsType) => {
    const inputElement = (
      <DialogClient
        title="Edit Client"
        onSubmit={(item) => {
          updateClient(item);
          setContent(getClients().map((item2) => item2.value));
        }}
        userInput={{
          data: data,
        }}
      />
    );

    dialog.openDialog(inputElement);
  };

  const deleteClientHandler = (data: clientsType) => {
    const inputElement = (
      <DialogValidation
        title="Delete Client"
        message="Are you sure want to delete this client?"
        onConfirm={() => {
          deleteClient(data.id);
          setContent(getClients().map((item) => item.value));
        }}
      />
    );

    dialog.openDialog(inputElement);
  };

  return (
    <>
      <Section title="Client" type="add" onClick={addClientHandler} isLast>
        <TableBase data={content} columns={clientColumnDefs}></TableBase>
      </Section>
    </>
  );
};

export default EcosystemClient;

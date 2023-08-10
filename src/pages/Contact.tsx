import { ColumnDef } from "@tanstack/react-table";
import React, { useContext, useState } from "react";
import {
  contactType,
  createContact,
  deleteContact,
  getContact,
  updateContact,
} from "../api/Contact";
import icons from "../assets/icons/icons";
import Card from "../component/Card/Card";
import Content from "../component/Content/Content";
import DialogContact from "../component/Dialog/DialogContact";
import DialogFormContext from "../component/Dialog/DialogFormContext";
import DialogValidation from "../component/Dialog/DialogValidation";
import Section from "../component/Section/Section";
import TableBase from "../component/Table/TableBase";

const Contact: React.FC = () => {
  const [content, setContent] = useState<contactType[]>(
    getContact().map((contact) => contact.value),
  );
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
      cell: (info) => (
        <div className="flex justify-center gap-2 h-24">
          <button onClick={(e) => editContactHandler(info.row.original)}>
            <img src={icons.edit.blue} className="h-6 w-6" />
          </button>
          <button onClick={(e) => deleteContactHandler(info.row.original)}>
            <img src={icons.delete.blue} className="h-6 w-6" />
          </button>
        </div>
      ),
    },
  ];

  const dialog = useContext(DialogFormContext);

  const editContactHandler = (data: contactType) => {
    const inputElement = (
      <DialogContact
        data={data}
        title="Edit Contact"
        onSubmit={(data) => {
          updateContact(data);
          setContent(getContact().map((contact) => contact.value));
        }}
      />
    );
    dialog.openDialog(inputElement);
  };

  const deleteContactHandler = (data: contactType) => {
    const inputElement = (
      <DialogValidation
        title="Delete Contact"
        message="Are you sure want to delete this contact?"
        onConfirm={() => {
          deleteContact(data.id);
          setContent(getContact().map((contact) => contact.value));
        }}
      />
    );

    dialog.openDialog(inputElement);
  };

  return (
    <>
      <Content>
        <Card>
          <Section title="Contact" type="None" isLast>
            <TableBase columns={contactColumnDefs} data={content} />
          </Section>
        </Card>
      </Content>
    </>
  );
};

export default Contact;

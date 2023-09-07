import { ColumnDef } from "@tanstack/react-table";
import React, { useContext, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import {
  contactType,
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
import PageLoader from "../component/Loader/PageLoader";
import Section from "../component/Section/Section";
import TableBase from "../component/Table/TableBase";
import {
  NotificationType,
  useNotification,
} from "../contexts/NotificationContext";
import {
  handleDeleteContact,
  handleGetAllContact,
} from "../handlers/contactHandler";
import { ErrorDetails } from "../utils/errorHandler";

const Contact: React.FC = () => {
  const [content, setContent] = useState<contactType[]>([]);
  const [isShowPageLoader, setIsShowPageLoader] = useState(false);

  const dialog = useContext(DialogFormContext);
  const { addNotification } = useNotification();

  useEffect(() => {
    getAllContacts();
  }, []);

  const getAllContacts = async () => {
    setIsShowPageLoader(true);
    try {
      const response = await handleGetAllContact();
      const contacts: contactType[] = response.data.map((contact) => {
        return {
          id: contact.guid,
          name: contact.name,
          date: new Date(contact.date),
          email: contact.email,
          message: contact.messages,
        };
      });
      setContent(contacts);
    } catch (errorDetails) {
      addNotification({
        type: NotificationType.ERROR,
        message: (errorDetails as ErrorDetails).errorMessage,
      });
    }
    setIsShowPageLoader(false);
  };

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
        onConfirm={async () => {
          setIsShowPageLoader(true);
          try {
            const response = await handleDeleteContact(data.id);
            const contacts: contactType[] = response.data.map((contact) => {
              return {
                id: contact.guid,
                name: contact.name,
                date: new Date(contact.date),
                email: contact.email,
                message: contact.messages,
              };
            });
            setContent(contacts);
          } catch (errorDetails) {
            addNotification({
              type: NotificationType.ERROR,
              message: (errorDetails as ErrorDetails).errorMessage,
            });
          }
          setIsShowPageLoader(false);
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
      {createPortal(PageLoader({ isShow: isShowPageLoader }), document.body)}
    </>
  );
};

export default Contact;

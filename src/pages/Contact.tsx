import { ColumnDef } from "@tanstack/react-table";
import React, { useContext, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import toast from "react-hot-toast";
import { contactType } from "../api/Contact";
import icons from "../assets/icons/icons";
import Card from "../component/Card/Card";
import Content from "../component/Content/Content";
import DialogContact from "../component/Dialog/DialogContact";
import DialogFormContext from "../component/Dialog/DialogFormContext";
import DialogValidation from "../component/Dialog/DialogValidation";
import PageLoader from "../component/Loader/PageLoader";
import Section from "../component/Section/Section";
import TableBase from "../component/Table/TableBase";
import { usePagination } from "../contexts/usePagination";
import {
  handleDeleteContact,
  handleGetAllContact,
  handleUpdateContact,
} from "../handlers/contactHandler";
import { ErrorDetails } from "../utils/errorHandler";

const Contact: React.FC = () => {
  const [content, setContent] = useState<contactType[]>([]);
  const [isShowPageLoader, setIsShowPageLoader] = useState(false);

  const dialog = useContext(DialogFormContext);
  const {
    limit,
    page,
    totalData,
    totalPage,
    setLimit,
    setPage,
    setTotalData,
    setTotalPage,
    nextPage,
    prevPage,
  } = usePagination(1, 5, 0, 0);

  useEffect(() => {
    let isCancel = false;
    const controller = new AbortController();
    const signal = controller.signal;
    const promise = handleGetAllContact(limit, page, signal);
    const toastLoader = toast.loading("Loading to fetch contact data...", {
      position: "top-right",
    });
    promise
      .then((response) => {
        if (isCancel) {
          return;
        }
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
        setTotalData(response.paginate.total_data);
        setTotalPage(response.paginate.total_page);
      })
      .catch((errorDetails) => {
        toast.error((errorDetails as ErrorDetails).errorMessage, {
          position: "top-right",
        });
      })
      .finally(() => {
        toast.dismiss(toastLoader);
      });
    return () => {
      isCancel = true;
      toast.remove();
      controller.abort();
    };
  }, [limit, page]);

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
        <p className="text-ellipsis overflow-hidden line-clamp-4 break-all">
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
          setIsShowPageLoader(true);
          toast.promise(
            handleUpdateContact(
              data.id,
              {
                name: data.name,
                email: data.email,
                date: data.date.toISOString(),
                messages: data.message,
              },
              limit,
              page,
            ),
            {
              loading: "Loading...",
              success: (response) => {
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
                setIsShowPageLoader(false);
                return "Contact Updated";
              },
              error: (errorDetails) => {
                setIsShowPageLoader(false);
                return (errorDetails as ErrorDetails).errorMessage;
              },
            },
            {
              position: "top-right",
            },
          );
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
          toast.promise(
            handleDeleteContact(data.id, limit, page),
            {
              loading: "Loading...",
              success: (response) => {
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
                setTotalData(response.paginate.total_data);
                setTotalPage(response.paginate.total_page);
                setIsShowPageLoader(false);
                return "Contact Deleted";
              },
              error: (errorDetails) => {
                setIsShowPageLoader(false);
                return (errorDetails as ErrorDetails).errorMessage;
              },
            },
            {
              position: "top-right",
            },
          );
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
            <TableBase
              columns={contactColumnDefs}
              data={content}
              pagination={{
                currentPage: page,
                limit: limit,
                totalItem: totalData,
                totalPage: totalPage,
              }}
              onNextPage={nextPage}
              onPrevPage={prevPage}
              onGoToPage={(page) => setPage(page)}
              onPropsSizeChange={(event) => {
                setLimit(parseInt(event.target.value));
                setPage(1);
              }}
            />
          </Section>
        </Card>
      </Content>
      {createPortal(PageLoader({ isShow: isShowPageLoader }), document.body)}
    </>
  );
};

export default Contact;

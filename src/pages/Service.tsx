import { ColumnDef } from "@tanstack/react-table";
import React, { useContext, useEffect, useState } from "react";
import {
  createService,
  deleteService,
  getServices,
  serviceType,
  updateService,
} from "../api/Service";
import icons from "../assets/icons/icons";
import Card from "../component/Card/Card";
import Content from "../component/Content/Content";
import DialogFormContext from "../component/Dialog/DialogFormContext";
import DialogService, {
  getBlankService,
} from "../component/Dialog/DialogService";
import DialogValidation from "../component/Dialog/DialogValidation";
import Section from "../component/Section/Section";
import TableBase from "../component/Table/TableBase";
import {
  NotificationType,
  useNotification,
} from "../contexts/NotificationContext";
import { handleGetAllService } from "../handlers/serviceHandler";
import { ErrorDetails } from "../utils/errorHandler";

const Service: React.FC = () => {
  const [content, setContent] = useState<serviceType[]>([]);

  const { addNotification } = useNotification();

  useEffect(() => {
    getAllServiceHandler();
  }, []);

  const getAllServiceHandler = async () => {
    try {
      const response = await handleGetAllService();
      const services: serviceType[] = response.data.map((service) => {
        return {
          id: service.guid,
          title: service.title,
          description: service.description,
          category: "",
          file: {
            fileType: "image",
            fileSrc: service.file,
          },
        };
      });
      setContent(services);
    } catch (errorDetails) {
      addNotification({
        type: NotificationType.ERROR,
        message: (errorDetails as ErrorDetails).errorMessage,
      });
    }
  };

  const serviceColumnDefs: ColumnDef<serviceType>[] = [
    {
      header: "title",
      accessorKey: "title",
      size: 200,
      cell: (info) => (
        <span className="h-16 text-ellipsis overflow-hidden max-w-xs">
          {info.getValue() as string}
        </span>
      ),
    },
    {
      header: "description",
      accessorKey: "description",
      size: 300,
      cell: (info) => (
        <p className="h-24 text-ellipsis overflow-hidden">
          {info.getValue() as string}
        </p>
      ),
    },
    {
      header: "Action",
      size: 80,
      cell: (info) => (
        <div className="flex justify-center gap-2 h-24">
          <button>
            <img src={icons.info.blue} className="h-6 w-6" />
          </button>
          <button onClick={(e) => editService(info.row.original)}>
            <img src={icons.edit.blue} className="h-6 w-6" />
          </button>
          <button onClick={(e) => deleteServiceHandler(info.row.original)}>
            <img src={icons.delete.blue} className="h-6 w-6" />
          </button>
        </div>
      ),
    },
  ];

  const dialog = useContext(DialogFormContext);

  const editService = (data: serviceType) => {
    const inputElement = (
      <DialogService
        data={data}
        title="Edit Service"
        onSubmit={(item) => {
          updateService(item);
          setContent([...getServices().map((item) => item.value)]);
        }}
      />
    );

    dialog.openDialog(inputElement);
  };

  const addService = () => {
    const inputElement = (
      <DialogService
        title="Add Service"
        onSubmit={(item) => {
          createService(item);
          setContent([...getServices().map((item) => item.value)]);
        }}
        data={getBlankService()}
      />
    );

    dialog.openDialog(inputElement);
  };

  const deleteServiceHandler = (data: serviceType) => {
    const inputElement = (
      <DialogValidation
        title="Delete Service"
        message="Are you sure you want to delete this service?"
        onConfirm={() => {
          deleteService(data.id);
          setContent([...getServices().map((item) => item.value)]);
        }}
      />
    );

    dialog.openDialog(inputElement);
  };

  return (
    <>
      <Content>
        <Card>
          <Section title="Service" type="add" onClick={addService}>
            <TableBase data={content} columns={serviceColumnDefs}></TableBase>
          </Section>
        </Card>
      </Content>
    </>
  );
};

export default Service;

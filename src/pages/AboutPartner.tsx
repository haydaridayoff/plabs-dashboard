import { ColumnDef } from "@tanstack/react-table";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getPartner,
  getPartnerById,
  partnerType,
  updatePartner,
} from "../api/Partner";
import icons from "../assets/icons/icons";
import DialogFormContext from "../component/Dialog/DialogFormContext";
import DialogPartner from "../component/Dialog/DialogPartner";
import DialogSelect from "../component/Dialog/DialogSelect";
import DialogValidation from "../component/Dialog/DialogValidation";
import Section from "../component/Section/Section";
import TableBase from "../component/Table/TableBase";
import {
  addPartnerTabData,
  deletePartnerTabData,
  partnerTabData,
  partnerTabType,
  updatePartnerTabData,
} from "../model/MockData/AboutData";

const AboutPartner: React.FC = () => {
  const [content, setContent] = useState(partnerTabData);

  const navigator = useNavigate();

  const columnDefPartners: ColumnDef<partnerTabType>[] = [
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
            className="h-full w-auto object-cover mx-auto"
          />
        </div>
      ),
    },
    {
      header: "Action",
      size: 100,
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

  const dialog = useContext(DialogFormContext);

  const addPartnerHandler = () => {
    const inputElement = (
      <DialogSelect
        title="Create new Select Partner"
        label="Partner"
        onSubmit={(value) => {
          addPartnerTabData(value);
          setContent([...partnerTabData]);
        }}
        selectInput={{
          options: getPartner().filter(
            (item) => !content.some((item2) => item2.id === item.value.id),
          ),
        }}
      />
    );

    dialog.openDialog(inputElement);
  };

  const editPartnerHandler = (data: partnerTabType) => {
    // const partnerData = getPartnerById(data.id);
    // if (!partnerData) {
    //   return;
    // }
    // const inputElement = (
    //   <DialogPartner
    //     title="Edit Partner"
    //     data={partnerData}
    //     onSubmit={(value) => {
    //       updatePartner(value);
    //       updatePartnerTabData(value);
    //       setContent([...partnerTabData]);
    //     }}
    //   />
    // );
    // dialog.openDialog(inputElement);
  };

  const deletePartnerHandler = (data: partnerTabType) => {
    const inputElement = (
      <DialogValidation
        title="Delete Partner"
        message="Are you sure you want to delete this partner?"
        onConfirm={() => {
          deletePartnerTabData(data.id);
          setContent([...partnerTabData]);
        }}
      />
    );

    dialog.openDialog(inputElement);
  };

  return (
    <>
      <Section title="Partner" type="add" onClick={addPartnerHandler} isLast>
        <TableBase data={content} columns={columnDefPartners}></TableBase>
      </Section>
    </>
  );
};

export default AboutPartner;

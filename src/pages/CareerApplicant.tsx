import { ColumnDef } from "@tanstack/react-table";
import { useContext, useState } from "react";
import {
  applicantType,
  createApplicant,
  deleteApplicant,
  getApplicants,
  getBlankApplicant,
  updateApplicant,
} from "../api/Applicant";
import { jobType } from "../api/Job";
import icons from "../assets/icons/icons";
import DialogApplicant from "../component/Dialog/DialogApplicant";
import DialogFormContext from "../component/Dialog/DialogFormContext";
import DialogValidation from "../component/Dialog/DialogValidation";
import Section from "../component/Section/Section";
import TableBase from "../component/Table/TableBase";

const CareerAplicant: React.FC = () => {
  const [content, setContent] = useState<applicantType[]>(
    getApplicants().map((applicant) => applicant.value),
  );
  const applicantColumnDefs: ColumnDef<applicantType>[] = [
    {
      header: "Date",
      size: 100,
      minSize: 100,
      maxSize: 100,
      accessorKey: "applyDate",
      cell: (info) => (
        <p className="h-auto break-words">
          {(info.getValue() as Date).toLocaleDateString("id-ID")}
        </p>
      ),
    },
    {
      header: "Job",
      size: 100,
      minSize: 100,
      maxSize: 100,
      accessorKey: "job",
      cell: (info) => (
        <p className="h-auto text-ellipsis truncate overflow-hidden">
          {(info.getValue() as jobType).title}
        </p>
      ),
    },
    {
      header: "Name",
      size: 100,
      minSize: 100,
      maxSize: 100,
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
      header: "Birth Date",
      size: 100,
      minSize: 100,
      maxSize: 100,
      accessorKey: "birthDate",
      cell: (info) => (
        <p className="h-auto break-words">
          {(info.getValue() as Date).toLocaleDateString("id-ID")}
        </p>
      ),
    },
    {
      header: "Address",
      size: 100,
      minSize: 100,
      maxSize: 100,
      accessorKey: "address",
      cell: (info) => (
        <p className="h-auto truncate text-ellipsis overflow-hidden">
          {info.getValue() as string}
        </p>
      ),
    },
    {
      header: "Email",
      size: 100,
      minSize: 100,
      maxSize: 100,
      accessorKey: "email",
      cell: (info) => (
        <p className="h-auto truncate text-ellipsis overflow-hidden">
          {info.getValue() as string}
        </p>
      ),
    },
    {
      header: "Phone",
      size: 100,
      minSize: 100,
      maxSize: 100,
      accessorKey: "phone",
      cell: (info) => (
        <p className="h-auto break-words">{info.getValue() as string}</p>
      ),
    },
    {
      header: "CV",
      size: 100,
      minSize: 100,
      maxSize: 100,
      accessorKey: "cvLink",
      cell: (info) => (
        <p className="h-auto truncate text-ellipsis overflow-hidden">
          {info.getValue() as string}
        </p>
      ),
    },
    {
      header: "LinkedIn",
      size: 100,
      minSize: 100,
      maxSize: 100,
      accessorKey: "linkedinUrl",
      cell: (info) => (
        <p className="h-auto truncate text-ellipsis overflow-hidden">
          {info.getValue() as string}
        </p>
      ),
    },
    {
      header: "Portfolio",
      size: 100,
      minSize: 100,
      maxSize: 100,
      accessorKey: "portofolioUrl",
      cell: (info) => (
        <p className="h-auto truncate text-ellipsis overflow-hidden">
          {info.getValue() as string}
        </p>
      ),
    },
    {
      header: "Action",
      size: 80,
      cell: (info) => (
        <div className="flex justify-center gap-2 h-24">
          <button onClick={(e) => editApplicantHandler(info.row.original)}>
            <img src={icons.edit.blue} className="h-6 w-6" />
          </button>
          <button onClick={(e) => deleteApplicantHandler(info.row.original)}>
            <img src={icons.delete.blue} className="h-6 w-6" />
          </button>
        </div>
      ),
    },
  ];

  const dialog = useContext(DialogFormContext);

  const addApplicantHandler = () => {
    const inputElement = (
      <DialogApplicant
        data={getBlankApplicant()}
        title="Create New Applicant"
        onSubmit={(data) => {
          createApplicant(data);
          setContent([...getApplicants().map((applicant) => applicant.value)]);
        }}
      />
    );

    dialog.openDialog(inputElement);
  };

  const editApplicantHandler = (data: applicantType) => {
    const inputElement = (
      <DialogApplicant
        data={data}
        title="Edit Applicant"
        onSubmit={(data) => {
          updateApplicant(data);
          setContent([...getApplicants().map((applicant) => applicant.value)]);
        }}
      />
    );

    dialog.openDialog(inputElement);
  };

  const deleteApplicantHandler = (data: applicantType) => {
    const inputElement = (
      <DialogValidation
        title="Delete Applicant"
        message="Are you sure want to delete this applicant?"
        onConfirm={() => {
          deleteApplicant(data.id);
          setContent([...getApplicants().map((applicant) => applicant.value)]);
        }}
      />
    );

    dialog.openDialog(inputElement);
  };

  return (
    <>
      <Section
        title="Applicant"
        type="add"
        onClick={addApplicantHandler}
        isLast
      >
        <TableBase data={content} columns={applicantColumnDefs}></TableBase>
      </Section>
    </>
  );
};

export default CareerAplicant;

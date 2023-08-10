import { ColumnDef } from "@tanstack/react-table";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteJob, getJobs, status as jobStatus, jobType } from "../api/Job";
import icons from "../assets/icons/icons";
import DialogFormContext from "../component/Dialog/DialogFormContext";
import DialogValidation from "../component/Dialog/DialogValidation";
import Section from "../component/Section/Section";
import TableBase from "../component/Table/TableBase";

const CareerJob: React.FC = () => {
  const jobColumnDefs: ColumnDef<jobType>[] = [
    {
      header: "Title",
      size: 200,
      accessorKey: "title",
      cell: (info) => <p className="h-auto">{info.getValue() as string}</p>,
    },
    {
      header: "Location",
      size: 200,
      accessorKey: "location",
      cell: (info) => <p className="h-auto">{info.getValue() as string}</p>,
    },
    {
      header: "Estimated Salary",
      size: 200,
      accessorKey: "estimateSalary",
      cell: (info) => (
        <p className="h-auto">
          {(info.getValue() as string) !== ("" || undefined)
            ? (info.getValue() as string)
            : "-"}
        </p>
      ),
    },
    {
      header: "Type",
      size: 200,
      accessorKey: "type",
      cell: (info) => <p className="h-auto">{info.getValue() as string}</p>,
    },
    {
      header: "Date",
      size: 200,
      accessorKey: "publishDate",
      cell: (info) => (
        <p className="h-auto">
          {(info.getValue() as Date).toLocaleDateString("id-ID", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      ),
    },
    {
      header: "Image",
      size: 200,
      accessorKey: "image",
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
      header: "Status",
      size: 100,
      accessorKey: "status",
      cell: (info) => (
        <div
          className={`border rounded-lg px-2 py-1 text-center font-bold w-20 ${
            info.getValue() === jobStatus.on
              ? "border-[#39BD36] bg-[#D1F6D0] text-[#39BD36]"
              : "border-red-500 bg-red-300 text-red-500"
          }`}
        >
          {jobStatus[info.getValue() as jobStatus].toLocaleUpperCase()}
        </div>
      ),
    },
    {
      header: "Action",
      size: 80,
      cell: (info) => (
        <div className="flex justify-center gap-2 h-24">
          <button onClick={(e) => editJobHandler(info.row.original.id)}>
            <img src={icons.edit.blue} className="h-6 w-6" />
          </button>
          <button onClick={(e) => deleteJobHandler(info.row.original.id)}>
            <img src={icons.delete.blue} className="h-6 w-6" />
          </button>
        </div>
      ),
    },
  ];

  const navigate = useNavigate();
  const dialog = useContext(DialogFormContext);

  const addJobHandler = () => {
    navigate("/career/job/create");
  };

  const editJobHandler = (id: string) => {
    navigate(`/career/job/${id}`);
  };

  const deleteJobHandler = (id: string) => {
    const inputElement = (
      <DialogValidation
        title="Delete Job"
        message="Are you sure want to delete this job?"
        onConfirm={() => {
          deleteJob(id);
          setContent([...getJobs().map((item) => item.value)]);
        }}
      />
    );

    dialog.openDialog(inputElement);
  };

  const [content, setContent] = useState<jobType[]>(
    getJobs().map((item) => item.value),
  );

  return (
    <>
      <Section title="Job" type="add" onClick={addJobHandler} isLast>
        <TableBase data={content} columns={jobColumnDefs}></TableBase>
      </Section>
    </>
  );
};

export default CareerJob;

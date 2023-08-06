import { ColumnDef } from "@tanstack/react-table";
import { applicantType, getApplicants } from "../api/Applicant";
import { jobType } from "../api/Job";
import icons from "../assets/icons/icons";
import Section from "../component/Section/Section";
import TableBase from "../component/Table/TableBase";

const CareerAplicant: React.FC = () => {
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
      cell: () => (
        <div className="flex justify-center gap-2 h-24">
          <button>
            <img src={icons.edit.blue} className="h-6 w-6" />
          </button>
          <button>
            <img src={icons.delete.blue} className="h-6 w-6" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <>
      <Section title="Job" type="add" isLast>
        <TableBase
          data={getApplicants().map((item) => item.value)}
          columns={applicantColumnDefs}
        ></TableBase>
      </Section>
    </>
  );
};

export default CareerAplicant;

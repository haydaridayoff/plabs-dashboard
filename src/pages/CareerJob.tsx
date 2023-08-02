import { ColumnDef } from "@tanstack/react-table";
import { getJobs, status as jobStatus, jobType } from "../api/Job";
import icons from "../assets/icons/icons";
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
      size: 80,
      accessorKey: "status",
      cell: (info) => (
        <div
          className={`border rounded-lg px-2 py-1 text-center font-bold ${
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
      <Section title="Job" type="Add">
        <TableBase
          data={getJobs().map((item) => item.value)}
          columns={jobColumnDefs}
        ></TableBase>
      </Section>
    </>
  );
};

export default CareerJob;

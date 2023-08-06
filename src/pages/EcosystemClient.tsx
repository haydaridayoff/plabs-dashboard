import { ColumnDef } from "@tanstack/react-table";
import { clientsType, getClients } from "../api/Clients";
import { getJobs, status as jobStatus, jobType } from "../api/Job";
import icons from "../assets/icons/icons";
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
      <Section title="Client" type="add" isLast>
        <TableBase
          data={getClients().map((item) => item.value)}
          columns={clientColumnDefs}
        ></TableBase>
      </Section>
    </>
  );
};

export default EcosystemClient;

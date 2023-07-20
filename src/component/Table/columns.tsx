import { ColumnDef } from "@tanstack/react-table";
import icons from "../../assets/icons/icons";

export type idType = {
  id: string;
};

export type dataType = idType & object;

const toTitleCase = (str: string) => {
  return str.replace(/\w\S*/g, (txt) => {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};

const isDataURls = (str: string) => {
  return str.match(/^data:image\//) !== null;
};

const isImg = (str: string) => {
  return str.match(/\.(jpeg|jpg|gif|png)$/) !== null;
};

const isImage = (str: string) => {
  return isDataURls(str) || isImg(str);
};

function getColumnsDef<T extends dataType>(
  firstData: T,
  onEdit: (data: T) => void,
  onDelete: (data: T) => void,
) {
  const col = [] as ColumnDef<T>[];
  col.push({
    header: "No",
    size: 1,
    cell: (info) => {
      return (
        <span className="h-16 text-ellipsis overflow-hidden max-w-xs">
          {info.row.index + 1}
        </span>
      );
    },
  });
  for (let key in firstData) {
    if (Object.prototype.hasOwnProperty.call(firstData, key)) {
      col.push({
        header: toTitleCase(key),
        accessorKey: key,
        size: 500,
        cell: (info) =>
          isImage(info.row.original[key] as string) ? (
            <div className="flex justify-center items-center w-full h-20 ">
              <img
                className="h-16 w-16"
                src={info.getValue() as string}
                alt={`${key} image`}
              />
            </div>
          ) : (
            <span className="h-16 text-ellipsis overflow-hidden max-w-xs">
              {info.getValue() as string}
            </span>
          ),
      });
    }
  }
  col.push({
    header: "Actions",
    size: 1,
    cell: (info) => (
      <div className="flex gap-2 justify-center">
        <button
          onClick={() => {
            onEdit(info.row.original);
          }}
        >
          <img src={icons.edit.blue} className="h-6 w-6" />
        </button>
        <button
          onClick={() => {
            onDelete(info.row.original);
          }}
        >
          <img src={icons.delete.blue} className="h-6 w-6" />
        </button>
      </div>
    ),
  });
  return col;
}

export default getColumnsDef;

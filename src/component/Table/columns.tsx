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

function getColumnsDef<T extends dataType>(firstData: T) {
  const col = [] as ColumnDef<T>[];
  for (let key in firstData) {
    if (Object.prototype.hasOwnProperty.call(firstData, key)) {
      col.push({
        header: toTitleCase(key),
        accessorKey: key,
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
    cell: (info) => (
      <div className="flex gap-2">
        <button
          onClick={() => {
            console.log(info.row.original);
          }}
        >
          <img src={icons.edit.blue} className="h-6 w-6" />
        </button>
        <button
          onClick={() => {
            console.log(info.row.original);
          }}
        >
          Delete
        </button>
      </div>
    ),
  });
  return col;
}

export default getColumnsDef;

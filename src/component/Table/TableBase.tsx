import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import React, { FC } from "react";
import getColumnsDef from "./columns";

interface Props {
  data: any[];
  columns?: ColumnDef<any>[];
}

const TableBase: FC<Props> = (props) => {
  const columnProps = props.columns
    ? props.columns
    : getColumnsDef<any>(props.data[0]);

  const [sortingState, setSortingState] = React.useState<SortingState>([]);

  const tableInstance = useReactTable({
    columns: columnProps,
    data: props.data,
    getCoreRowModel: getCoreRowModel(),
    state: {
      sorting: sortingState,
    },
    onSortingChange: setSortingState,
    getSortedRowModel: getSortedRowModel(),
  });

  const { getHeaderGroups, getRowModel } = tableInstance;
  return (
    <table>
      <thead>
        {getHeaderGroups().map((headerGroup) => (
          <tr
            key={headerGroup.id}
            className="pt-6 h-14 bg-[#eeeeee] font-jakarta font-bold text-left text-[#00000080]"
          >
            {headerGroup.headers.map((header) => (
              <th key={header.id} className="px-3">
                {header.isPlaceholder ? null : (
                  <div
                    className="cursor-pointer select-none"
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                    {{
                      asc: "🔼",
                      desc: "🔽",
                    }[header.column.getIsSorted() as string] ?? null}
                  </div>
                )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {getRowModel().rows.map((row) => (
          <tr
            key={row.id}
            className={`${
              row.index === props.data.length - 1 ? "border-y-2" : "border-t-2"
            } border-[#D9D9D9]`}
          >
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableBase;

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  PaginationState,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import React, { FC } from "react";
import BottomPagination from "./BottomPagination";
import getColumnsDef from "./columns";
import GlobalFiltering from "./GlobalFiltering";

interface Props {
  data: any[];
  pagination?: {
    totalPage: number;
    currentPage: number;
    limit: number;
    totalItem: number;
  };
  columns?: ColumnDef<any>[];
  onEdit?: (data: any) => void;
  onDelete?: (data: any) => void;
  onNextPage?: () => void;
  onPrevPage?: () => void;
  onGoToPage?: (page: number) => void;
  onPropsSizeChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const TableBase: FC<Props> = (props) => {
  const columnProps = props.columns
    ? props.columns
    : getColumnsDef<any>(
        props.data[0],
        props.onEdit ? props.onEdit : () => {},
        props.onDelete ? props.onDelete : () => {},
        {
          hideFirstColumn: true,
        },
      );

  const tableInstance = useReactTable({
    columns: columnProps,
    data: props.data,
    getCoreRowModel: getCoreRowModel(),
  });

  const { getHeaderGroups, getRowModel } = tableInstance;
  return (
    <>
      {/* <div className="flex flex-row-reverse justify-between mb-3">
        <GlobalFiltering
          filter={tableInstance.getState().globalFilter}
          setFilter={tableInstance.setGlobalFilter}
        />
      </div> */}
      <div className="overflow-x-auto w-full">
        <table className="w-full">
          <thead className="flex-none">
            {getHeaderGroups().map((headerGroup) => (
              <tr
                key={headerGroup.id}
                className="pt-6 h-14 bg-[#eeeeee] font-jakarta font-bold text-left text-[#00000080]"
              >
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-3"
                    {...{
                      style: {
                        width: header.column.columnDef.size,
                        maxWidth: header.column.columnDef.maxSize,
                        minWidth: header.column.columnDef.minSize,
                      },
                    }}
                  >
                    {header.isPlaceholder ? null : (
                      <div
                        className="flex items-center gap-1"
                        // onClick={header.column.getToggleSortingHandler()}
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
          <tbody className="min-h-[4px] max-h-[4px] h-1">
            {getRowModel().rows.map((row) => (
              //get last row in every page have to have bottom border
              <tr
                key={row.id}
                className={`min-h-[4px] max-h-[4px] h-1 pt-6 flex-grow-0 font-jakarta text-left border-[#D9D9D9] border-t-2 ${
                  (row.index + 1) % tableInstance.getRowModel().rows.length ===
                  0
                    ? "border-b-2"
                    : ""
                }`}
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="px-3 min-h-[4px] max-h-[4px] h-1"
                    {...{
                      style: {
                        width: cell.column.columnDef.size,
                        maxWidth: cell.column.columnDef.maxSize,
                        minWidth: cell.column.columnDef.minSize,
                      },
                    }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <BottomPagination
        TotalPage={props.pagination?.totalPage ? props.pagination.totalPage : 1}
        currentPage={
          props.pagination?.currentPage ? props.pagination.currentPage : 1
        }
        currentPageSize={props.pagination?.limit ? props.pagination.limit : 5}
        pageSizeOptions={[5, 10, 20]}
        minItemIndex={
          //get top item index
          props.pagination
            ? Math.max(
                (props.pagination.currentPage - 1) * props.pagination.limit,
                0,
              )
            : 0
        }
        rowCount={props.data.length}
        totalItem={props.pagination?.totalItem ? props.pagination.totalItem : 0}
        onPageSizeChange={props.onPropsSizeChange ?? (() => {})}
        onNextPage={props.onNextPage ? props.onNextPage : () => {}}
        onPrevPage={props.onPrevPage ? props.onPrevPage : () => {}}
        goToPage={props.onGoToPage ? props.onGoToPage : () => {}}
      ></BottomPagination>
    </>
  );
};

export default TableBase;

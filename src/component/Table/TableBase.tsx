import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import React, { FC } from "react";
import BottomPagination from "./BottomPagination";
import getColumnsDef from "./columns";
import GlobalFiltering from "./GlobalFiltering";
import TopPagination from "./TopPagination";

interface Props {
  data: any[];
  columns?: ColumnDef<any>[];
  onEdit: (data: any) => void;
  onDelete: (data: any) => void;
}

const TableBase: FC<Props> = (props) => {
  const columnProps = props.columns
    ? props.columns
    : getColumnsDef<any>(props.data[0], props.onEdit, props.onDelete);

  const [sortingState, setSortingState] = React.useState<SortingState>([]);
  const [paginationState, setPaginationState] = React.useState<PaginationState>(
    {
      pageSize: 5,
      pageIndex: 0,
    },
  );
  const [globalFilter, setGlobalFilter] = React.useState<any>("");

  const tableInstance = useReactTable({
    columns: columnProps,
    data: props.data,
    getFilteredRowModel: getFilteredRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting: sortingState,
      pagination: paginationState,
      globalFilter: globalFilter,
    },
    onSortingChange: setSortingState,
    onPaginationChange: setPaginationState,
    onGlobalFilterChange: setGlobalFilter,
  });

  const { getHeaderGroups, getRowModel } = tableInstance;
  return (
    <>
      <div className="flex justify-between">
        <TopPagination
          currentPageSize={tableInstance.getState().pagination.pageSize}
          pageSizeOptions={[5, 10, 20]}
          onPageSizeChange={(event) =>
            tableInstance.setPageSize(Number(event.target.value))
          }
        />
        <GlobalFiltering
          filter={tableInstance.getState().globalFilter}
          setFilter={tableInstance.setGlobalFilter}
        />
      </div>
      <table className="w-full">
        <thead className="w-full">
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
        <tbody className="">
          {getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className={`${
                row.index === props.data.length - 1
                  ? "border-y-2"
                  : "border-t-2"
              }
              border-[#D9D9D9]`}
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
      <BottomPagination
        TotalPage={tableInstance.getPageCount()}
        currentPage={tableInstance.getState().pagination.pageIndex + 1}
        currentPageSize={tableInstance.getState().pagination.pageSize}
        pageSizeOptions={[5, 10, 20]}
        minItemIndex={
          //get top item index
          tableInstance.getState().pagination.pageSize *
          tableInstance.getState().pagination.pageIndex
        }
        rowCount={tableInstance.getRowModel().rows.length}
        totalItem={tableInstance.getFilteredRowModel().rows.length}
        onPageSizeChange={(event) =>
          tableInstance.setPageSize(Number(event.target.value))
        }
        onNextPage={tableInstance.nextPage}
        onPrevPage={tableInstance.previousPage}
        goToPage={(page) => tableInstance.setPageIndex(page - 1)}
      ></BottomPagination>
    </>
  );
};

export default TableBase;

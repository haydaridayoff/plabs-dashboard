import { constants } from "crypto";
import { on } from "events";
import { useState } from "react";
import icons from "../../assets/icons/icons";

type Props = {
  pageSizeOptions: number[];
  TotalPage: number;
  currentPage: number;
  minItemIndex: number;
  rowCount: number;
  totalItem: number;
  currentPageSize: number;
  onPageSizeChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  onPrevPage: () => void;
  onNextPage: () => void;
  goToPage: (page: number) => void;
};

const getThreePage = (currentPage: number, TotalPage: number) => {
  if (TotalPage < 3) {
    if (TotalPage === 0) {
      return [];
    }
    if (TotalPage === 1) {
      return [1];
    }
    if (TotalPage === 2) {
      return [1, 2];
    }
  }
  if (currentPage === 1) {
    return [1, 2, 3];
  }
  if (currentPage === TotalPage) {
    return [currentPage - 2, currentPage - 1, currentPage];
  }
  return [currentPage - 1, currentPage, currentPage + 1];
};

const isPrevPageAvailable = (currentPage: number, totalPage: number) => {
  if (totalPage < 2) {
    return false;
  } else if (totalPage === 2) {
    if (currentPage === 1) {
      return false;
    }
    return true;
  } else return currentPage > 1;
};

const isNextPageAvailable = (currentPage: number, totalPage: number) => {
  if (totalPage < 2) {
    return false;
  } else if (totalPage === 2) {
    if (currentPage === 2) {
      return false;
    }
    return true;
  } else return currentPage < totalPage;
};

const BottomPagination: React.FC<Props> = (props) => {
  return (
    <div className="flex justify-between mt-4">
      <select
        value={props.currentPageSize}
        onChange={props.onPageSizeChange}
        className="bg-transparent text-[#0000007c]"
      >
        {props.pageSizeOptions.map((item) => (
          <option key={item} value={item}>
            Rows per page: {item}
          </option>
        ))}
      </select>
      <div className="flex gap-2 items-center">
        <div>
          {props.rowCount > 0 ? props.minItemIndex + 1 : 0} -{" "}
          {props.minItemIndex + props.rowCount} of {props.totalItem} items
        </div>
        <div className="flex gap-1 items-center">
          <button
            disabled={!isPrevPageAvailable(props.currentPage, props.TotalPage)}
            className={`w-6 h-6`}
            onClick={(event) => props.onPrevPage()}
          >
            <img src={icons.back.gray} alt="" />
          </button>
          {getThreePage(props.currentPage, props.TotalPage).map((item) => (
            <button
              key={item}
              onClick={(event) => props.goToPage(item)}
              className={`border rounded w-8 h-8 ${
                item !== props.currentPage
                  ? "border-[#C2C9D1] text-[#0000007c]"
                  : "border-green-500 text-green-500 bg-green-200"
              }`}
            >
              {item}
            </button>
          ))}
          <button
            disabled={!isNextPageAvailable(props.currentPage, props.TotalPage)}
            className="w-6 h-6"
            onClick={(event) => props.onNextPage()}
          >
            <img src={icons.forward.gray} alt="" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BottomPagination;

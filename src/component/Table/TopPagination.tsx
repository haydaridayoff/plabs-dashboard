type Props = {
  pageSizeOptions: number[];
  currentPageSize: number;
  onPageSizeChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

const TopPagination: React.FC<Props> = (props) => {
  return (
    <>
      <select
        value={props.currentPageSize}
        onChange={props.onPageSizeChange}
        className="border border-gray-300 rounded-md px-2 py-1 bg-[#FAFAFA]"
      >
        {props.pageSizeOptions.map((item) => (
          <option key={item} value={item}>
            Rows per page: {item}
          </option>
        ))}
      </select>
    </>
  );
};

export default TopPagination;

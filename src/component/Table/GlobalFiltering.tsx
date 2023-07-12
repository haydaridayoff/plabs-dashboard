import icons from "../../assets/icons/icons";

type Props = {
  filter: string;
  setFilter: (filter: string | undefined) => void;
};

const GlobalFiltering: React.FC<Props> = (props) => {
  return (
    <span className="flex flex-row items-center justify-between border border-gray-300 bg-[#FAFAFA] rounded-md">
      <input
        id="filter"
        className="px-2 py-1 w-full outline-none bg-transparent"
        onChange={(e) => {
          props.setFilter(e.target.value || undefined);
        }}
      />
      <img src={icons.search.gray} alt="search" className="w-4 h-4 mr-2" />
    </span>
  );
};

export default GlobalFiltering;

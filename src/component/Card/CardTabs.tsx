import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import SidebarContext from "../Sidebar/sidebar-context";

type Props = {
  items?: {
    name: string;
    path: string;
    isActive?: boolean;
  }[];
  className?: string;
};

const CardTabs: React.FC<Props> = (props) => {
  const sidebar = useContext(SidebarContext);
  console.log("CardTabs", props.items);
  return (
    <div
      className={`flex border-b-2 border-[#D9D9D9] gap-6 ${props.className}`}
    >
      <nav className="flex w-1/3">
        {props.items?.map((item, index) => {
          return (
            <div
              key={index}
              className="flex-1 text-center py-4 border-b-2 border-transparent"
            >
              <NavLink
                to={item.path}
                className={`font-jakarta text-base ${
                  item.isActive === true
                    ? "font-bold text-[#4487D9]"
                    : "text-[#989898]"
                }`}
              >
                {item.name}
              </NavLink>
            </div>
          );
        })}
      </nav>
    </div>
  );
};

export default CardTabs;

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
  return (
    <div
      className={`flex border-b-2 border-[#D9D9D9] gap-6 ${props.className}`}
    >
      <div className="flex w-1/3">
        {props.items?.map((item, index) => {
          return (
            <div
              key={index}
              className="flex-1 text-center py-4 border-b-2 border-transparent"
            >
              <Link
                to={item.path}
                onClick={(e) =>
                  sidebar.setActiveItems(
                    0,
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    sidebar.navActiveItems.current[0].id,
                    sidebar.navActiveItems.current[0].subNav![index].id,
                  )
                }
                className={`font-jakarta text-base ${
                  sidebar.navActiveItems.current[0]
                    ? sidebar.navActiveItems.current[0].subNav![index].isActive
                      ? "font-bold"
                      : ""
                    : ""
                }`}
              >
                {item.name}
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CardTabs;

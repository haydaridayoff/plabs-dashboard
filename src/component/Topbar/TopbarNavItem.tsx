import { useContext } from "react";
import { NavLink } from "react-router-dom";
import icons from "../../assets/icons/icons";
import { navItem } from "../../model/Sidebar/SidebarNavItems";
import SidebarContext from "../Sidebar/sidebar-context";

interface Props {
  navItem: navItem;
}

const TopbarNavItem: React.FC<Props> = (props) => {
  const sidebar = useContext(SidebarContext);
  console.log(sidebar.navActiveItems);
  return (
    <>
      {sidebar.navActiveItems.current.map((item) => {
        return (
          <>
            <img src={icons.navSeparator.gray} alt=" " />
            <NavLink key={item.id} to={props.navItem.path + item.path}>
              {item.title}
            </NavLink>
          </>
        );
      })}
    </>
  );
};

export default TopbarNavItem;

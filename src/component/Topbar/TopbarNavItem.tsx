import { Fragment, useContext } from "react";
import { NavLink } from "react-router-dom";
import icons from "../../assets/icons/icons";
import { navItem } from "../../model/Sidebar/SidebarNavItems";
import SidebarContext from "../Sidebar/sidebar-context";

interface Props {
  navItem: navItem;
}

const TopbarNavItem: React.FC<Props> = (props) => {
  const sidebar = useContext(SidebarContext);
  return (
    <>
      {sidebar.navActiveItems.current.map((item) => {
        let isLastItem =
          sidebar.navActiveItems.current.indexOf(item) ===
          sidebar.navActiveItems.current.length - 1;
        return (
          <Fragment key={`${item.id}-fragment`}>
            <h2 key={item.id}>{item.title}</h2>
            {!isLastItem && (
              <img
                src={icons.navSeparator.gray}
                alt=""
                key={`${item.id}-image`}
              />
            )}
          </Fragment>
        );
      })}
    </>
  );
};

export default TopbarNavItem;

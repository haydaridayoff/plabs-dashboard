import { NavLink } from "react-router-dom";
import icons from "../../assets/icons/icons";
import { NavItems } from "../../model/Sidebar/SidebarNavItems";

interface Props {
  navItem: NavItems;
}

const TopbarNavItem: React.FC<Props> = (props) => {
  return (
    <>
      <NavLink to={props.navItem.path}>{props.navItem.title}</NavLink>
      {/* {props.navItem.subNav
        ?.filter((item) => item.isActive)
        .map((item) => {
          return (
            <>
              <img src={icons.navSeparator.gray} alt=" " />
              <NavLink key={item.id} to={props.navItem.path + item.path}>
                {item.title}
              </NavLink>
            </>
          );
        })} */}
    </>
  );
};

export default TopbarNavItem;

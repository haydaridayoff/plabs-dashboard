import { NavLink } from "react-router-dom";
import { NavItems } from "../../model/Sidebar/SidebarNavItems";
import icons from "../../assets/icons/icons";

interface Props {
  navItem: NavItems;
}

const TopbarNavItem: React.FC<Props> = (props) => {
  console.log(props.navItem);
  return (
    <>
      <NavLink to={props.navItem.path}>{props.navItem.title}</NavLink>
      { props.navItem.subNav?.
        filter((item) => item.isActive).
        map((item) => 
          {
            console.log(item);
            return(
              <>
                <img src={icons.navSeparator.gray} alt=" "/>
                <NavLink key={item.title} to={props.navItem.path + item.path}>{item.title}</NavLink>         
              </>
            )
          }
        )
      }
    </>
    
  );
};

export default TopbarNavItem;

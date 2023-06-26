import { useContext } from "react";
import icons from "../../assets/icons/icons";
import images from "../../assets/images/images";
import SidebarContext from "./sidebar-context";

const SidebarLogo: React.FC = (props) => {
  const sidebar = useContext(SidebarContext);

  return (
    <section className="flex items-center justify-evenly outline outline-1 outline-gray-200 w-full h-20 min-h-[rem]">
      {(!sidebar.isMinimized || sidebar.isMouseHover) && (
        <img className="w-36 h-auto" src={images.logoHitam183} alt="Logo" />
      )}
      <button className="w-6 h-6" onClick={() => sidebar.toggleIsMinimized()}>
        <img className="w-full h-full" src={icons.burger.gray} alt="Menu" />
      </button>
    </section>
  );
};

export default SidebarLogo;

import React, { FC } from "react";
import icons from "../../assets/icons/icons";
import SidebarNav from "./SidebarNav";

const Sidebar: FC = (props) => {
  return (
    <div className="fixed flex flex-col items-center w-[230px] left-0 top-[72px] bottom-0 shadow z-10">
      <SidebarNav />
      <button className="flex justify-evenly m-6 p-3 gap-16 rounded hover:bg-[#4487D9] text-[#989898] hover:text-white hover:font-bold">
        <div>Logout</div>
        <img src={icons.logout} alt="Logout" />
      </button>
    </div>
  );
};

export default Sidebar;

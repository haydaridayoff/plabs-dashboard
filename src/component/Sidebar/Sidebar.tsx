import React, { FC } from "react";
import icons from "../../assets/icons/icons";
import SidebarNav from "./SidebarNav";

const Sidebar: FC = (props) => {
  return (
    <div className="absolute flex flex-col items-center w-[230px] h-[648px] left-0 top-[72px] outline outline-offset-2 outline-blue-500">
      <SidebarNav />
      <button className="flex justify-evenly p-3 gap-2 w-full rounded hover:bg-[#4487D9]">
        <div>Logout</div>
        <img src={icons.logout} alt="Logout" />
      </button>
    </div>
  );
};

export default Sidebar;

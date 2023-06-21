import React, { FC } from "react";
import icons from "../../assets/icons/icons";

interface Props {}

const TopbarNav: FC<Props> = (props) => {
  return (
    <nav>
      <ul className="flex justify-start items-center h-full w-auto ml-7 gap-3 text-lg font-semibold">
        <li>
          <button className="hover:underline hover:text-[#4487D9]">Home</button>
        </li>
        <img src={icons.navSeparator} alt="seperate" />
        <li className="">
          <button className="hover:underline hover:text-[#4487D9]">
            Shakda
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default TopbarNav;

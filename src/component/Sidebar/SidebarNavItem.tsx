import React, { FC } from "react";

interface Props {
  icon: string;
  title: string;
  isActive?: boolean;
  onClick?: () => void;
}

const SidebarNavItem: FC<Props> = (props) => {
  let className =
    "flex flex-start mb- w-full px-3 py-2 gap-2 rounded text-[#989898]";

  const classesNames = className.split(" ");
  if (props.isActive) {
    //remove "text-[#989898]" element from classesNames array
    classesNames.splice(
      classesNames.indexOf("text-[#989898]"),
      1,
      "text-white"
    );

    classesNames.push("bg-[#4487D9]");
    classesNames.push("font-bold");
  }

  return (
    <li>
      <button
        onClick={props.onClick ? props.onClick : () => {}}
        className={classesNames.join(" ")}
      >
        <img className="w-[24px] h-[24px]" src={props.icon} alt="Home" />
        <div>{props.title}</div>
      </button>
    </li>
  );
};

export default SidebarNavItem;

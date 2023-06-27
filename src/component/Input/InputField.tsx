import { read } from "fs";
import React from "react";

interface Props {
  value: string;
  name?: string;
  readOnly?: boolean;
  className?: string;
  label?: string;
}

const InputField: React.FC<Props> = (props) => {
  let readOnly = props.readOnly ? props.readOnly : true;
  let value = props.value ? props.value : "";
  return (
    <>
      {props.label && <h3 className="text-sm">{props.label}</h3>}
      <input
        name={props.name ? props.name : undefined}
        className={`border border-[#BABABA] rounded-md mt-2 py-3 px-4 placeholder:text-[#666666] focus:border-[#4487D9] focus:outline-none ${props.className}`}
        type="text"
        value={readOnly ? undefined : value}
        readOnly={readOnly}
        placeholder={readOnly ? value : undefined}
      />
    </>
  );
};

export default InputField;

import React from "react";

interface Props {
  value: string;
  name?: string;
  readOnly?: boolean;
  className?: string;
}

const InputField: React.FC<Props> = (props) => {
  console.log("props.value: ", props.value);
  console.log("props.readOnly: ", props.readOnly);
  return (
    <>
      <input
        name={props.name ? props.name : undefined}
        className={`border border-[#BABABA] rounded-md mt-4 py-3 px-4 placeholder:text-[#666666] focus:border-[#4487D9] focus:outline-none ${props.className}`}
        type="text"
        value={props.readOnly ? undefined : props.value}
        readOnly={props.readOnly ? props.readOnly : true}
        placeholder={props.readOnly ? props.value : undefined}
      />
    </>
  );
};

export default InputField;

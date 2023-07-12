import React from "react";

interface Props {
  value?: string;
  name?: string;
  readOnly?: boolean;
  className?: string;
  label?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextArea: React.FC<Props> = (props) => {
  let readOnly = props.readOnly !== undefined ? props.readOnly : false;
  let value = props.value ? props.value : undefined;
  return (
    <>
      {props.label && <h3 className="text-sm">{props.label}</h3>}
      <textarea
        name={props.name ? props.name : undefined}
        className={`border border-[#BABABA] rounded-md mt-2 py-3 px-4 text-[#666666] focus:border-[#4487D9] focus:outline-none ${props.className}`}
        value={value}
        readOnly={readOnly}
        placeholder={readOnly ? value : undefined}
        style={readOnly ? {} : { color: "black" }}
        onChange={props.onChange ? props.onChange : () => {}}
      />
    </>
  );
};

export default TextArea;

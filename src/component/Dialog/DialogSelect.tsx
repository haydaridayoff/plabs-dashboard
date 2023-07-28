import { useRef, useState } from "react";
import Select from "react-select";

type Props = {
  label: string;
  options: {
    label: string;
    value: any;
  }[];
  value?: any;
  onChange: (option: { label: string; value: any }) => void;
};

const DialogSelect: React.FC<Props> = (props) => {
  return (
    <div className="flex flex-col mb-2">
      <label className="font-jakarta font-normal text-sm mb-2">
        {props.label}
      </label>
      <Select
        classNamePrefix="select"
        isSearchable={true}
        options={props.options}
        value={props.value}
        onChange={(option) => {
          props.onChange(option);
        }}
      />
    </div>
  );
};

export default DialogSelect;

import { eventNames } from "process";
import React, { useEffect, useMemo, useRef, useState } from "react";
import Select, { SingleValue } from "react-select";
import icons from "../../assets/icons/icons";

interface Props {
  id?: string;
  value?: { label: string; value: any };
  name?: string;
  options: { label: string; value: any }[];
  isSeachable?: boolean;
  labelStyle?: string;
  selectStyle?: string;
  label?: string;
  textHelper?: string;
  defaultValue?: string;
  onChange?: (option: SingleValue<{ label: string; value: any }>) => void;
}

const SelectInput: React.FC<Props> = (props) => {
  let value = props.value ? props.value : undefined;
  const selectRef = useRef(null);

  return (
    <>
      {props.label && (
        <label htmlFor={props.id} className={`text-sm ${props.labelStyle}`}>
          {props.label}
        </label>
      )}
      <div
        className={`flex border h-[51px] items-center border-[#BABABA] bg-[#FFFFFF] rounded-md mt-2 text-[#666666] focus-within:border-[#4487D9] focus:outline-none ${props.selectStyle}`}
      >
        <Select
          ref={selectRef}
          id={props.id}
          className={`w-full`}
          defaultInputValue={props.defaultValue}
          styles={{
            control: (provided, state) => ({
              ...provided,
              border: "none",
              boxShadow: "none",
              borderRadius: "none",
              outline: "none",
              marginTop: 0,
              backgroundColor: "transparent",
            }),
          }}
          isSearchable={props.isSeachable ? props.isSeachable : true}
          options={props.options}
          value={value}
          onChange={(option) => {
            props.onChange && props.onChange(option);
          }}
        ></Select>
      </div>
    </>
  );
};

export default SelectInput;

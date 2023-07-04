import { read } from "fs";
import React, { useState } from "react";

interface Props {
  name?: string;
  readOnly?: boolean;
  className?: string;
  label?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  preview?: string;
}

const UploadImage: React.FC<Props> = (props) => {
  let readOnly = props.readOnly !== undefined ? props.readOnly : true;
  return (
    <>
      {props.label && <h3 className="text-sm">{props.label}</h3>}
      <input
        name={props.name ? props.name : undefined}
        className={`border border-[#BABABA] rounded-md mt-2 py-3 px-4 text-[#666666] focus:border-[#4487D9] focus:outline-none ${props.className}`}
        readOnly={readOnly}
        onChange={props.onChange ? props.onChange : () => {}}
        type="file"
      />
      <img src={props.preview ? props.preview : undefined} />
    </>
  );
};

export default UploadImage;

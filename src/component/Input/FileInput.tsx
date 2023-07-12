import { on } from "events";
import React, { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";

enum fileTypeEnum {
  image = "image",
  video = "video",
}

interface Props {
  id?: string;
  name?: string;
  readOnly?: boolean;
  className?: string;
  label?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFileChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  preview?: string;
  fileType?: fileTypeEnum | string;
}

const FileInput: React.FC<Props> = (props) => {
  let readOnly = props.readOnly !== undefined ? props.readOnly : true;
  let fileType = props.fileType ? props.fileType : fileTypeEnum.image;
  let preview = props.preview ? props.preview : "";

  const inputFileOnChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    console.log(event.target.files);
    console.log(URL.createObjectURL(event.target.files![0]));
    preview = URL.createObjectURL(event.target.files![0]);
    props.onFileChange && props.onFileChange(event);
  };

  function onChangeHandler(event: React.ChangeEvent<HTMLInputElement>): void {
    props.onChange && props.onChange(event);
    fileType = event.target.value as fileTypeEnum;
  }

  let inputFileJsx = (
    <>
      <div>
        <input
          type="radio"
          name="fileType"
          defaultChecked={fileType === fileTypeEnum.image}
          value={fileTypeEnum.image}
          id={`${props.id}ImageRadio`}
          onInput={onChangeHandler}
        />
        <label htmlFor={`${props.id}ImageRadio`}>Image</label>
        <input
          type="radio"
          name="fileType"
          defaultChecked={fileType === fileTypeEnum.video}
          value={fileTypeEnum.video}
          id={`${props.id}VideoRadio`}
          onInput={onChangeHandler}
        />
        <label htmlFor={`${props.id}VideoRadio`}>Video</label>
      </div>
      <div
        className={`border border-[#BABABA] rounded-md mt-2 py-3 px-4 text-[#666666] focus:border-[#4487D9] focus:outline-none ${props.className}`}
      >
        <input
          name={props.name ? props.name : ""}
          onChange={inputFileOnChangeHandler}
          type="file"
          accept={fileType === fileTypeEnum.image ? "image/*" : "video/*"}
        />
      </div>
    </>
  );

  return (
    <>
      {props.label && <h3 className="text-sm">{props.label}</h3>}
      <div className="flex gap-2">
        <div className="flex-grow-0 flex-shrink-0">
          {!readOnly && inputFileJsx}
        </div>
        <div
          className={`flex justify-center border border-[#BABABA] h-40 rounded-md mt-2 py-3 w-full px-4 text-[#666666] focus:border-[#4487D9] focus:outline-none ${props.className}`}
        >
          {fileType === fileTypeEnum.image && (
            <img
              className="object-contain w-auto h-full"
              src={preview}
              alt="Image Here"
            />
          )}
          {fileType === fileTypeEnum.video && (
            <ReactPlayer
              url={preview}
              height={"100%"}
              width={"auto"}
              controls
              playing={true}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default FileInput;

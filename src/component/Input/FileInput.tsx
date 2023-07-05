import React, { useRef, useState } from "react";

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
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement>,
    type: fileTypeEnum,
  ) => void;
  preview?: string;
  fileType?: fileTypeEnum | string;
}

const FileInput: React.FC<Props> = (props) => {
  let readOnly = props.readOnly !== undefined ? props.readOnly : true;

  const [fileType, setFileType] = useState<fileTypeEnum>(
    (props.fileType as fileTypeEnum)
      ? (props.fileType as fileTypeEnum)
      : fileTypeEnum.image,
  );

  function fileTypeHandler(event: React.FormEvent<HTMLInputElement>): void {
    setFileType(event.currentTarget.value as fileTypeEnum);
  }

  const inputFileOnChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    props.onChange && props.onChange(event, fileType);
  };

  let inputFileJsx = (
    <>
      <div>
        <input
          type="radio"
          name="fileType"
          value={fileTypeEnum.image}
          checked={fileType === "image"}
          id={`${props.id}ImageRadio`}
          onInput={fileTypeHandler}
        />
        <label htmlFor={`${props.id}ImageRadio`}>Image</label>
        <input
          type="radio"
          name="fileType"
          value={fileTypeEnum.video}
          checked={fileType === "video"}
          id={`${props.id}VideoRadio`}
          onInput={fileTypeHandler}
        />
        <label htmlFor={`${props.id}VideoRadio`}>Video</label>
      </div>
      <div
        className={`border border-[#BABABA] rounded-md mt-2 py-3 px-4 text-[#666666] focus:border-[#4487D9] focus:outline-none ${props.className}`}
      >
        <input
          name={props.name ? props.name : undefined}
          onChange={props.onChange ? inputFileOnChangeHandler : () => {}}
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
          className={`flex flex-grow-0 justify-center border border-[#BABABA] min-h-[6rem] max-h-40 rounded-md mt-2 py-3 w-full px-4 text-[#666666] focus:border-[#4487D9] focus:outline-none ${props.className}`}
        >
          {fileType === fileTypeEnum.image && (
            <img
              className="object-contain w-auto h-full"
              src={props.preview ? props.preview : undefined}
              alt="Image Here"
            />
          )}
          {fileType === fileTypeEnum.video && (
            <video
              className="w-auto h-full"
              src={props.preview ? props.preview : undefined}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default FileInput;

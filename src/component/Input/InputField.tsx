import { read } from "fs";
import { isError } from "util";
import React, { useEffect, useMemo, useRef, useState } from "react";
import icons from "../../assets/icons/icons";

interface Props {
  id?: string;
  value?: string;
  name?: string;
  readOnly?: boolean;
  labelStyle?: string;
  inputStyle?: string;
  label?: string;
  type?: string;
  placeholder?: string;
  isError?: boolean;
  isSuccess?: boolean;
  textHelper?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<Props> = (props) => {
  let readOnly = props.readOnly !== undefined ? props.readOnly : false;
  let value = props.value !== undefined ? props.value : undefined;
  let placeholder =
    props.placeholder !== undefined
      ? props.placeholder
      : props.value !== undefined
      ? props.value
      : undefined;

  const [isFocus, setIsFocus] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const togglePasswordVisible = () => {
    setIsVisible(!isVisible);
    setIsFocus(true);
  };

  let inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isFocus) {
      inputRef.current?.focus();
    }

    if (props.type === "password") {
      if (isVisible) {
        inputRef.current?.setAttribute("type", "text");
      } else {
        inputRef.current?.setAttribute("type", "password");
      }
    }
  }, [isFocus]);

  return (
    <>
      {props.label && (
        <label htmlFor={props.id} className={`text-sm ${props.labelStyle}`}>
          {props.label}
        </label>
      )}
      <div
        className={`flex border border-[#BABABA] bg-[#FAFAFA] rounded-md mt-2 py-3 px-4 text-[#666666] focus-within:border-[#4487D9] focus:outline-none ${props.inputStyle}`}
        style={
          props.isError
            ? { border: "1px solid red" }
            : props.isSuccess
            ? { border: "1px solid green" }
            : {}
        }
      >
        {props.type === "password" && isVisible && (
          <button onClick={togglePasswordVisible} className="mr-1">
            <img src={isFocus ? icons.eye.on.black : icons.eye.on.gray} />
          </button>
        )}
        <input
          id={props.id}
          ref={inputRef}
          onFocus={(e) => {
            setIsFocus(true);
            if (props.onFocus) props.onFocus(e);
          }}
          onBlur={(e) => {
            setIsFocus(false);
            if (props.onBlur) props.onBlur(e);
          }}
          name={props.name ? props.name : undefined}
          className="border-none focus:outline-none w-full flex-grow bg-transparent"
          type={props.type ? props.type : "text"}
          value={readOnly ? value : undefined}
          readOnly={readOnly}
          placeholder={placeholder}
          style={readOnly ? {} : { color: "black" }}
          onChange={props.onChange ? props.onChange : () => {}}
        />
        {props.type === "password" && !isVisible && (
          <button onClick={togglePasswordVisible}>
            <img src={isFocus ? icons.eye.off.black : icons.eye.off.gray} />
          </button>
        )}
      </div>
      {props.textHelper && (
        <div
          className="text-[#666666] text-xs"
          style={
            props.isError
              ? { color: "red" }
              : props.isSuccess
              ? { color: "green" }
              : {}
          }
        >
          {props.textHelper}
        </div>
      )}
    </>
  );
};

export default InputField;

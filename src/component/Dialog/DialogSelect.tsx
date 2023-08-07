import { useState } from "react";
import { SingleValue } from "react-select";
import SelectInput from "../Input/SelectInput";
import DialogBase from "./Base/DialogBase";
import DialogFormInput from "./Input/DialogFormInput";

type Props = {
  title: string;
  label: string;
  selectInput: {
    options: {
      label: string;
      value: any;
    }[];
    defaultValue?: {
      label: string;
      value: any;
    };
    value?: {
      label: string;
      value: any;
    };
    onChange: (option: SingleValue<{ label: string; value: any }>) => void;
  };
  closeDialog?: () => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};
const DialogSelect: React.FC<Props> = (props) => {
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [content, setContent] = useState(props.selectInput.value);

  const onChangeHandler = () => {
    if (content) {
      setIsSubmitDisabled(false);
    } else {
      setIsSubmitDisabled(true);
    }
  };

  return (
    <DialogBase title={props.title} closeDialog={props.closeDialog}>
      <DialogFormInput
        isSubmitDisabled={isSubmitDisabled}
        submitHandler={(e) => {
          e.preventDefault();
          props.onSubmit(e);
        }}
        onCancel={props.closeDialog}
      >
        <div className="flex flex-col mb-2">
          <SelectInput
            label={props.label}
            options={props.selectInput.options}
            defaultValue={props.selectInput.defaultValue}
            onChange={(option) => {
              props.selectInput.onChange(option);
              onChangeHandler();
            }}
          />
        </div>
      </DialogFormInput>
    </DialogBase>
  );
};

export default DialogSelect;

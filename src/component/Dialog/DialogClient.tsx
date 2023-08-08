import { useState } from "react";
import { SingleValue } from "react-select";
import { clientStatus, clientsType } from "../../api/Clients";
import FileInput from "../Input/FileInput";
import InputField from "../Input/InputField";
import SelectInput from "../Input/SelectInput";
import DialogBase from "./Base/DialogBase";
import DialogFormInput from "./Input/DialogFormInput";

type Props = {
  title: string;
  closeDialog?: () => void;
  onSubmit: (data: clientsType) => void;
  userInput: {
    data?: clientsType;
    onChangeName: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onChangeStatus: (
      option: SingleValue<{ label: string; value: any }>,
    ) => void;
    onChangeLogo: (e: React.ChangeEvent<HTMLInputElement>) => void;
  };
};

const status = [
  { label: clientStatus[clientStatus.active], value: clientStatus.active },
  { label: clientStatus[clientStatus.inactive], value: clientStatus.inactive },
  { label: clientStatus[clientStatus.pending], value: clientStatus.pending },
  { label: clientStatus[clientStatus.rejected], value: clientStatus.rejected },
  { label: clientStatus[clientStatus.deleted], value: clientStatus.deleted },
];

const isDataFilled = (data: clientsType) => {
  if (data && data.name !== "" && data.status !== undefined) {
    return false;
  }
  return true;
};

const DialogClient: React.FC<Props> = (props) => {
  const [content, setContent] = useState<clientsType>(
    props.userInput.data ? props.userInput.data : ({} as clientsType),
  );
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(
    !isDataFilled(content),
  );

  return (
    <DialogBase title={props.title} closeDialog={props.closeDialog}>
      <DialogFormInput
        isSubmitDisabled={isSubmitDisabled}
        onSubmit={(e) => {
          e.preventDefault();
          console.log(content);
          props.onSubmit(content);
        }}
      >
        <div className="flex flex-col gap-2 mb-6">
          <div className="w-full">
            <InputField
              label="Client Name"
              type="text"
              defaultValue={props.userInput.data?.name}
              onChange={(e) => {
                props.userInput.onChangeName(e);
                content.name = e.target.value;
                setContent({ ...content });
                setIsSubmitDisabled(isDataFilled(content));
              }}
            />
          </div>
          <div className="w-full">
            <SelectInput
              label="Status"
              options={status}
              defaultValue={
                props.userInput.data
                  ? {
                      label: clientStatus[props.userInput.data.status],
                      value: props.userInput.data.status,
                    }
                  : undefined
              }
              onChange={(option) => {
                props.userInput.onChangeStatus(option);
                content.status = option?.value;
                setContent({ ...content });
                setIsSubmitDisabled(isDataFilled(content));
              }}
            />
          </div>
          <div className="w-full">
            <FileInput
              label="Logo Client"
              fileType="image"
              readOnly={false}
              onFileChange={(e) => {
                props.userInput.onChangeLogo(e);
                content.file.type = "image";
                content.file.src = URL.createObjectURL(e.target.files![0]);
                setContent({ ...content });
                setIsSubmitDisabled(isDataFilled(content));
              }}
            />
          </div>
        </div>
      </DialogFormInput>
    </DialogBase>
  );
};

export default DialogClient;

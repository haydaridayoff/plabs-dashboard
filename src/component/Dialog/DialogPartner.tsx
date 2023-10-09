import { useState } from "react";
import {
  getBlankPartnerRequest,
  partnerRequestType,
  partnerStatus,
  partnerType,
} from "../../api/Partner";
import FileInput from "../Input/FileInput";
import InputField from "../Input/InputField";
import SelectInput from "../Input/SelectInput";
import DialogBase from "./Base/DialogBase";
import DialogFormInput from "./Input/DialogFormInput";

type Props = {
  data?: partnerRequestType;
  title: string;
  closeDialog?: () => void;
  onSubmit: (data: partnerRequestType) => void;
};

const isDataEmpty = (data: partnerType) => {
  return data.logo.src === "" || data.status === undefined || data.name === "";
};

const isDataEmptyRequest = (data: partnerRequestType) => {
  return (
    data.status === undefined || data.name === "" || data.file === undefined
  );
};

const status = [
  {
    label: partnerStatus[partnerStatus.off],
    value: partnerStatus.off,
  },
  {
    label: partnerStatus[partnerStatus.on],
    value: partnerStatus.on,
  },
];

const DialogPartner: React.FC<Props> = (props) => {
  const [content, setContent] = useState<partnerRequestType>(
    props.data ? props.data : getBlankPartnerRequest(),
  );
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(
    isDataEmptyRequest(content),
  );
  return (
    <DialogBase title={props.title} closeDialog={props.closeDialog}>
      <DialogFormInput
        isSubmitDisabled={isSubmitDisabled}
        onSubmit={(e) => {
          e.preventDefault();
          props.onSubmit(content);
        }}
      >
        <div className="flex flex-col gap-2 mb-6">
          <div className="w-full">
            <InputField
              defaultValue={props.data?.name}
              label="Partner Name"
              onChange={(e) => {
                content.name = e.target.value;
                setContent({ ...content });
                setIsSubmitDisabled(isDataEmptyRequest(content));
              }}
            />
          </div>
          <div className="w-full">
            <SelectInput
              label="Status"
              options={status}
              selectStyle="w-full"
              defaultValue={
                props.data?.status !== undefined
                  ? {
                      label: partnerStatus[props.data.status],
                      value: props.data.status,
                    }
                  : undefined
              }
              onChange={(option) => {
                content.status = option?.value;
                setContent({ ...content });
                setIsSubmitDisabled(isDataEmptyRequest(content));
              }}
            />
          </div>
          <div>
            <FileInput
              label="Logo Partner"
              fileType="image"
              readOnly={false}
              onFileChange={(e) => {
                content.file = e.target.files![0];
                setContent({ ...content });
                setIsSubmitDisabled(isDataEmptyRequest(content));
              }}
            />
          </div>
        </div>
      </DialogFormInput>
    </DialogBase>
  );
};

export default DialogPartner;

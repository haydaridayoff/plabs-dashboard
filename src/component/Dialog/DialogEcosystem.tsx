import { useState } from "react";
import {
  ecosystemStatus,
  ecosystemType,
  getBlankEcosystem,
} from "../../api/Ecosystem";
import FileInput from "../Input/FileInput";
import InputField from "../Input/InputField";
import SelectInput from "../Input/SelectInput";
import DialogBase from "./Base/DialogBase";
import DialogFormInput from "./Input/DialogFormInput";

type Props = {
  data?: ecosystemType;
  title: string;
  closeDialog?: () => void;
  onSubmit: (data: ecosystemType) => void;
};

const isDataEmpty = (data: ecosystemType) => {
  return data.file.src === "" || data.status === undefined || data.name === "";
};

const status = [
  {
    label: ecosystemStatus[ecosystemStatus.active],
    value: ecosystemStatus.active,
  },
  {
    label: ecosystemStatus[ecosystemStatus.inactive],
    value: ecosystemStatus.inactive,
  },
  {
    label: ecosystemStatus[ecosystemStatus.pending],
    value: ecosystemStatus.pending,
  },
  {
    label: ecosystemStatus[ecosystemStatus.rejected],
    value: ecosystemStatus.rejected,
  },
  {
    label: ecosystemStatus[ecosystemStatus.deleted],
    value: ecosystemStatus.deleted,
  },
];

const DialogEcosystem: React.FC<Props> = (props) => {
  const [content, setContent] = useState<ecosystemType>(
    props.data ? props.data : getBlankEcosystem(),
  );
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(
    isDataEmpty(content),
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
              label="Ecosystem Name"
              onChange={(e) => {
                content.name = e.target.value;
                setContent({ ...content });
                setIsSubmitDisabled(isDataEmpty(content));
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
                      label: ecosystemStatus[props.data.status],
                      value: props.data.status,
                    }
                  : undefined
              }
              onChange={(option) => {
                content.status = option?.value;
                setContent({ ...content });
                setIsSubmitDisabled(isDataEmpty(content));
              }}
            />
          </div>
          <div>
            <FileInput
              label="Logo Ecosystem"
              fileType="image"
              readOnly={false}
              onFileChange={(e) => {
                content.file.type = "image";
                content.file.src = URL.createObjectURL(e.target.files![0]);
                setContent({ ...content });
                setIsSubmitDisabled(isDataEmpty(content));
              }}
            />
          </div>
        </div>
      </DialogFormInput>
    </DialogBase>
  );
};

export default DialogEcosystem;

import { useState } from "react";
import { serviceType } from "../../api/Service";
import FileInput from "../Input/FileInput";
import SelectInput from "../Input/SelectInput";
import TextArea from "../Input/TextArea";
import DialogBase from "./Base/DialogBase";
import DialogFormInput from "./Input/DialogFormInput";

type Props = {
  data: serviceType;
  title: string;
  closeDialog?: () => void;
  onSubmit: (data: serviceType) => void;
};

export const getBlankService = (): serviceType => {
  return {
    id: "",
    title: "",
    description: "",
    category: "",
    file: {
      fileType: "image",
      fileSrc: "",
    },
  };
};

const isDataEmpty = (data: serviceType) => {
  return (
    data.title === "" ||
    data.description === "" ||
    data.category === "" ||
    data.file.fileSrc === ""
  );
};

const category = [
  { label: "Web Development", value: "Web Development" },
  { label: "Mobile Development", value: "Mobile Development" },
];

const DialogService: React.FC<Props> = (props) => {
  const [content, setContent] = useState<serviceType>(
    props.data ? props.data : ({} as serviceType),
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
            <TextArea
              label="Title"
              defaultValue={props.data?.title}
              readOnly={false}
              className="resize-none w-full"
              onChange={(e) => {
                content.title = e.target.value;
                setContent({ ...content });
                setIsSubmitDisabled(isDataEmpty(content));
              }}
            />
          </div>
          <div className="w-full grid grid-cols-2 gap-4">
            <div className="w-full">
              <SelectInput
                label="Category"
                options={category}
                selectStyle="w-full"
                defaultValue={
                  props.data.category
                    ? {
                        label: props.data.category,
                        value: props.data.category,
                      }
                    : undefined
                }
                onChange={(option) => {
                  content.category = option?.value;
                  setContent({ ...content });
                  setIsSubmitDisabled(isDataEmpty(content));
                }}
              />
            </div>
            <div>
              <FileInput
                label="File"
                fileType="image"
                readOnly={false}
                onFileChange={(e) => {
                  content.file.fileType = "image";
                  content.file.fileSrc = URL.createObjectURL(
                    e.target.files![0],
                  );
                  setContent({ ...content });
                  setIsSubmitDisabled(isDataEmpty(content));
                }}
              />
            </div>
          </div>
          <div className="w-full">
            <TextArea
              label="Description"
              className="resize-none w-full"
              defaultValue={props.data?.description}
              readOnly={false}
              onChange={(e) => {
                content.description = e.target.value;
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

export default DialogService;

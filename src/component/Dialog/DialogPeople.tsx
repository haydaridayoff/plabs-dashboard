import { useState } from "react";
import { createBlankPerson, personType } from "../../api/People";
import FileInput from "../Input/FileInput";
import InputField from "../Input/InputField";
import DialogBase from "./Base/DialogBase";
import DialogFormInput from "./Input/DialogFormInput";

type Props = {
  data: personType;
  title: string;
  closeDialog?: () => void;
  onSubmit: (data: personType) => void;
};

const isDataEmpty = (data: personType) => {
  return (
    data.photo.src === "" ||
    data.photoHover.src === "" ||
    data.name === "" ||
    data.occupation === "" ||
    data.LinkedInUrl === ""
  );
};

const DialogPeople: React.FC<Props> = (props) => {
  const [content, setContent] = useState<personType>(
    props.data ? props.data : createBlankPerson(),
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
              label="Name"
              onChange={(e) => {
                content.name = e.target.value;
                setContent({ ...content });
                setIsSubmitDisabled(isDataEmpty(content));
              }}
            />
          </div>
          <div className="flex w-full gap-4">
            <div className="w-full">
              <InputField
                defaultValue={props.data?.occupation}
                label="Occupation"
                onChange={(e) => {
                  content.occupation = e.target.value;
                  setContent({ ...content });
                  setIsSubmitDisabled(isDataEmpty(content));
                }}
              />
            </div>
            <div className="w-full">
              <FileInput
                label="Photo"
                fileType="image"
                readOnly={false}
                onFileChange={(e) => {
                  content.photo.type = "image";
                  content.photo.src = URL.createObjectURL(e.target.files![0]);
                  setContent({ ...content });
                  setIsSubmitDisabled(isDataEmpty(content));
                }}
              />
            </div>
          </div>
          <div className="flex w-full gap-4">
            <div className="w-full">
              <InputField
                defaultValue={props.data?.LinkedInUrl}
                label="LinkedIn Url"
                onChange={(e) => {
                  content.LinkedInUrl = e.target.value;
                  setContent({ ...content });
                  setIsSubmitDisabled(isDataEmpty(content));
                }}
              />
            </div>
            <div className="w-full">
              <FileInput
                label="Photo Hover"
                fileType="image"
                readOnly={false}
                onFileChange={(e) => {
                  content.photoHover.type = "image";
                  content.photoHover.src = URL.createObjectURL(
                    e.target.files![0],
                  );
                  setContent({ ...content });
                  setIsSubmitDisabled(isDataEmpty(content));
                }}
              />
            </div>
          </div>
        </div>
      </DialogFormInput>
    </DialogBase>
  );
};

export default DialogPeople;

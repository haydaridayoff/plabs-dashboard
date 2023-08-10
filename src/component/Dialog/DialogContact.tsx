import { useState } from "react";
import { contactType, getBlankContact } from "../../api/Contact";
import InputField from "../Input/InputField";
import DialogBase from "./Base/DialogBase";
import DialogFormInput from "./Input/DialogFormInput";

type Props = {
  data: contactType;
  title: string;
  closeDialog?: () => void;
  onSubmit: (data: contactType) => void;
};

const isDataEmpty = (data: contactType) => {
  return data.name === "" || data.email === "" || data.message === "";
};

const DialogContact: React.FC<Props> = (props) => {
  const [content, setContent] = useState<contactType>(
    props.data ? props.data : getBlankContact(),
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
          <div className="grid grid-cols-2 w-full gap-4">
            <div className="w-full">
              <InputField
                label="Name"
                defaultValue={content.name}
                onChange={(e) => {
                  content.name = e.target.value;
                  setContent({ ...content });
                  setIsSubmitDisabled(isDataEmpty(content));
                }}
              />
            </div>
            <div className="w-full">
              <InputField
                label="Date"
                type="date"
                defaultValue={content.date.toISOString().split("T")[0]}
                onChange={(e) => {
                  content.date = new Date(e.target.value);
                  setContent({ ...content });
                  setIsSubmitDisabled(isDataEmpty(content));
                }}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 w-full gap-4">
            <div className="w-full">
              <InputField
                label="Email"
                defaultValue={content.email}
                onChange={(e) => {
                  content.email = e.target.value;
                  setContent({ ...content });
                  setIsSubmitDisabled(isDataEmpty(content));
                }}
              />
            </div>
            <div className="w-full">
              <InputField
                label="Message"
                defaultValue={content.message}
                onChange={(e) => {
                  content.message = e.target.value;
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

export default DialogContact;

import { useState } from "react";
import {
  applicantStatus,
  applicantType,
  getBlankApplicant,
} from "../../api/Applicant";
import { getJob, getJobs } from "../../api/Job";
import InputField from "../Input/InputField";
import SelectInput from "../Input/SelectInput";
import DialogBase from "./Base/DialogBase";
import DialogFormInput from "./Input/DialogFormInput";

type Props = {
  data: applicantType;
  title: string;
  closeDialog?: () => void;
  onSubmit: (data: applicantType) => void;
};

const isDataEmpty = (data: applicantType) => {
  return (
    data.address === "" ||
    data.cvLink === "" ||
    data.email === "" ||
    data.name === "" ||
    data.linkedinUrl === "" ||
    data.portofolioUrl === "" ||
    data.phone === "" ||
    data.job.id === ""
  );
};

const dataJob = getJobs();
const status = [
  { label: applicantStatus[applicantStatus.off], value: applicantStatus.off },
  { label: applicantStatus[applicantStatus.on], value: applicantStatus.on },
];

const DialogApplicant: React.FC<Props> = (props) => {
  const [content, setContent] = useState<applicantType>(
    props.data ? props.data : getBlankApplicant(),
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
                label="Birthdate"
                type="date"
                defaultValue={content.birthDate.toISOString().split("T")[0]}
                onChange={(e) => {
                  content.birthDate = new Date(e.target.value);
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
                label="Phone Number"
                defaultValue={content.phone}
                onChange={(e) => {
                  content.phone = e.target.value;
                  setContent({ ...content });
                  setIsSubmitDisabled(isDataEmpty(content));
                }}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 w-full gap-4">
            <div className="w-full">
              <InputField
                label="Address"
                onChange={(e) => {
                  content.address = e.target.value;
                  setContent({ ...content });
                  setIsSubmitDisabled(isDataEmpty(content));
                }}
                defaultValue={content.address}
              />
            </div>
            <div className="w-full">
              <InputField
                label="CV Link"
                onChange={(e) => {
                  content.cvLink = e.target.value;
                  setContent({ ...content });
                  setIsSubmitDisabled(isDataEmpty(content));
                }}
                defaultValue={content.cvLink}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 w-full gap-4">
            <div className="w-full">
              <InputField
                label="Linkedin URL"
                onChange={(e) => {
                  content.linkedinUrl = e.target.value;
                  setContent({ ...content });
                  setIsSubmitDisabled(isDataEmpty(content));
                }}
                defaultValue={content.linkedinUrl}
              />
            </div>
            <div className="w-full">
              <InputField
                label="Portofolio URL"
                onChange={(e) => {
                  content.portofolioUrl = e.target.value;
                  setContent({ ...content });
                  setIsSubmitDisabled(isDataEmpty(content));
                }}
                defaultValue={content.portofolioUrl}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 w-full gap-4">
            <div className="w-full">
              <SelectInput
                label="Job"
                options={dataJob}
                defaultValue={
                  getJob(content.job.id)
                    ? {
                        label: getJob(content.job.id)!.title,
                        value: getJob(content.job.id),
                      }
                    : undefined
                }
                onChange={(option) => {
                  content.job = option?.value;
                  setContent({ ...content });
                  setIsSubmitDisabled(isDataEmpty(content));
                }}
              />
            </div>
            <div className="w-full">
              <SelectInput
                label="Status"
                defaultValue={
                  content.status !== undefined
                    ? {
                        label: applicantStatus[content.status],
                        value: content.status,
                      }
                    : undefined
                }
                onChange={(option) => {
                  content.status = option?.value;
                  setContent({ ...content });
                  setIsSubmitDisabled(isDataEmpty(content));
                }}
                options={status}
              />
            </div>
          </div>
        </div>
      </DialogFormInput>
    </DialogBase>
  );
};

export default DialogApplicant;

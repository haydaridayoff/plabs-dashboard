import { useEffect, useLayoutEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createJob,
  editJob,
  getBlankJob,
  getJob,
  getJobs,
  status as jobStatus,
  jobType,
} from "../api/Job";
import FileInput from "../component/Input/FileInput";
import InputField from "../component/Input/InputField";
import SelectInput from "../component/Input/SelectInput";
import Section from "../component/Section/Section";

const CareerJobForm: React.FC = () => {
  //get params from url
  const { id } = useParams();
  const navigate = useNavigate();
  console.log(id);
  const [content, setContent] = useState<jobType>(
    id ? (getJob(id) ? getJob(id)! : getBlankJob()) : getBlankJob(),
  );

  useLayoutEffect(() => {
    if (id) {
      const job = getJob(id);
      if (job) {
        setContent({ ...job });
      }
    }
  }, [id]);

  const submitHandler = () => {
    if (id !== "" && id !== undefined) {
      //edit
      editJob(id, content);
    } else {
      //add
      createJob(content);
    }
    navigate(-1);
  };

  return (
    <>
      <Section title="Job" isLast={true} type="add">
        <div className="flex flex-col gap-5">
          <div className="flex gap-5 w-full">
            <div className="w-full">
              <InputField
                label="Publish Date"
                onChange={(e) => {
                  setContent({
                    ...content,
                    publishDate: new Date(e.target.value),
                  });
                }}
                type="date"
                defaultValue={content.publishDate.toISOString().split("T")[0]}
              />
            </div>
            <div className="w-full">
              <InputField
                label="Estimate Salary"
                onChange={(e) => {
                  setContent({
                    ...content,
                    estimateSalary: e.target.value,
                  });
                }}
                defaultValue={content.estimateSalary}
              />
            </div>
          </div>
          <div className="flex gap-5 w-full">
            <div className="w-full">
              <InputField
                label="Location"
                onChange={(e) => {
                  setContent({
                    ...content,
                    location: e.target.value,
                  });
                }}
                defaultValue={content.location}
              />
            </div>
            <div className="w-full">
              <InputField
                label="type"
                onChange={(e) => {
                  setContent({
                    ...content,
                    type: e.target.value,
                  });
                }}
                defaultValue={content.type}
              />
            </div>
          </div>
          <div className="flex gap-5 w-full">
            <div className="w-full">
              <InputField
                label="Title"
                onChange={(e) => {
                  setContent({
                    ...content,
                    title: e.target.value,
                  });
                }}
                defaultValue={content.title}
              />
            </div>
            <div className="w-full">
              <InputField
                label="Slug"
                onChange={(e) => {
                  setContent({
                    ...content,
                    slug: e.target.value,
                  });
                }}
                defaultValue={content.slug}
              />
            </div>
          </div>
          <div className="flex gap-5 w-full">
            <div className="w-full">
              <FileInput
                label="Image"
                onFileChange={(e) => {
                  setContent({
                    ...content,
                    image: URL.createObjectURL(e.target.files![0]),
                  });
                }}
                readOnly={false}
              />
            </div>
            <div className="w-full">
              <InputField
                label="Message to Applicant"
                onChange={(e) => {
                  setContent({
                    ...content,
                    message: e.target.value,
                  });
                }}
                defaultValue={content.message}
              />
            </div>
          </div>
          <div className="flex w-1/2">
            <div className="mr-3 w-full">
              <SelectInput
                options={[
                  { label: "On", value: jobStatus.on },
                  { label: "Off", value: jobStatus.off },
                ]}
                label="Status"
                defaultValue={{
                  label: jobStatus[content.status],
                  value: content.status,
                }}
                onChange={(option) => {
                  setContent({
                    ...content,
                    status: option?.value,
                  });
                }}
              />
            </div>
          </div>
        </div>
        <button
          type="button"
          onClick={submitHandler}
          className="w-40 mx-auto rounded-md bg-[#0AB663] text-center text-sm font-semibold font text-[#FAFAFA] shadow-sm px-4 py-2 mt-4 self-start"
        >
          Save
        </button>
      </Section>
    </>
  );
};

export default CareerJobForm;

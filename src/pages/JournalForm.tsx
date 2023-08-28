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
import {
  createJournal,
  getBlankJournal,
  getJournalById,
  journalType,
  updateJournal,
} from "../api/Journal";
import FileInput from "../component/Input/FileInput";
import InputField from "../component/Input/InputField";
import SelectInput from "../component/Input/SelectInput";
import Section from "../component/Section/Section";

const JournalForm: React.FC = () => {
  //get params from url
  const { id } = useParams();
  const navigate = useNavigate();
  const [content, setContent] = useState<journalType>(
    id
      ? getJournalById(id)
        ? getJournalById(id)!.value
        : getBlankJournal()
      : getBlankJournal(),
  );

  useLayoutEffect(() => {
    if (id) {
      const journal = getJournalById(id)?.value;
      if (journal) {
        setContent({ ...journal });
      }
    }
  }, [id]);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (id !== "" && id !== undefined) {
      //edit
      updateJournal(content);
    } else {
      //add
      createJournal(content);
    }
    navigate(-1);
  };

  return (
    <>
      <Section
        title="Journal"
        isLast={true}
        onClick={() => navigate(-1)}
        type="edit"
        onSubmit={submitHandler}
        submitButtonStyle="w-40 mx-auto"
        isEditing
      >
        <div className="flex flex-col gap-5">
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
                label="Publish Date"
                onChange={(e) => {
                  setContent({
                    ...content,
                    publishDate: new Date(e.target.value),
                  });
                }}
                defaultValue={content.publishDate.toISOString().split("T")[0]}
              />
            </div>
          </div>
          <div className="flex gap-5 w-full">
            <div className="w-full">
              <InputField
                label="Subtitle"
                onChange={(e) => {
                  setContent({
                    ...content,
                    subtitle: e.target.value,
                  });
                }}
                defaultValue={content.subtitle}
              />
            </div>
          </div>
          <div className="flex w-1/2">
            <div className="mr-3 w-full">
              <FileInput
                label="Upload Image"
                onFileChange={(e) => {
                  setContent({
                    ...content,
                    image: URL.createObjectURL(e.target.files![0]),
                  });
                }}
                readOnly={false}
              />
            </div>
          </div>
        </div>
      </Section>
    </>
  );
};

export default JournalForm;

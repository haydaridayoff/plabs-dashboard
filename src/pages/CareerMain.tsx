import { useState } from "react";
import FileInput from "../component/Input/FileInput";
import InputField from "../component/Input/InputField";
import TextArea from "../component/Input/TextArea";
import Section from "../component/Section/Section";
import { careerData } from "../model/MockData/CareerData";

const CareerMain: React.FC = () => {
  const [content, setContent] = useState(careerData);
  const [editContent, setEditContent] = useState(content);
  const [isEditing, setIsEditing] = useState(false);

  const submitDataHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsEditing(false);
    setContent(editContent);
  };

  const toggleEditing = () => {
    setIsEditing((prev) => !prev);
    if (!isEditing) setEditContent(content);
  };

  const career = (
    <>
      <Section
        title="Career"
        onClick={toggleEditing}
        onSubmit={submitDataHandler}
        isEditing={isEditing}
        type="edit"
        isLast
      >
        <div className="flex flex-col gap-3">
          <div className="w-full">
            <InputField
              label="Title"
              value={!isEditing ? content.title : editContent.title}
              readOnly={!isEditing}
              onChange={(e) => {
                setEditContent({ ...editContent, title: e.target.value });
              }}
            />
          </div>
          <div className="w-1/2">
            <FileInput
              label="File"
              fileType={isEditing ? editContent.file.type : content.file.type}
              readOnly={!isEditing}
              onChange={(e) => {
                setEditContent({
                  ...editContent,
                  file: {
                    ...editContent.file,
                    type: e.target.value,
                  },
                });
              }}
              onFileChange={(e) => {
                setEditContent({
                  ...editContent,
                  file: {
                    ...editContent.file,
                    src: URL.createObjectURL(e.target.files![0]),
                  },
                });
              }}
              preview={isEditing ? editContent.file.src : content.file.src}
            />
          </div>
        </div>
      </Section>
    </>
  );

  return <>{career}</>;
};

export default CareerMain;

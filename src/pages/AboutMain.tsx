import { useState } from "react";
import FileInput from "../component/Input/FileInput";
import InputField from "../component/Input/InputField";
import TextArea from "../component/Input/TextArea";
import Section from "../component/Section/Section";
import { aboutTabData } from "../model/MockData/AboutData";

const AboutMain: React.FC = () => {
  const [content, setContent] = useState(aboutTabData);
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

  const about = (
    <>
      <Section
        title="About"
        onClick={toggleEditing}
        onSubmit={submitDataHandler}
        isEditing={isEditing}
        type="edit"
      >
        <div className="flex flex-col gap-5">
          <div>
            <InputField
              label="Title"
              value={!isEditing ? content.about.title : editContent.about.title}
              readOnly={!isEditing}
              onChange={(e) => {
                setEditContent({
                  ...editContent,
                  about: {
                    ...editContent.about,
                    title: e.target.value,
                  },
                });
              }}
            />
          </div>
          <div className="flex gap-5">
            <div className="w-full">
              <TextArea
                className="resize-none overflow-y-auto font-jakarta font-normal w-full h-40"
                readOnly={!isEditing}
                label="Description"
                value={
                  !isEditing
                    ? content.about.description
                    : editContent.about.description
                }
                onChange={(e) => {
                  setEditContent({
                    ...editContent,
                    about: {
                      ...editContent.about,
                      description: e.target.value,
                    },
                  });
                }}
              />
            </div>
            <div className="w-full">
              <FileInput
                label="File"
                fileType={
                  !isEditing
                    ? content.about.file.type
                    : editContent.about.file.type
                }
                readOnly={!isEditing}
                id="aboutFile"
                preview={
                  !isEditing
                    ? content.about.file.src
                    : editContent.about.file.src
                }
                onChange={(e) => {
                  setEditContent({
                    ...editContent,
                    about: {
                      ...editContent.about,
                      file: {
                        ...editContent.about.file,
                        type: e.target.value as string,
                      },
                    },
                  });
                }}
                onFileChange={(e) => {
                  setEditContent({
                    ...editContent,
                    about: {
                      ...editContent.about,
                      file: {
                        ...editContent.about.file,
                        src: URL.createObjectURL(e.target.files![0]),
                      },
                    },
                  });
                }}
              />
            </div>
          </div>
        </div>
      </Section>
    </>
  );

  return (
    <>
      {about}
      <Section
        title="Hero"
        onClick={toggleEditing}
        onSubmit={submitDataHandler}
        isEditing={isEditing}
        type="edit"
      >
        <InputField
          value={!isEditing ? content.hero : editContent.hero}
          readOnly={!isEditing}
          onChange={(e) => {
            setEditContent({
              ...editContent,
              hero: e.target.value,
            });
          }}
        ></InputField>
      </Section>
      <Section
        title="Solution"
        onClick={toggleEditing}
        onSubmit={submitDataHandler}
        isEditing={isEditing}
        type="edit"
      >
        <InputField
          value={!isEditing ? content.solution : editContent.solution}
          readOnly={!isEditing}
          onChange={(e) => {
            setEditContent({
              ...editContent,
              solution: e.target.value,
            });
          }}
        ></InputField>
      </Section>
      <Section
        title="Ecosystem"
        onClick={toggleEditing}
        onSubmit={submitDataHandler}
        isEditing={isEditing}
        type="edit"
      >
        <InputField
          value={!isEditing ? content.ecosystem : editContent.ecosystem}
          readOnly={!isEditing}
          onChange={(e) => {
            setEditContent({
              ...editContent,
              ecosystem: e.target.value,
            });
          }}
        ></InputField>
      </Section>
      <Section
        title="Partner"
        onClick={toggleEditing}
        onSubmit={submitDataHandler}
        isEditing={isEditing}
        type="edit"
      >
        <InputField
          value={!isEditing ? content.partner : editContent.partner}
          readOnly={!isEditing}
          onChange={(e) => {
            setEditContent({
              ...editContent,
              partner: e.target.value,
            });
          }}
        ></InputField>
      </Section>
      <Section
        title="People"
        onClick={toggleEditing}
        onSubmit={submitDataHandler}
        isEditing={isEditing}
        type="edit"
        isLast
      >
        <InputField
          value={!isEditing ? content.people : editContent.people}
          readOnly={!isEditing}
          onChange={(e) => {
            setEditContent({
              ...editContent,
              people: e.target.value,
            });
          }}
        ></InputField>
      </Section>
    </>
  );
};

export default AboutMain;

import React, { useContext, useState } from "react";
import Card from "../component/Card/Card";
import Content from "../component/Content/Content";
import InputField from "../component/Input/InputField";
import TextArea from "../component/Input/TextArea";
import UploadImage from "../component/Input/UploadImage";
import Section from "../component/Section/Section";
import SidebarContext, {
  SidebarContextProvider,
} from "../component/Sidebar/sidebar-context";
import Topbar from "../component/Topbar/Topbar";

const Home = () => {
  let description = `We discover and execute transformations by bringing a diverse skill set with impressive experiences in creative & technology solutions. We deliver the simplest and the fittest solution for even the most complicated business problems.`;
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [file, setFile] = useState<string>();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(URL.createObjectURL(e.target.files[0]));
    }
  };

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  const imageFileHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <Content>
      <Card>
        <Section
          title={"Hero"}
          onEditToggle={toggleEditing}
          isEditing={isEditing}
        >
          <InputField
            readOnly={!isEditing}
            value="We are on a mission to evolve your business by simplifying every development process on all touchpoint."
          />
        </Section>
        <Section
          title={"Section 1"}
          onEditToggle={toggleEditing}
          isEditing={isEditing}
        >
          <InputField label="Title" value="About Us" readOnly={!isEditing} />
          <div className="flex mt-4 gap-5">
            <div className="w-full">
              <TextArea
                label="Description"
                value={description}
                className="resize-none overflow-y-scroll h-20 w-full"
                onChange={(e) => {
                  description = e.target.value;
                }}
                readOnly={!isEditing}
              />
            </div>
            <div className="w-full">
              <UploadImage
                label="Image"
                preview={file}
                onChange={imageFileHandler}
              />
            </div>
          </div>
        </Section>
      </Card>
    </Content>
  );
};

export default Home;

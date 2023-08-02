import { useContext, useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import { clientsType, getClient, getClients } from "../api/Clients";
import {
  createProject,
  editProject,
  getProject,
  getProjects,
  projectType,
} from "../api/Project";
import { getService, getServices, serviceType } from "../api/Service";
import FileInput from "../component/Input/FileInput";
import InputField from "../component/Input/InputField";
import SelectInput from "../component/Input/SelectInput";
import TextArea from "../component/Input/TextArea";
import Section from "../component/Section/Section";
import { editHomeProject } from "../model/MockData/homeData";

const ProjectCreate: React.FC = () => {
  //get params from url
  const { id } = useParams();
  const navigate = useNavigate();

  const [content, setContent] = useState<projectType>({
    id: "",
    title: "",
    subtitle: "",
    service: {} as serviceType,
    file: {
      type: "image",
      src: "",
    },
    client: {} as clientsType,
    url: "",
  });

  useEffect(() => {
    if (id) {
      const project = getProjects().find((item) => item.value.id === id);
      if (project) {
        setContent(project.value);
      }
    }
  }, [id]);

  const submitHandler = () => {
    if (id !== "" && id !== undefined) {
      //edit
      editProject(id, content);
      editHomeProject(id, { title: content.title, image: content.file.src });
    } else {
      //add
      createProject(content);
    }
    navigate(-1);
    console.log(content);
  };
  return (
    <>
      <Section title="Project" isLast={true} type="add">
        <div className="flex flex-col gap-5">
          <div>
            <InputField
              label="Title"
              onChange={(e) => {
                setContent({ ...content, title: e.target.value });
              }}
              value={content.title}
            />
          </div>
          <div>
            <TextArea
              className="h-24 w-full resize-none overflow-y-auto font-jakarta text-sm font-normal"
              label="Subtitle"
              value={content.subtitle}
              onChange={(e) => {
                setContent({ ...content, subtitle: e.target.value });
              }}
            />
          </div>
          <div className="grid grid-cols-2 gap-5">
            <div className="">
              <SelectInput
                label="Service"
                selectStyle="w-full"
                value={getService(content.service.id)}
                options={getServices()}
                onChange={(option) => {
                  setContent({
                    ...content,
                    service: {
                      ...option?.value,
                    },
                  });
                }}
              />
            </div>
            <div className="">
              <FileInput
                label="File"
                fileType={content.file.type}
                readOnly={false}
                onFileChange={(e) => {
                  setContent({
                    ...content,
                    file: {
                      type: content.file.type,
                      src: URL.createObjectURL(e.target.files![0]),
                    },
                  });
                }}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-5">
            <div>
              <SelectInput
                label="Client"
                selectStyle="w-full"
                value={getClient(content.client.id)}
                options={getClients()}
                onChange={(option) => {
                  const newContent = { ...content };
                  newContent.client = {
                    ...option?.value,
                  };
                  setContent((prev) => {
                    const newestContent = { ...newContent };
                    return newestContent;
                  });
                }}
              />
            </div>
            <div>
              <InputField
                label="URL"
                onChange={(e) => {
                  setContent({ ...content, url: e.target.value });
                }}
                value={content.url}
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
export default ProjectCreate;

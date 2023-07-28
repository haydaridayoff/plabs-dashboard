import { useContext, useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import {
  createProject,
  editProject,
  getProject,
  projectType,
  pushProject,
} from "../api/Project";
import { getService } from "../api/Service";
import Card from "../component/Card/Card";
import Content from "../component/Content/Content";
import FileInput from "../component/Input/FileInput";
import InputField from "../component/Input/InputField";
import SelectInput from "../component/Input/SelectInput";
import TextArea from "../component/Input/TextArea";
import Section from "../component/Section/Section";
import SidebarContext from "../component/Sidebar/sidebar-context";
import { editHomeProject } from "../model/MockData/homeData";

const ProjectCreate: React.FC = () => {
  //get params from url
  const { id } = useParams();
  const navigate = useNavigate();

  const [content, setContent] = useState<projectType>({
    id: "",
    title: "",
    subTitle: "",
    service: "",
    file: {
      type: "image",
      src: "",
    },
    client: "",
    url: "",
  });

  useEffect(() => {
    if (id) {
      const project = getProject().find((item) => item.value.id === id);
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
          {id && (
            <div>
              <InputField readOnly={true} label="ID" value={content.id} />
            </div>
          )}
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
              value={content.subTitle}
              onChange={(e) => {
                setContent({ ...content, subTitle: e.target.value });
              }}
            />
          </div>
          <div className="grid grid-cols-2 gap-5">
            <div className="">
              <SelectInput
                label="Service"
                selectStyle="w-full"
                defaultValue={content.service}
                options={getService()}
                onChange={(option) => {
                  setContent({
                    ...content,
                    service: option ? option.label : "",
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
                defaultValue={content.client}
                options={getService()}
                onChange={(option) => {
                  setContent({
                    ...content,
                    client: option ? option.label : "",
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

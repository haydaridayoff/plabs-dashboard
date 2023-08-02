import { faker } from "@faker-js/faker";
import { clientsType, getClients } from "./Clients";
import { getService, getServices, serviceType } from "./Service";

export type projectType = {
  id: string;
  title: string;
  subtitle: string;
  service: serviceType;
  client: clientsType;
  file: {
    type: string;
    src: string;
  };
  url: string;
};

const createRandomProject = (count: number) => {
  const obj: projectType[] = [];
  for (let i = 0; i < count; i++) {
    obj.push({
      id: faker.string.uuid(),
      title: faker.lorem.words(),
      subtitle: faker.lorem.paragraphs(),
      service: faker.helpers.arrayElement(getServices()).value,
      client: faker.helpers.arrayElement(getClients()).value,
      file: {
        type: "image",
        src: faker.image.dataUri({
          width: 640,
          height: 640,
          color: faker.color.human(),
        }),
      },
      url: faker.internet.url(),
    });
  }
  return obj;
};

const randomProjects = createRandomProject(100);

export const getProjects = () => {
  return randomProjects.map((project) => {
    return {
      label: project.title,
      value: project,
    };
  });
};

export const getProject = (id: string) => {
  //return format { label: string, value: projectType }
  const project = randomProjects.find((project) => project.id === id);
  if (project === undefined) {
    return undefined;
  }
  return {
    label: project.title,
    value: project,
  };
};

export const pushProject = (item: projectType) => {
  randomProjects.push(item);
};

export const createProject = (item: projectType) => {
  item.id = faker.string.uuid();
  randomProjects.push(item);
};

export const deleteProject = (id: string) => {
  const index = randomProjects.findIndex((project) => project.id === id);
  if (index !== -1) {
    randomProjects.splice(index, 1);
  }
};

export const editProject = (id: string, item: projectType) => {
  const project = randomProjects.find((project) => project.id === id);
  if (project) {
    project.title = item.title;
    project.subtitle = item.subtitle;
    project.service = item.service;
    project.client = item.client;
    project.file = item.file;
    project.url = item.url;
  }
};

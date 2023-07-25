import { faker } from "@faker-js/faker";

type projectType = {
  id: string;
  title: string;
  subTitle: string;
  service: string;
  client: string;
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
      title: faker.hacker.noun(),
      subTitle: faker.hacker.phrase(),
      service: faker.hacker.verb(),
      client: faker.hacker.abbreviation(),
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

export const getProject = () => {
  return randomProjects.map((project) => {
    return {
      label: project.title,
      value: project,
    };
  });
};

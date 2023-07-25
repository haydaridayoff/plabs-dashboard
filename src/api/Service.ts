import { faker } from "@faker-js/faker";

type serviceType = {
  id: string;
  title: string;
  category: string;
  file: {
    fileType: string;
    fileSrc: string;
  };
  description: string;
};

const createRandomService = (count: number) => {
  const obj: serviceType[] = [];
  for (let i = 0; i < count; i++) {
    obj.push({
      id: faker.string.uuid(),
      title: faker.hacker.phrase(),
      category: faker.hacker.phrase(),
      file: {
        fileType: "document",
        fileSrc: "",
      },
      description: faker.lorem.paragraph(),
    });
  }
  return obj;
};

const randomService = createRandomService(100);

export const getService = () => {
  return randomService.map((project) => {
    return {
      label: project.title,
      value: project,
    };
  });
};

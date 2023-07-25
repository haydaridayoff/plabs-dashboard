import { faker } from "@faker-js/faker";

type ecosystemType = {
  id: string;
  name: string;
  status: number;
  file: {
    type: string;
    src: string;
  };
};

enum ecosystemStatus {
  active,
  inactive,
  pending,
  rejected,
  deleted,
}

const createRandomEcosystem = (count: number) => {
  const obj: ecosystemType[] = [];
  for (let i = 0; i < count; i++) {
    obj.push({
      id: faker.string.uuid(),
      name: faker.database.engine(),
      status: faker.number.int({ min: 0, max: 4 }) as ecosystemStatus,
      file: {
        type: "image",
        src: faker.image.dataUri({
          width: 640,
          height: 640,
          color: faker.color.human(),
        }),
      },
    });
  }
  return obj;
};

const randomEcosystem = createRandomEcosystem(100);

export const getEcosystem = () => {
  return randomEcosystem.map((project) => {
    return {
      label: project.name,
      value: project,
    };
  });
};

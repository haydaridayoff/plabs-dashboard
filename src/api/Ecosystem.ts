import { faker } from "@faker-js/faker";

export type ecosystemType = {
  id: string;
  name: string;
  status: number;
  file: {
    type: string;
    src: string;
  };
};

export const getBlankEcosystem = (): ecosystemType => {
  return {
    id: "",
    name: "",
    status: 0,
    file: {
      type: "",
      src: "",
    },
  };
};

export enum ecosystemStatus {
  active,
  inactive,
  pending,
  rejected,
  deleted,
}

const createRandomEcosystems = (count: number) => {
  const obj: ecosystemType[] = [];
  for (let i = 0; i < count; i++) {
    obj.push({
      id: faker.string.uuid(),
      name: faker.lorem.slug(),
      status: faker.number.int({ min: 0, max: 4 }) as ecosystemStatus,
      file: {
        type: "image",
        src: faker.image.dataUri({
          width: 100,
          height: 100,
          color: faker.color.human(),
        }),
      },
    });
  }
  return obj;
};

const randomEcosystem = createRandomEcosystems(100);

export const getEcosystems = () => {
  return randomEcosystem.map((project) => {
    return {
      label: project.name,
      value: project,
    };
  });
};

export const getEcosystemById = (id: string) => {
  //return format { label: string, value: ecosystemType }
  const ecosystem = randomEcosystem.find((item) => item.id === id);
  if (ecosystem) {
    return {
      label: ecosystem.name,
      value: ecosystem,
    };
  }
};

export const createEcosystem = (item: ecosystemType) => {
  item.id = faker.string.uuid();
  randomEcosystem.unshift(item);
};

export const updateEcosystem = (item: ecosystemType) => {
  const index = randomEcosystem.findIndex(
    (ecosystem) => ecosystem.id === item.id,
  );
  if (index !== -1) {
    randomEcosystem[index] = item;
  }
};

export const deleteEcosystem = (id: string) => {
  const index = randomEcosystem.findIndex((ecosystem) => ecosystem.id === id);
  if (index !== -1) {
    randomEcosystem.splice(index, 1);
  }
};

import { faker } from "@faker-js/faker";

export type workType = {
  id: string;
  title: string;
};

const workData = {
  id: faker.string.uuid(),
  title: "Work",
};

export const getWorkData = () => {
  return workData;
};

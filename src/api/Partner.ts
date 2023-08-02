import { faker } from "@faker-js/faker";
import { projectType } from "./Project";

export enum partnerStatus {
  on,
  off,
}

export type partnerType = {
  id: string;
  name: string;
  status: partnerStatus;
  logo: {
    type: string;
    src: string;
  };
};

const createRandomPartners = (count: number) => {
  const obj: partnerType[] = [];
  for (let i = 0; i < count; i++) {
    obj.push({
      id: faker.string.uuid(),
      name: faker.company.name(),
      status: faker.number.int({ min: 0, max: 4 }),
      logo: {
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

const randomPartners = createRandomPartners(100);

export const getPartner = () => {
  return randomPartners.map((partner) => {
    return {
      label: partner.name,
      value: partner,
    };
  });
};

export const createPartner = (item: partnerType) => {
  item.id = faker.string.uuid();
  randomPartners.push(item);
};

export const deletePartner = (id: string) => {
  const index = randomPartners.findIndex((item) => item.id === id);
  if (index !== -1) {
    randomPartners.splice(index, 1);
  }
};

export const editPartner = (id: string, item: partnerType) => {
  const partner = randomPartners.find((item) => item.id === id);
  if (partner) {
    partner.name = item.name;
    partner.status = item.status;
    partner.logo = item.logo;
  }
};

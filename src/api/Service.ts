import { faker } from "@faker-js/faker";

export type serviceType = {
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
      title: faker.lorem.slug(),
      category: faker.hacker.phrase(),
      file: {
        fileType: "document",
        fileSrc: faker.internet.url(),
      },
      description: faker.lorem.paragraph(),
    });
  }
  return obj;
};

const randomService = createRandomService(100);

export const getServices = () => {
  return randomService.map((service) => {
    return {
      label: service.title,
      value: service,
    };
  });
};

export const updateService = (service: serviceType) => {
  const index = randomService.findIndex((s) => s.id === service.id);
  randomService[index] = service;
};

export const deleteService = (id: string) => {
  const index = randomService.findIndex((s) => s.id === id);
  randomService.splice(index, 1);
};

export const createService = (service: serviceType) => {
  //add to randomService array to the first index
  service.id = faker.string.uuid();
  randomService.unshift(service);
};

export const getService = (id: string) => {
  //return format { label: string, value: serviceType }
  const service = randomService.find((service) => service.id === id);
  if (service === undefined) {
    return undefined;
  }
  return {
    label: service!.title,
    value: service!,
  };
};

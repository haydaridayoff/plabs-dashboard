import { faker } from "@faker-js/faker";

export enum clientStatus {
  active,
  inactive,
  pending,
  rejected,
  deleted,
}

export type clientsType = {
  id: string;
  name: string;
  status: clientStatus;
  file: {
    type: string;
    src: string;
  };
};

const createRandomClients = (count: number) => {
  const obj: clientsType[] = [];
  for (let i = 0; i < count; i++) {
    obj.push({
      id: faker.string.uuid(),
      name: faker.person.fullName(),
      status: faker.number.int({ min: 0, max: 4 }),
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

const randomClients = createRandomClients(100);

export const getClients = () => {
  return randomClients.map((project) => {
    return {
      label: project.name,
      value: project,
    };
  });
};

export const getClient = (id: string) => {
  //return format { label: string, value: clientsType }
  const client = randomClients.find((item) => item.id === id);
  if (client) {
    return {
      label: client.name,
      value: client,
    };
  }
  return undefined;
};

export const createClient = (item: clientsType) => {
  item.id = faker.string.uuid();
  randomClients.push(item);
};

export const deleteClient = (id: string) => {
  const index = randomClients.findIndex((item) => item.id === id);
  if (index !== -1) {
    randomClients.splice(index, 1);
  }
};

/*
 * @deprecated updated to
 * @see updateClient
 */
export const editClient = (id: string, item: clientsType) => {
  const client = randomClients.find((item) => item.id === id);
  if (client) {
    client.name = item.name;
    client.status = item.status;
    client.file = item.file;
  }
};

export const updateClient = (item: clientsType) => {
  const index = randomClients.findIndex((client) => client.id === item.id);
  if (index !== -1) {
    randomClients[index] = item;
  }
};

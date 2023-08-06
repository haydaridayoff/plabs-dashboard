import { faker } from "@faker-js/faker";

export type contactType = {
  id: string;
  date: Date;
  name: string;
  email: string;
  message: string;
};

export const contactCount = 100;

const createRandomContact = (count: number) => {
  const obj: contactType[] = [];
  for (let i = 0; i < count; i++) {
    obj.push({
      id: faker.string.uuid(),
      date: faker.date.past(),
      name: faker.person.fullName(),
      email: faker.internet.email(),
      message: faker.lorem.paragraphs(),
    });
  }
  return obj;
};

const randomContact = createRandomContact(contactCount);

export const getContact = () => {
  return randomContact.map((contact) => {
    return {
      label: contact.name,
      value: contact,
    };
  });
};

export const getContactById = (id: string) => {
  //return format { label: string, value: contactType }
  const contact = randomContact.find((item) => item.id === id);
  if (contact) {
    return {
      label: contact.name,
      value: contact,
    };
  }
};

export const createContact = (item: contactType) => {
  item.id = faker.string.uuid();
  randomContact.push(item);
};

export const updateContact = (item: contactType) => {
  const index = randomContact.findIndex((contact) => contact.id === item.id);
  if (index !== -1) {
    randomContact[index] = item;
  }
};

export const deleteContact = (id: string) => {
  const index = randomContact.findIndex((contact) => contact.id === id);
  if (index !== -1) {
    randomContact.splice(index, 1);
  }
};

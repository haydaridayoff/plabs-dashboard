import { faker } from "@faker-js/faker";

export type personType = {
  id: string;
  name: string;
  occupation: string;
  photo: {
    type: string;
    src: string;
  };
  photoHover: {
    type: string;
    src: string;
  };
  LinkedInUrl: string;
};

const createRandomPeople = (count: number) => {
  const obj: personType[] = [];
  for (let i = 0; i < count; i++) {
    obj.push({
      id: faker.string.uuid(),
      name: faker.person.fullName(),
      occupation: faker.person.jobTitle(),
      photo: {
        type: "image",
        src: faker.image.dataUri({
          width: 100,
          height: 100,
          color: faker.color.human(),
        }),
      },
      photoHover: {
        type: "image",
        src: faker.image.dataUri({
          width: 100,
          height: 100,
          color: faker.color.human(),
        }),
      },
      LinkedInUrl: faker.internet.url(),
    });
  }
  return obj;
};

const randomPeople = createRandomPeople(100);

export const getPeople = () => {
  return randomPeople.map((person) => {
    return {
      label: person.name,
      value: person,
    };
  });
};

export const createPerson = (item: personType) => {
  item.id = faker.string.uuid();
  randomPeople.push(item);
};

export const deletePerson = (id: string) => {
  const index = randomPeople.findIndex((item) => item.id === id);
  if (index !== -1) {
    randomPeople.splice(index, 1);
  }
};

export const editPerson = (id: string, item: personType) => {
  const person = randomPeople.find((item) => item.id === id);
  if (person) {
    person.name = item.name;
    person.occupation = item.occupation;
    person.photo = item.photo;
    person.photoHover = item.photoHover;
    person.LinkedInUrl = item.LinkedInUrl;
  }
};
